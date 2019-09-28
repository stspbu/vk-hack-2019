import tornado.web
from sd_tokens import token_issuer

client_secret = 'PqwFekrI1arHHZwXKk1w'  # TODO: move to settings


class BaseHandler(tornado.web.RequestHandler):
    @staticmethod
    def _requires_headers_validation():
        return True

    def prepare(self):
        pass
        # if self._requires_headers_validation():
        #     user_id = int(self.request.headers['X-SDict-User-Id'])
        #     token = self.request.headers['X-SDict-Token']
        #
        #     if token_issuer.get_token(user_id) != token:
        #         self.send_error(403)
