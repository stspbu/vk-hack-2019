from handlers.base import BaseHandler
import json


class WordsHanlder(BaseHandler):
    def post(self):
        self.write(json.dumps(
            {
                'result': 'ok',
                'data': {'words': ['Slava', 'cool'], 'user_id': self.get_body_argument('user_id')}
            }
        ))