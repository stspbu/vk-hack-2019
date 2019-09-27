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



        # user_t = db.get_table('user')
        # conn.execute(user_t.insert(), {'user_id': 2019})
        # conn.execute(user_t.insert(), {'user_id': 2018})
        # query = user_t.select(user_t.c.user_id==2019)#.where(user_t.c.user_id==2019)
        # for t in conn.execute(query):
        #     print('hery')
        #     print(t)
        # print('hello')
        #
        # words_t = db.get_table('words')
        # conn.execute(words_t.insert(), {'user_id': 2019, 'word': 'admin', 'raw_data': 'admin'})
        # conn.execute(words_t.insert(), {'user_id': 2019, 'word': 'wolf'})
        # query = words_t.select(words_t.c.user_id==2019)#.where(words_t.c.user_id==2019)
        # for t in conn.execute(query):
        #     print('hery2')
        #     print(t)
        # print('hello2')
        # words_t.insert().values({'user_id': 'check my id in vk please i wont do this', 'word': 'hello'})
        conn.close()

        self.write({'result': 'ok'})
