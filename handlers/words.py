from handlers.base import BaseHandler
import json

import db


class WordsHanlder(BaseHandler):
    def post(self):
        data = json.loads(self.request.body)
        user_id = data['user_id']
        word = data['word']
        conn = db.get_connection()

        conn.close()

        self.write(json.dumps(
            {
                'result': 'ok',
                'data': [
                    {
                        'id': 1,
                        'word': 'hello',
                        'translates': {
                            'nouns': ['привет', 'ку-ку епты']
                        }
                    },
                    {
                        'id': 2,
                        'word': 'word',
                        'translates': {
                            'nouns': ['слово']
                        }
                    }
                ]
            }
        ))