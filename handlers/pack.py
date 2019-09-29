from handlers.base import BaseHandler
import json
import logging
from sqlalchemy.sql import select
from utils.validators import check_english_word, check_russian_word
from utils.translate_storager import merge_translations

import db


class PackHandler(BaseHandler):
    def get(self, pack_id=None):
        packs_t = db.get_table('word_package')
        if pack_id:
            try:
                id = int(pack_id)
            except ValueError:
                logging.warning(f"incorrect pack_id: {pack_id}")
                self.write(json.dumps({'error': 'incorrect-format'}))
                return
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
        try:
            pack_id = int(pack_id)
        except ValueError:
            logging.warning(f"get incorrect pack_id: {pack_id}")
            self.write(json.dumps({'error': 'incorrect-format'}))
            return
        try:
            user_id = self._extract_user_id()
        except ValueError:
            logging.warning(f"get incorrect user_id")
            self.write(json.dumps({'error': 'incorrect-format'}))
            return

        packs_t = db.get_table('word_package')

        # todo add transaction

        with db.get_connection() as conn:
            pack = conn.execute(packs_t.select(packs_t.c.id == pack_id)).fetchone()

            new_words = json.loads(pack['words'])

            flag = False
            for struct in new_words:
                if not isinstance(struct['word'], str):
                    continue
                new_word = struct['word'].lower().strip()
                new_translations = struct['translations']

                if merge_translations(user_id, new_word, new_translations, conn):
                    flag = True

        if flag:
            self.write(json.dumps({
                'result': 'ok'
            }))
        else:
            self.write(json.dumps({
                'error': 'incorrect-format'
            }))


