import tornado.web
from utils.sd_tokens import token_issuer
from settings import settings

required_headers = ['X-SDict-User-Id', 'X-SDict-Token']


class BaseHandler(tornado.web.RequestHandler):
    def _extract_user_id(self):
        return int(self.request.headers['X-SDict-User-Id'])

    def _requires_headers_validation(self):
        return True

    def prepare(self):
        # return
        if self._requires_headers_validation():
            self.set_header('Content-Type', 'application/json; charset=UTF-8')
            error = ''
            for header in required_headers:
                if header not in self.request.headers:
                    if not error:
                        error = 'required headers: '
                    error += header + ', '
            if error:
                self.send_error(400, reason=error)

            if settings['TEST_MODE']:
                return

            user_id = int(self.request.headers['X-SDict-User-Id'])
            token = self.request.headers['X-SDict-Token']

            if token_issuer.get_token(user_id) != token:
                self.send_error(403)
