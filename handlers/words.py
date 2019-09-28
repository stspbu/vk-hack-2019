from handlers.base import BaseHandler
import json
from sqlalchemy.sql import select

import db


class WordsHanlder(BaseHandler):
    def get(self):
        user_id = self._extract_user_id()
        words_t = db.get_table('words')

        with db.get_connection() as conn:

            words = conn.execute(select([words_t.c.id, words_t.c.word, words_t.c.raw_data]).where(words_t.c.user_id == user_id))
            data = [{
                'id': word['id'],
                'word': word['word'],
                'translates': json.loads(word['raw_data'])['translations']
            }for word in words]

        self.write(json.dumps(
            {
                'result': 'ok',
                'data': data
            }
        ))

    def post(self):
        data = json.loads(self.request.body)
        user_id = self._extract_user_id()

        conn = db.get_connection()

        words_t = db.get_table('words')

        if 'word' in data:
            new_word = data['word']
            new_translations = data['translations']
            try:
                raw_data = conn.execute(select([words_t.c.raw_data]).where(words_t.c.user_id == user_id).where(words_t.c.word == new_word)).next()[0]
                raw_data = json.loads(raw_data)
            except:
                raw_data = {'translations': {}}
                conn.execute(words_t.insert(), {'user_id': user_id, 'word': new_word, 'raw_data': json.dumps(raw_data)})

            translations = raw_data['translations']
            for key, value in new_translations.items():
                if key not in translations:
                    translations[key] = []
                set_before = set(translations[key])
                set_new = set(value)
                set_updated = set_before.union(set_new)
                translations[key] = list(set_updated)

            conn.execute(words_t.update(words_t.c.user_id == user_id).where(words_t.c.word == new_word), {'raw_data': json.dumps(raw_data)})

        words = conn.execute(select([words_t.c.id, words_t.c.word, words_t.c.raw_data]).where(words_t.c.user_id == user_id))
        data = [{
            'id': word[0],
            'word': word[1],
            'translates': json.loads(word[2])['translations']
        }for word in words]

        conn.close()

        self.write(json.dumps(
            {
                'result': 'ok',
                'data': data
            }
        ))
