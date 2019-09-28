from handlers.base import BaseHandler
import json
import db
from  sqlalchemy.sql.expression import func
from translator.translator import Translator
import random
import requests
import logging


class TestingHanlder(BaseHandler):

    def get(self):
        user_words = list()
        all_user_translations = list()
        with db.get_connection() as conn:
            user_id = self._extract_user_id()

            words_t = db.get_table('words')
            query = words_t.select(words_t.c.user_id == user_id).order_by(func.random())

            for t in conn.execute(query):
                if len(user_words) >= 10:
                    break
                if 'raw_data' not in t or not t['raw_data']:
                    continue
                for _, vals in json.loads(t['raw_data']).items():
                    translates = list()
                    for elem in vals:
                        translates.append(elem)
                        all_user_translations.append(elem)
                user_words.append((t['word'], translates))
        res = {
            'data': []
        }
        random.shuffle(user_words)

        random_rubbish_words = requests.get('https://www.randomlists.com/data/words.json').json()['data']
        random.shuffle(random_rubbish_words)

        random.shuffle(all_user_translations)

        def get_random_rubbish_word():
            for word in random_rubbish_words:
                yield word

        def get_random_translation():
            for word in all_user_translations:
                yield word

        rub = get_random_rubbish_word()
        rand_trans = get_random_translation()
        if not user_words:
            res = {
                'error': 'empty'
            }
            self.write(json.dumps(res))
            return

        if len(user_words) < 10:
            res = {
                'error': 'not enough words'
            }
            self.write(json.dumps(res))
            return
        for word, translates in user_words:
            variants = list()
            while len(variants) < 3:
                if random.uniform(0, 1) < 0.85:
                    try:
                        wrong_trans = next(rand_trans)
                    except StopIteration:
                        random.shuffle(all_user_translations)
                        rand_trans = get_random_translation()
                        wrong_trans = next(rand_trans)
                else:
                    try:
                        tmp = list(Translator().translate(next(rub)).values())
                    except StopIteration:
                        random.shuffle(random_rubbish_words)
                        rub = get_random_rubbish_word()
                        tmp = list(Translator().translate(next(rub)).values())
                    if not tmp or not tmp[0]:
                        continue
                    wrong_trans = tmp[0][0]
                if wrong_trans not in translates and wrong_trans not in variants:
                    variants.append(wrong_trans)
            correct = random.choice(translates)
            variants.append(correct)
            random.shuffle(variants)
            res['data'].append({
                'answer': variants.index(correct),
                'variants': variants,
                'word': word
            })

        res['result'] = 'ok'
        logging.info(f'send answer to test {res}')
        self.write(json.dumps(res))
