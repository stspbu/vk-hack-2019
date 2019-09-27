from handlers.base import BaseHandler
import json


class WordsHanlder(BaseHandler):
    def get(self):
        self.write(json.dumps({'words': ['Slava', 'cool']}))