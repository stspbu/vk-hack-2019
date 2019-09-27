import logging
import sqlalchemy.exc

from .engine import EngineManager


class ConnectionManager:
    """
    Starting point for any operations over DB.
    Connection manager creates an engine and establishes connections himself.
    """
    def __init__(self):
        self.engine_manager = EngineManager()
        self.connection_retry = 0

    def get_connection(self):
        engine = self.engine_manager.get_engine()

        try:
            return engine.connect()
        except sqlalchemy.exc.DBAPIError as e:
            return self._on_connection_failed(e)

    def _on_connection_failed(self, e):
        self.connection_retry += 1
        logging.info(f'ConnectionManager: unable to connect #{self.connection_retry}')

        if self.connection_retry > 3:
            logging.error('ConnectionManager: max connection retry exceeded')
            raise e

        return self.get_connection()
