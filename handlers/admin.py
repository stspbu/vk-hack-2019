import tornado.web
import logging

import db
from db.meta import server_md
from settings import settings


class AdminHandler(tornado.web.RequestHandler):
    def get(self):
        if settings['TEST_MODE']:
            conn = db.get_connection()

            server_md.drop_all(bind=conn)
            server_md.create_all(bind=conn)

            user_t = db.get_table('user')
            conn.execute(user_t.insert())
            conn.execute(user_t.insert())
            query = user_t.select()
            for t in conn.execute(query):
                logging.debug(t)
            logging.debug('base users added')

            words_t = db.get_table('words')
            conn.execute(words_t.insert(), {'user_id': 1, 'word': 'admin', 'raw_data': '{"translations":{"noun":["админ"]}}'})
            conn.execute(words_t.insert(), {'user_id': 1, 'word': 'wolf', 'raw_data': '{"translations":{"noun":["волк"]}}'})
            conn.execute(words_t.insert(), {'user_id': 1, 'word': 'nature', 'raw_data': '{"translations":{"noun":["природа"]}}'})
            conn.execute(words_t.insert(), {'user_id': 1, 'word': 'internet', 'raw_data': '{"translations":{"noun":["интернет"]}}'})
            conn.execute(words_t.insert(), {'user_id': 1, 'word': 'computer', 'raw_data': '{"translations":{"noun":["компьютер"]}}'})
            conn.execute(words_t.insert(), {'user_id': 1, 'word': 'data', 'raw_data': '{"translations":{"noun":["данные"]}}'})
            conn.execute(words_t.insert(), {'user_id': 1, 'word': 'logic', 'raw_data': '{"translations":{"noun":["логика"]}}'})
            conn.execute(words_t.insert(), {'user_id': 1, 'word': 'differ', 'raw_data': '{"translations":{"noun":["разница"]}}'})
            conn.execute(words_t.insert(), {'user_id': 1, 'word': 'clock', 'raw_data': '{"translations":{"noun":["часы"]}}'})
            conn.execute(words_t.insert(), {'user_id': 1, 'word': 'hackaton', 'raw_data': '{"translations":{"noun":["хакатон"]}}'})
            query = words_t.select(words_t.c.user_id==1)#.where(words_t.c.user_id==2019)
            for t in conn.execute(query):
                logging.debug(t)
            logging.debug('step2')
            conn.close()

            self.write({'result': 'ok'})
        else:
            self.send_error(400, reason='disable for not testing mod')
