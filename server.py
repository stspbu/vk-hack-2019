import logging
import logging.config
import os
import json

import tornado.ioloop
import tornado.web
import tornado.httpserver
from tornado.options import define, options

from handlers.mock import MockWordsHandler, MockTestsHandler, MockTranslateHandler, MockPackageHanlder, MockGetPackagesHanlder

from handlers.index import MainHandler
from handlers.words import WordsHanlder
from handlers.translate import TranslateHandler
from handlers.admin import AdminHandler
from handlers.word_testing import TestingHanlder
from settings import settings

define('port', default=11888, help='run on the given port', type=int)


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", MainHandler),
            (r"/admin/", AdminHandler),
            (r"/words/", MockWordsHandler),
            (r"/translate/", MockTranslateHandler),
            (r"/packages/", MockGetPackagesHanlder),
            (r"/package/", MockPackageHanlder),
            (r"/tests/", TestingHanlder)
        ]

        settings = dict(
            template_path=os.path.join(os.path.dirname(__file__), 'templates'),
            static_path=os.path.join(os.path.dirname(__file__), 'static')
        )

        tornado.web.Application.__init__(self, handlers, **settings)


if __name__ == '__main__':
    with open('logging_config.json') as f_in:
        logging.config.DictConfigurator(json.load(f_in))
    logging.basicConfig(level=settings['LOG_LEVEL'])

    http_server = tornado.httpserver.HTTPServer(Application(), ssl_options={
        'certfile': os.path.join(os.path.realpath('.'), 'cert/server.crt'),
        'keyfile': os.path.join(os.path.realpath('.'), 'cert/server.key')
    })
    http_server.listen(options.port)

    logging.warning('tornado started')
    tornado.ioloop.IOLoop.current().start()
