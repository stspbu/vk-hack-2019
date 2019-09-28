import json
import logging

from handlers.base import BaseHandler
from utils.translator import Translator


class TranslateHandler(BaseHandler):
    def post(self):
        try:
            data = json.loads(self.request.body)
        except json.JSONDecodeError:
            logging.warning(f"get incorrect body {self.request.body}")
            self.write(json.dumps({'error': 'incorrect-format'}))
            return
        if 'word' not in data:
            logging.warning(f"get incorrect body {self.request.body}")
            self.write(json.dumps({'error': 'incorrect-format'}))
            return
        word = data['word']

        translation = Translator().translate(word)

        logging.debug(f"get translation {translation} for word {data['word']}")

        self.write(json.dumps({
            'result': 'ok',
            'data': {
                'translations': translation
            }
        }))
