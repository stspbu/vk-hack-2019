from handlers.base import BaseHandler
import json
import db
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
            logging.debug(word_sum)

            query = sa.select([words_t]).select_from(words_t).where(
                words_t.c.correct_tested + words_t.c.wrong_tested > 0
            )
            rows = conn.execute(query).fetchall()

            known_words_cnt = 0
            for row in rows:
                right_cnt = row[words_t.c.correct_tested]
                cnt = row[words_t.c.correct_tested] + row[words_t.c.wrong_tested]

                if right_cnt / cnt > 0.8:
                    known_words_cnt += 1

            logging.debug(known_words_cnt)

            users_t = db.get_table('user')

            query = sa.select([users_t.c.correct_tested, users_t.c.wrong_tested]).where(users_t.c.id==user_id)
            correct, wrong = conn.execute(query).fetchone()
            logging.debug(f"{correct}, {wrong}")
            if correct + wrong == 0:
                percent = 0
            else:
                percent = correct/(correct + wrong)

        self.write(json.dumps({
            'result': 'ok',
            'data': {
                'all_words': word_sum,
                'known_words': known_words_cnt,
                'rating': int(known_words_cnt*percent*100)
            }
        }))

