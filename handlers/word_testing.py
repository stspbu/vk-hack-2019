from handlers.base import BaseHandler
import json
import db
from  sqlalchemy.sql.expression import func
from utils.translator import Translator
import random
import requests
import logging

import sqlalchemy as sa


url_with_words = 'https://www.randomlists.com/data/words.json'


class RubbishTranslations:
    def __init__(self):
        self._cashed_words = None
        self._translator = Translator()

    def _load_words(self):
        logging.info(f"get words from {url_with_words}")
        tmp = requests.get(url_with_words).json()
        if 'data' not in tmp:
            logging.error(f"got incorrect format from {url_with_words}")
            raise RuntimeError
        self._cashed_words = list()
        for key in tmp['data']:
            self._cashed_words.append((key, None))

    def _translate_word(self, id: int) -> bool:
        if self._cashed_words[id][1]:
            return True
        logging.info(f"search translation for word {self._cashed_words[id][0]}")
        tmp = list(self._translator.translate(self._cashed_words[id][0]).values())
        if not tmp or not tmp[0]:
            logging.warning(f"incorrect format from translator for word {self._cashed_words[id][0]}")
            return False
        for line in tmp:
            for elem in line:
                if ' ' in elem:
                    continue
                self._cashed_words[id] = (self._cashed_words[id][0], elem)
                logging.debug(f"found translation {elem} for word {self._cashed_words[id][0]}")
                return True
        logging.warning(f"found no translation for word {self._cashed_words[id][0]}")
        return False

    def get_random_words(self, max_counts=15):
        if not self._cashed_words:
            self._load_words()
        random.shuffle(self._cashed_words)
        id_to_delete = list()
        res = list()
        for i, _ in enumerate(self._cashed_words):
            if len(res) > max_counts:
                break
            if self._translate_word(i):
                res.append(self._cashed_words[i])
            else:
                id_to_delete.append(i)

        for id in id_to_delete[::-1]:
            self._cashed_words.pop(id)
        logging.debug(f"get rubbish words {res}")
        return res

    def get_random_word(self):
        if not self._cashed_words:
            self._load_words()
        while self._cashed_words:
            id = random.randint(0, len(self._cashed_words))
            if self._translate_word(id):
                return self._cashed_words[id]
            self._cashed_words.pop(id)


rubbish_words = RubbishTranslations()


class TestingHanlder(BaseHandler):

    def _get_random_user_words(self, max_count=10):
        user_id = self._extract_user_id()
        logging.info(f"get {max_count} random words with their translations from user {user_id}")
        user_words = list()
        is_enough = False
        with db.get_connection() as conn:
            words_t = db.get_table('words')
            query = words_t.select(words_t.c.user_id == user_id).order_by(func.random())

            for row in conn.execute(query):
                if len(user_words) >= max_count:
                    is_enough = True
                    break
                if 'raw_data' not in row or not row['raw_data']:
                    logging.warning(f"got incorrect row from database {row}")
                    continue
                translations = list()
                for _, vals in json.loads(row['raw_data'])['translations'].items():
                    for elem in vals:
                        translations.append(elem)
                user_words.append((row['word'], translations))
        if not is_enough:
            logging.warning(f"found not enough user words(need {max_count}, got {len(user_words)}")
        logging.debug(f"extract words: {user_words}")
        return user_words

    def _get_random_user_translations(self, max_count=200, need_concatinate_words=20):
        user_id = self._extract_user_id()
        logging.info(f"get {max_count} random translations from user {user_id}")
        user_translations = list()
        is_enough = False
        with db.get_connection() as conn:
            words_t = db.get_table('words')
            query = words_t.select(words_t.c.user_id == user_id).order_by(func.random())

            iterations = 0
            for row in conn.execute(query):
                if len(user_translations) >= max_count or iterations > need_concatinate_words:
                    is_enough = True
                    break
                if 'raw_data' not in row or not row['raw_data']:
                    logging.warning(f"got incorrect row {row} from database")
                    continue
                for _, vals in json.loads(row['raw_data'])['translations'].items():
                    for elem in vals:
                        user_translations.append(elem)
                iterations += 1
        if not is_enough:
            logging.warning(f"got not enough translations(need {max_count}, got {len(user_translations)})")
        random.shuffle(user_translations)
        logging.debug(f"extract words: {user_translations}")
        return user_translations

    def get(self):
        logging.info(f"get test request for user {self._extract_user_id()}")
        used_words = list()
        user_words = self._get_random_user_words(max_count=10)
        all_user_translations = self._get_random_user_translations(need_concatinate_words=20)
        res = {
            'data': []
        }

        def get_random_translation():
            for word in all_user_translations:
                yield word

        rand_trans = get_random_translation()

        if len(user_words) < 10:
            res = {
                'error': 'not-enough-words'
            }
            self.write(json.dumps(res))
            return

        for word, translates in user_words:
            variants = list()
            while len(variants) < 3:
                if random.uniform(0, 1) < 0.8:
                    try:
                        wrong_trans = next(rand_trans)
                    except StopIteration:
                        random.shuffle(all_user_translations)
                        rand_trans = get_random_translation()
                        wrong_trans = next(rand_trans)
                else:
                    wrong_trans = rubbish_words.get_random_word()[1]
                if wrong_trans not in translates and wrong_trans not in variants and wrong_trans not in used_words:
                    variants.append(wrong_trans)
                    used_words.append(wrong_trans)
            correct = random.choice(translates)
            variants.append(correct)
            random.shuffle(variants)
            res['data'].append({
                'answer': variants.index(correct),
                'variants': variants,
                'word': word
            })

        res['result'] = 'ok'
        logging.debug(f'send answer to test {res}')
        self.write(json.dumps(res))

    def post(self):
        with db.get_connection() as conn:
            data = json.loads(self.request.body)
            if 'test' not in data:
                logging.warning('incorrect request body')
                logging.debug(self.request.body)
                self.write(json.dumps({'error': 'incorrect-format'}))
                return

            results = data['test']
            user_id = self._extract_user_id()
            correct_sum = 0
            wrong_sum = 0

            words_t = db.get_table('words')

            for res in results:
                if 'word' not in res or 'is_correct' not in res:
                    self.write(json.dumps({'error': 'incorrect-format'}))
                    return

            for res in results:
                word = res['word']
                correct = res['is_correct']
                inclusions_query = sa.select([sa.func.count()]).select_from(words_t).\
                    where(words_t.c.user_id==user_id).where(words_t.c.word==word)
                if conn.execute(inclusions_query).fetchone()[0] == 1:
                    if correct:
                        correct_sum += 1
                        query = words_t.update().values({words_t.c.correct_tested:(words_t.c.correct_tested+1)}). \
                            where(words_t.c.user_id == user_id).where(words_t.c.word == word)
                    else:
                        wrong_sum += 1
                        query = words_t.update().values({words_t.c.wrong_tested: (words_t.c.wrong_tested + 1)}). \
                            where(words_t.c.user_id == user_id).where(words_t.c.word == word)

                    conn.execute(query)
                else:
                    logging.warning(f'not found word {word} for user {user_id}')

            users_t = db.get_table('user')

            query = users_t.update().values({users_t.c.correct_tested: (users_t.c.correct_tested + correct_sum)}). \
                where(users_t.c.id == user_id)
            conn.execute(query)
            query = users_t.update().values({users_t.c.wrong_tested: (users_t.c.wrong_tested + wrong_sum)}). \
                where(users_t.c.id == user_id)
            conn.execute(query)

        self.write(json.dumps({
            "result": "ok"
        }))
