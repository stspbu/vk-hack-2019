from handlers.base import BaseHandler
import json


class WordsHanlder(BaseHandler):
    def post(self):
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