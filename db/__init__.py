from .connection import ConnectionManager
from .utils import get_table

__all__ = ['get_table', 'get_connection']

__connection_manager = ConnectionManager()

get_connection = __connection_manager.get_connection
get_table = get_table
