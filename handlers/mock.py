import tornado.web


class MockWordsHandler(tornado.web.RequestHandler):
    def get(self):
        self.finish({
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
        })
