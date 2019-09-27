from handlers.base import BaseHandler
import json


class WordsHanlder(BaseHandler):
    def get(self, user_id):
        self.write(json.dumps(
            {
                'result': 'ok',
                'data': {'words': ['Slava', 'cool']}
            }
        ))