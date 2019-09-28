from handlers.base import BaseHandler
import json
import db
from  sqlalchemy.sql.expression import func
from translator.translator import Translator
import random
import requests

from db import get_table


class TestingHanlder(BaseHandler):
    def get(self):
        user_words = list()
        with db.get_connection() as conn:
            user_id = int(self.request.headers['X-SDict-User-Id'])
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
                user_words.append((t['word'], translates))
        res = {
            'data': []
        }

        random_words = requests.get('https://www.randomlists.com/data/words.json').json()['data']
        random.shuffle(random_words)

        def get_random_word():
            for word in random_words:
                yield word

        r = get_random_word()
        for word, translates in user_words:
            variants = list()
            while len(variants) < 3:
                try:
                    tmp = list(Translator().translate(next(r)).values())
                except StopIteration:
                    random.shuffle(random_words)
                    r = get_random_word()
                    tmp = list(Translator().translate(next(r)).values())
                if not tmp or not tmp[0]:
                    continue
                wrong_trans = list(Translator().translate(next(r)).values())[0][0]
                if wrong_trans not in translates:
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
        self.set_header('Content-Type', 'application/json; charset=UTF-8')
        self.write(json.dumps(res))
