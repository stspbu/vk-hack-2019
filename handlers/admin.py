import tornado.web
import logging

import db
from db.meta import server_md
from settings import settings


TEST_ID = 513839253


class AdminHandler(tornado.web.RequestHandler):
    def get(self):
        if settings['TEST_MODE']:
            conn = db.get_connection()

            server_md.drop_all(bind=conn)
            server_md.create_all(bind=conn)

            user_t = db.get_table('user')
            conn.execute(user_t.insert().values(id=TEST_ID))
            conn.execute(user_t.insert())
            conn.execute(user_t.insert())
            query = user_t.select()
            for t in conn.execute(query):
                logging.debug(t)
            logging.debug('base users added')

            words_t = db.get_table('words')
            conn.execute(words_t.insert(), {'user_id': TEST_ID, 'word': 'admin', 'raw_data': '{"translations":{"nouns":["админ"]}}'})
            conn.execute(words_t.insert(), {'user_id': TEST_ID, 'word': 'wolf', 'raw_data': '{"translations":{"nouns":["волк"]}}'})
            conn.execute(words_t.insert(), {'user_id': TEST_ID, 'word': 'nature', 'raw_data': '{"translations":{"nouns":["природа"]}}'})
            conn.execute(words_t.insert(), {'user_id': TEST_ID, 'word': 'internet', 'raw_data': '{"translations":{"nouns":["интернет"]}}'})
            conn.execute(words_t.insert(), {'user_id': TEST_ID, 'word': 'computer', 'raw_data': '{"translations":{"nouns":["компьютер"]}}'})
            conn.execute(words_t.insert(), {'user_id': TEST_ID, 'word': 'data', 'raw_data': '{"translations":{"nouns":["данные"]}}'})
            conn.execute(words_t.insert(), {'user_id': TEST_ID, 'word': 'logic', 'raw_data': '{"translations":{"nouns":["логика"]}}'})
            conn.execute(words_t.insert(), {'user_id': TEST_ID, 'word': 'differ', 'raw_data': '{"translations":{"nouns":["разница"]}}'})
            conn.execute(words_t.insert(), {'user_id': TEST_ID, 'word': 'clock', 'raw_data': '{"translations":{"nouns":["часы"]}}'})
            conn.execute(words_t.insert(), {'user_id': TEST_ID, 'word': 'hackaton', 'raw_data': '{"translations":{"nouns":["хакатон"]}}'})
            query = words_t.select(words_t.c.user_id == TEST_ID)#.where(words_t.c.user_id==2019)
            for t in conn.execute(query):
                logging.debug(t)
            logging.debug('step2')
            conn.close()

            self.write({'result': 'ok'})
        else:
            self.write({'error': 'disabled'})
