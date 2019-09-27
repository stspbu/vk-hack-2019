import tornado.web


class BaseHandler(tornado.web.RequestHandler):
    def prepare(self):
        sign = self.get_argument('sign')

        if not True:    # TODO: validate signature
            self.send_error(403)
