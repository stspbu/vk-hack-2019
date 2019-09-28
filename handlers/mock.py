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


class MockGetPackagesHanlder(tornado.web.RequestHandler):
    def get(self):
        self.finish({
            'result': 'ok',
            'data': {
                'packages': [
                    {'package_id': 1, 'name': "Danila's package", 'avatar': 'https://sun9-11.userapi.com/c840625/v840625258/76dcb/S_OqYN_jWO8.jpg'},
                    {'package_id': 2, 'name': "Nature", 'avatar': 'https://pbs.twimg.com/profile_images/687354253371772928/v9LlvG5N_400x400.jpg'},
                    {'package_id': 3, 'name': "Space", 'avatar': 'https://pi.tedcdn.com/r/pf.tedcdn.com/images/playlists/how_we_study_space_1957009059.jpg?quality=89&w=256'},
                ]
            }
        })


class MockPackageHanlder(tornado.web.RequestHandler):
    def get(self):
        self.finish(json.dumps({
            'result': 'ok',
            'data': {
                'package': {
                    'id': 1,
                    'name': "Danila's package",
                    'avatar': 'https://sun9-11.userapi.com/c840625/v840625258/76dcb/S_OqYN_jWO8.jpg',
                    'words': [
                        {'word': 'goose', 'translations': {'nouns': ["гусь"]}},
                        {'word': 'Danila', 'translations': {'adjective': ["крутой"]}},
                        {'word': 'wolf', 'translations': {'nouns': ["волк"]}},
                        {'word': 'fox', 'translations': {'nouns': ["лиса"]}},
                        {'word': 'wonderful', 'translations': {'adjective': ["прекрасный"]}},
                        {'word': 'goose', 'translations': {'verb': ["быть гусем"]}},
                        {'word': 'crop', 'translations': {'verb': ["вырезать"]}},
                        {'word': 'slightly', 'translations': {'adverb': ["незначительно"]}},
                        {'word': 'clean', 'translations': {'verb': ["чистить"]}},
                    ]
                }
            }
        }))


class MockTestsHandler(tornado.web.RequestHandler):
    def get(self):
        tests = [{'answer': 0, 'word': 'hi', 'variants': ['привет', 'пока', 'здравствуй', 'да']} for _ in range(10)]

        self.finish({
            'result': 'ok',
            'data': tests
        })
