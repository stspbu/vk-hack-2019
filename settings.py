import logging


settings = {
    'DB_TYPE': 'postgresql',
    'DB_USER': 'postgres',
    'DB_PASS': 'postgres',
    'DB_HOST': 'localhost',
    'DB_PORT': '5432',
    'DB_NAME': 'sdict',
    'SECRET_KEY': 'PqwFekrI1arHHZwXKk1w',
    'LOG_LEVEL': logging.INFO,
    'TEST_MODE': True,
}

try:
    import local_settigs
    for key, val in local_settigs.values():
        settings[key] = val
except ImportError:
    pass

