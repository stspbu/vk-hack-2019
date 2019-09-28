import tornado.web

from handlers.base import BaseHandler


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


class MockTestsHandler(tornado.web.RequestHandler):
    def get(self):
        tests = [{'answer': 0, 'word': 'hi', 'variants': ['привет', 'пока', 'здравствуй', 'да']} for _ in range(10)]

        self.finish({
            'result': 'ok',
            'data': tests
        })
