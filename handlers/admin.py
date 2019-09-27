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

        server_md.create_all(bind=conn)
        server_md.drop_all()

        words_t = db.get_table('words')
        words_t.insert().values({'user_id': 'check my id in vk please i wont do this', 'word': 'hello'})
        conn.close()
