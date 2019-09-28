import tornado.web
from sd_tokens import token_issuer

client_secret = 'PqwFekrI1arHHZwXKk1w'  # TODO: move to settings

required_headers = ['X-SDict-User-Id', 'X-SDict-Token']


class BaseHandler(tornado.web.RequestHandler):

    def _requires_headers_validation(self):
        error = ''
        for header in required_headers:
            if header not in self.request.headers:
                if not error:
                    error = 'required headers: '
                error += header + ', '
        if error:
            self.send_error(400, reason=error)
            return False
        return True

    def prepare(self):
        if self._requires_headers_validation():
            user_id = int(self.request.headers['X-SDict-User-Id'])
            token = self.request.headers['X-SDict-Token']

            if token_issuer.get_token(user_id) != token:
                self.send_error(403)
