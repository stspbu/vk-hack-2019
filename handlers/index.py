import base64
import logging
from _sha256 import sha256
from collections import OrderedDict
from hmac import HMAC
from urllib.parse import urlencode
import sqlalchemy as sa
from tornado.web import MissingArgumentError

import db
from db import get_table
from handlers.base import BaseHandler
from utils.sd_tokens import token_issuer
from settings import settings


class MainHandler(BaseHandler):
    def _requires_headers_validation(self):
        return False

    def _get_vk_params_string(self):
        return urlencode(OrderedDict(sorted(x for x in self.request.arguments.items() if x[0][:3] == "vk_")), doseq=True).encode()

    def prepare(self):
        logging.warning(self.request.arguments)
        hash_code = base64.b64encode(HMAC(settings['SECRET_KEY'].encode(), self._get_vk_params_string(), sha256).digest())
        decoded_hash_code = hash_code.decode('utf-8')[:-1].replace('+', '-').replace('/', '_')

        try:
            vk_sign = self.get_argument('sign')
        except MissingArgumentError:
            logging.info(f"get request without sign: {self.request.arguments} | {self.request.headers} | "
                         f"{self.request.body}")
            self.send_error(403)
            return

        if decoded_hash_code != vk_sign:
            logging.info(f"get request with wrong sign: {self.request.arguments} | {self.request.headers} | "
                         f"{self.request.body}")
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

        logging.debug(f"send index with paramtrs: token->{token}, user_id->{user_id}, "
                      f"vk_param_sting->{self._get_vk_params_string()}, sign->{self.get_argument('sign')}")
        self.render('index.html', token=token, user_id=user_id, vk_param_string=self._get_vk_params_string(), sign=self.get_argument('sign'))
