from handlers.base import BaseHandler
import json
import db
from  sqlalchemy.sql.expression import func
from utils.translator import Translator
import random
import requests
import logging

import sqlalchemy as sa


class UserHanlder(BaseHandler):

    def get(self):
        with db.get_connection() as conn:
            user_id = self._extract_user_id()

            words_t = db.get_table('words')
            query = sa.select([sa.func.count()]).select_from(words_t).where(words_t.c.user_id==user_id)
            logging.warning(query)
            word_sum = conn.execute(query).fetchone()[0]
            logging.info(word_sum)

            query = query.where(words_t.c.correct_tested + words_t.c.wrong_tested > 0).\
                where(words_t.c.correct_tested/(words_t.c.correct_tested + words_t.c.wrong_tested) > 0.8)
            known_word_sum = conn.execute(query).fetchone()[0]
            logging.info(known_word_sum)


            users_t = db.get_table('user')

            query = sa.select([users_t.c.correct_tested, users_t.c.wrong_tested]).where(users_t.c.id==user_id)
            correct, wrong = conn.execute(query).fetchone()
            logging.info(f"{correct}, {wrong}")
            if correct + wrong == 0:
                percent = 0
            else:
                percent = correct/(correct + wrong)

        self.write(json.dumps({
            "result": "ok",
            "all_words": word_sum,
            "known_words": known_word_sum,
            "rating": known_word_sum*percent
        }))

