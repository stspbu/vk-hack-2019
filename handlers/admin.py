import tornado.web
import sqlalchemy as sa

import db
from db.meta import server_md


class AdminHandler(tornado.web.RequestHandler):
    def get(self):
        conn = db.get_connection()

        # user_t = db.get_table('users')
        # query = (
        #     sa.select([user_t]).select_from(user_t).where()
        # )
        # conn.execute(query)

        server_md.drop_all(bind=conn)
        server_md.create_all(bind=conn)

        user_t = db.get_table('user')
        conn.execute(user_t.insert())
        conn.execute(user_t.insert())
        query = user_t.select()#.where(user_t.c.user_id==2019)
        for t in conn.execute(query):
            print('hery')
            print(t)
        print('hello')

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
            print('hery2')
            print(t)
        print('hello2')
        words_t.insert().values({'user_id': 'check my id in vk please i wont do this', 'word': 'hello'})
        conn.close()

        self.write({'result': 'ok'})
