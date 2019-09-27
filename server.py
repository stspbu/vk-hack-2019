import logging
import os

import tornado.ioloop
import tornado.web
import tornado.httpserver
from tornado.options import define, options

define('port', default=10888, help='run on the given port', type=int)


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html')


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", MainHandler)
        ]

        settings = dict(
            template_path=os.path.join(os.path.dirname(__file__), 'templates'),
            static_path=os.path.join(os.path.dirname(__file__), 'static')
        )

        tornado.web.Application.__init__(self, handlers, **settings)


if __name__ == '__main__':
    http_server = tornado.httpserver.HTTPServer(Application(), ssl_options={
        'certfile': os.path.join(os.path.realpath('.'), 'cert/server.crt'),
        'keyfile': os.path.join(os.path.realpath('.'), 'cert/server.key')
    })
    http_server.listen(options.port)

    logging.warning('tornado started')
    tornado.ioloop.IOLoop.current().start()
