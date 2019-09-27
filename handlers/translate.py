from handlers.base import BaseHandler
import json
from translator.translator import Translator


class TranslateHanlder(BaseHandler):
    def get(self, word):
        self.write(json.dumps({
            'result': 'ok',
            'data': Translator().translate(word)
        }))
