from handlers.base import BaseHandler
import json
from translator.translator import Translator


class TranslateHandler(BaseHandler):
    def post(self):
        data = json.loads(self.request.body)
        word = data['word']

        self.write(json.dumps({
            'result': 'ok',
            'data': Translator().translate(word)
        }))
