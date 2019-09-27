from .connection import ConnectionManager
from .meta import utils

__all__ = ['get_table', 'get_connection']

__connection_manager = ConnectionManager()

get_connection = __connection_manager.get_connection
get_table = utils.get_table
