import json

from handlers.base import BaseHandler
from utils.translator import Translator


class TranslateHandler(BaseHandler):
    def post(self):
        data = json.loads(self.request.body)
        word = data['word']

        self.write(json.dumps({
            'result': 'ok',
            'data': {
                'translations': Translator().translate(word)
            }
        }))
