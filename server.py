import logging
import logging.config
import os
import json

import tornado.ioloop
import tornado.web
import tornado.httpserver
from tornado.options import define, options

import db
from db.meta import server_md

from handlers.mock import MockWordsHandler, MockTestsHandler, MockTranslateHandler, MockPackageHanlder, MockGetPackagesHanlder

from handlers.index import MainHandler
from handlers.words import WordsHandler
from handlers.translate import TranslateHandler
from handlers.admin import AdminHandler
from handlers.word_testing import TestingHanlder
from settings import settings, logging_config_dict

define('port', default=11888, help='run on the given port', type=int)


class Application(tornado.web.Application):
    def __init__(self):
        with db.get_connection() as conn:
            server_md.create_all(bind=conn)
            logging.info('update database tables')

        handlers = [
            (r"/", MainHandler),
            (r"/admin/", AdminHandler),
            (r"/words/", WordsHandler),
            (r"/translate/", TranslateHandler),
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
    logging.config.DictConfigurator(logging_config_dict)
    logging.basicConfig(level=settings['LOG_LEVEL'])

    http_server = tornado.httpserver.HTTPServer(Application(), ssl_options={
        'certfile': os.path.join(os.path.realpath('.'), 'cert/server.crt'),
        'keyfile': os.path.join(os.path.realpath('.'), 'cert/server.key')
    })
    http_server.listen(options.port)

    logging.warning('tornado started')
    tornado.ioloop.IOLoop.current().start()
