import uuid

import db
import sqlalchemy as sa

from db import get_table


class TokenIssuer:
    def __init__(self):
        self._user_id_to_token = {}
        self._is_unexpired_loaded = False  # TODO: hack to escape schema migrations

    def _load_unexpired_token(self):
        token_t = get_table('token')

        with db.get_connection() as conn:
            query = token_t.delete().where(sa.and_(
                token_t.c.expires_ts < sa.func.now(),
                token_t.c.expires_ts is not None
            ))
            conn.execute(query)

            query = sa.select([token_t]).select_from(token_t)
            rows = conn.execute(query).fetchall()

            for row in rows:
                self._user_id_to_token[row['user_id']] = row['value']

    def get_token(self, user_id):
        if not self._is_unexpired_loaded:
            self._load_unexpired_token()
            self._is_unexpired_loaded = True

        if not self._user_id_to_token.get(user_id):
            self._issue_token(user_id)

        return self._user_id_to_token[user_id]

    def _issue_token(self, user_id):
        token = uuid.uuid4().hex

        token_t = get_table('token')
        with db.get_connection() as conn:
            query = token_t.delete().where(user_id == user_id)
            conn.execute(query)

            query = token_t.insert().values(user_id=user_id, value=token)  # TODO: think about expiration
            conn.execute(query)

        self._user_id_to_token[user_id] = token


token_issuer = TokenIssuer()

