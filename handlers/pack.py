from handlers.base import BaseHandler
import json
import logging
from sqlalchemy.sql import select

import db


class PackHandler(BaseHandler):
    def get(self, pack_id=None):
        packs_t = db.get_table('word_package')
        if pack_id:
            id = int(pack_id)
            with db.get_connection() as conn:
                pack = conn.execute(packs_t.select(packs_t.c.id==id)).fetchone()

                data = {
                    'id': pack['id'],
                    'name': pack['name'],
                    'avatar': pack['avatar'],
                    'description': pack['description'],
                    'words': json.loads(pack['words'])
                }

            self.write(json.dumps(
                {
                    'result': 'ok',
                    'data': {
                        'pack': data
                    }
                }
            ))

        else:
            with db.get_connection() as conn:
                packs = conn.execute(select([packs_t.c.id, packs_t.c.avatar, packs_t.c.name, packs_t.c.description]))

                data = [{
                    'id': pack['id'],
                    'name': pack['name'],
                    'avatar': pack['avatar'],
                    'description': pack['description'],

                } for pack in packs]

            self.write(json.dumps(
                {
                    'result': 'ok',
                    'data': {
                        'packs': data
                    }
                }
            ))

    def post(self, pack_id=None):
        if not pack_id:
            logging.warning(f"get incorrect body {self.request.body}")
            self.write(json.dumps({'error': 'incorrect-format'}))
            return
        pack_id = int(pack_id)
        user_id = self._extract_user_id()
        packs_t = db.get_table('word_package')
        words_t = db.get_table('words')

        # todo add transaction

        with db.get_connection() as conn:
            pack = conn.execute(packs_t.select(packs_t.c.id == pack_id)).fetchone()

            new_words = json.loads(pack['words'])

            for struct in new_words:
                new_word = struct['word'].lower().strip()
                new_translations = struct['translations']

                try:
                    raw_data = conn.execute(select([words_t.c.raw_data]).where(words_t.c.user_id == user_id).where(
                        words_t.c.word == new_word)).next()[0]
                    raw_data = json.loads(raw_data)
                except:
                    raw_data = {'translations': {}}
                    conn.execute(words_t.insert(),
                                 {'user_id': user_id, 'word': new_word, 'raw_data': json.dumps(raw_data)})

                translations = raw_data['translations']
                for key, value in new_translations.items():
                    if key not in translations:
                        translations[key] = []
                    set_before = set(translations[key])
                    set_new = set(value)
                    set_updated = set_before.union(set_new)
                    translations[key] = list(set_updated)

                conn.execute(words_t.update(words_t.c.user_id == user_id).where(words_t.c.word == new_word),
                             {'raw_data': json.dumps(raw_data)})

        self.write(json.dumps({
            'result': 'ok'
        }))

