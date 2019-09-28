import base64
import json
import logging
from _sha256 import sha256
from collections import OrderedDict
from hmac import HMAC
from urllib.parse import urlencode
import sqlalchemy as sa

import db
from db import get_table
from handlers.base import BaseHandler
from sd_tokens import token_issuer


client_secret = 'PqwFekrI1arHHZwXKk1w'  # TODO: move to settings


class MainHandler(BaseHandler):
    def _requires_headers_validation(self):
        return False

    def prepare(self):
        logging.warning(self.request.arguments)
        vk_subset = OrderedDict(sorted(x for x in self.request.arguments.items() if x[0][:3] == "vk_"))
        hash_code = base64.b64encode(HMAC(client_secret.encode(), urlencode(vk_subset, doseq=True).encode(), sha256).digest())
        decoded_hash_code = hash_code.decode('utf-8')[:-1].replace('+', '-').replace('/', '_')

        vk_sign = self.get_argument('sign')

        if decoded_hash_code != vk_sign:
            self.send_error(403)

    def _extract_signature(self):
        return self.get_argument('sign', None)

    def get(self):
        user_id = int(self.get_argument('vk_user_id'))

        user_t = get_table('user')
        with db.get_connection() as conn:  # TODO: separate thread
            q = sa.select([user_t]).select_from(user_t).where(user_t.c.id == user_id)
            rows = conn.execute(q).fetchall()
            if not rows:
                q = user_t.insert().values(id=user_id)
                conn.execute(q)

        token = token_issuer.get_token(user_id)

        self.render('index.html', token=token, user_id=user_id)
