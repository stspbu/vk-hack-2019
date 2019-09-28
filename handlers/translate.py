from handlers.base import BaseHandler
import json
from translator.translator import Translator
from tornado.web import MissingArgumentError


class TranslateHandler(BaseHandler):
    def get(self):
        try:
            word = self.request.get_argument('word')
        except MissingArgumentError:
            self.send_error(400, reason='required word param')
            return
        self.write(json.dumps({
            'result': 'ok',
            'data': Translator().translate(word)
        }))
