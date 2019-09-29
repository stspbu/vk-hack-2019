from handlers.base import BaseHandler
import json
import logging
from sqlalchemy.sql import select
from utils.validators import check_russian_word, check_english_word

import db


class WordsHandler(BaseHandler):
    def get(self):
        try:
            user_id = self._extract_user_id()
        except ValueError:
            logging.warning('incorrect user_id')
            self.write(json.dumps({'error': 'incorrect-format'}))
            return

        words_t = db.get_table('words')

        with db.get_connection() as conn:

            words = conn.execute(select([words_t.c.id, words_t.c.word, words_t.c.raw_data]).
                                 where(words_t.c.user_id == user_id).order_by(words_t.c.word))

            data = [{
                'id': word['id'],
                'word': word['word'],
                'translations': json.loads(word['raw_data'])['translations']
            }for word in words]

        self.write(json.dumps({
            'result': 'ok',
            'data': data
        }))

    def post(self):
        try:
            data = json.loads(self.request.body)
        except json.JSONDecodeError:
            logging.warning(f"get incorrect body {self.request.body}")
            self.write(json.dumps({'error': 'incorrect-format'}))
            return
        try:
            user_id = self._extract_user_id()
        except ValueError:
            logging.warning('incorrect user_id')
            self.write(json.dumps({'error': 'incorrect-format'}))
            return

        if 'word' not in data:
            logging.warning(f"get incorrect body, no 'word' in body: {data}")
            self.write(json.dumps({'error': 'incorrect-format'}))
            return
        if not isinstance(data['word'], str):
            logging.warning(f"get incorrect body, data['word'] is not string: {data}")
            self.write(json.dumps({'error': 'incorrect-format'}))
            return

        conn = db.get_connection()

        words_t = db.get_table('words')

        new_word = data['word'].lower().strip()
        # new_translations = data['translations']

        if not check_english_word(new_word):
            logging.warning(f"incorret new word: {new_word}")
            self.write(json.dumps({'error': 'incorrect-format'}))
            return

        if 'translations' not in data or not data['translations']:
            conn.execute(words_t.delete().where(words_t.c.user_id == user_id).where(words_t.c.word == new_word))
        else:

            filtered_translations = dict()
            for key, value in data['translations'].items():
                for elem in value:
                    if check_russian_word(elem):
                        if key not in filtered_translations:
                            filtered_translations[key] = list()
                        filtered_translations[key].append(elem)
            for key in filtered_translations.keys():
                filtered_translations[key].sort()

            rows = conn.execute(select([words_t.c.raw_data]).where(words_t.c.user_id == user_id).
                                where(words_t.c.word == new_word)).fetchall()
            if not rows:
                conn.execute(words_t.insert(), {'user_id': user_id, 'word': new_word,
                                                'raw_data': json.dumps({'translations': filtered_translations})})
            else:
                conn.execute(words_t.update(words_t.c.user_id == user_id).where(words_t.c.word == new_word),
                             {'raw_data': json.dumps({'translations': filtered_translations})})

        words = conn.execute(select([words_t.c.id, words_t.c.word, words_t.c.raw_data]).where(words_t.c.user_id == user_id))
        data = [{
            'id': word['id'],
            'word': word['word'],
            'translates': json.loads(word['raw_data'])['translations']
        }for word in words]

        conn.close()

        self.write(json.dumps(
            {
                'result': 'ok',
                'data': data
            }
        ))
