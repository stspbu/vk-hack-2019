from handlers.base import BaseHandler


class MainHandler(BaseHandler):
    def _extract_signature(self):
        return self.get_argument('sign', None)

    def get(self):
        self.render('index.html', **{'vkSign': self.get_argument('sign', None)})
