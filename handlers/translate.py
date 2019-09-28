from handlers.base import BaseHandler
import json
from translator.translator import Translator


class TranslateHanlder(BaseHandler):
    def post(self):
        word = self.get_body_argument('word')

        self.write(json.dumps({
            'result': 'ok',
            'data': Translator().translate(word)
        }))
