import sqlalchemy as sa
from settings import settings


class EngineManager:

    DB_TYPE_TO_DIALECT_AND_DRIVER = {
        'postgresql': 'postgresql+psycopg2'
    }

    def get_engine(self):
        engine = sa.create_engine(self.__get_engine_uri(), encoding='utf-8')
        return engine

    def __get_engine_uri(self):
        # e.g. postgresql://scott:tiger@localhost:5432/mydatabase
        return '{dialect_and_driver}://{user}:{pswd}@{host}:{port}/{db}'.format(
            dialect_and_driver=self.DB_TYPE_TO_DIALECT_AND_DRIVER[settings.get('DB_TYPE')],
            user=settings.get('DB_USER'),
            pswd=settings.get('DB_PASS'),
            host=settings.get('DB_HOST'),
            port=settings.get('DB_PORT'),
            db=settings.get('DB_NAME')
        )
