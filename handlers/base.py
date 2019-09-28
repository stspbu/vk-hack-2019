import tornado.web
from sd_tokens import token_issuer

TEST_MODE = True
TEST_USER_ID = '513839253'
TEST_TOKEN = '9395c31338764a3290e54be7422dc222'

required_headers = ['X-SDict-User-Id', 'X-SDict-Token']


class BaseHandler(tornado.web.RequestHandler):
    def _extract_user_id(self):
        return int(self.request.headers['X-SDict-User-Id'])

    def _requires_headers_validation(self):
        return True

    def prepare(self):
        if self._requires_headers_validation():
            error = ''
            for header in required_headers:
                if header not in self.request.headers:
                    if not error:
                        error = 'required headers: '
                    error += header + ', '
            if error and not TEST_MODE:
                self.send_error(400, reason=error)

            if not TEST_MODE:
                user_id = int(self.request.headers['X-SDict-User-Id'])
                token = self.request.headers['X-SDict-Token']
            else:
                user_id = int(TEST_USER_ID)
                token = TEST_TOKEN

            if token_issuer.get_token(user_id) != token:
                self.send_error(403)
