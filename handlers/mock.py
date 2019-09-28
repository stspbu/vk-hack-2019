import json
import logging

import tornado.web

from handlers.base import BaseHandler


class MockTranslateHandler(BaseHandler):
    def get(self):
        self.post()

    def post(self):
        self.write(json.dumps({
            'result': 'ok',
            'data': {
                'word': 'test',
                'translations': {
                    'nouns': ['стол'],
                    'verbs': ['писать'],
                    'adjectives': ['красный'],
                    'adverbs': ['громко']
                }
            }
        }))


class MockWordsHandler(BaseHandler):
    def get(self):
        self.finish({
            'result': 'ok',
            'data': [
                {
                    'id': 1,
                    'word': 'hello',
                    'translations': {
                        'nouns': ['привет', 'ку-ку епты'],
                        'verbs': ['поздароваться'],
                        'adjectives': ['прилаг'],
                        'adverbs': ['наречие1', 'наречие2']
                    }
                },
                {
                    'id': 2,
                    'word': 'word',
                    'translations': {
                        'nouns': ['слово']
                    }
                }
            ]
        })

    def post(self):
        user_id = self._extract_user_id()
        data = json.loads(self.request.body)

        logging.warning(data['word'])
        logging.warning(data['translations'])

        # expecting:
        # data['word']
        # data['translations']
        # translations = {nouns: [], verbs:[], ...} как везде

        self.finish({
            'result': 'ok'
        })


class MockTestsHandler(tornado.web.RequestHandler):
    def get(self):
        tests = [{'answer': 0, 'word': 'hi', 'variants': ['привет', 'пока', 'здравствуй', 'да']} for _ in range(10)]

        self.finish({
            'result': 'ok',
            'data': tests
        })
