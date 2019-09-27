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


class MockTestsHandler(tornado.web.RequestHandler):
    def get(self):
        tests = [{'answer': 0, 'words': ['привет', 'пока', 'здравствуй', 'да']} for _ in range(10)]

        self.finish({
            'result': 'ok',
            'data': tests
        })
