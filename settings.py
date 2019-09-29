import logging

logging_config_dict = {
  "version": 1,
  "disable_existing_loggers": False,
  "formatters": {
    "simple": {
      "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    }
  },
  "handlers": {
    "console": {
      "class": "logging.StreamHandler",
      "level": "DEBUG",
      "formatter": "simple",
      "stream": "ext://sys.stdout"
    }
  },
  "loggers": {
    "": {
      "handlers": [
        "console"
      ],
      "level": "DEBUG",
      "propagate": False
    }
  }
}

settings = {
    'DB_TYPE': 'postgresql',
    'DB_USER': 'postgres',
    'DB_PASS': 'postgres',
    'DB_HOST': 'localhost',
    'DB_PORT': '5432',
    'DB_NAME': 'sdict',
    'SECRET_KEY': 'PqwFekrI1arHHZwXKk1w',
    'LOG_LEVEL': logging.INFO,
    'TEST_MODE': False,
    'YANDEX_DICTINARY_TOKEN': 'dict.1.1.20190707T212740Z.63c69eb98eae973c.d4e03018461eaac7cfb1187cb9f7fbdc5ac8d4f8'
}

try:
    import local_settigs
    for key, val in local_settigs.values():
        settings[key] = val
except ImportError:
    pass

