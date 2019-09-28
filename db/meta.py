from sqlalchemy import *

server_md = MetaData()

Table(
    'user', server_md,
    Column('id', INTEGER, nullable=False, autoincrement=True, primary_key=True),
    Column('correct_tested', INTEGER, default=0),
    Column('wrong_tested', INTEGER, default=0),
)
# {'noun':
#   ['заклинание', 'период', 'приступ', 'орфография', 'буквы', 'обаяние'],
# 'verb':
#   ['означать', 'писать', 'завораживать', 'сформулировать', 'писать по буквам', 'произнести по буквам'],
# 'adverb':
#   ['по буквам']
# }
Table(
    'words', server_md,
    Column('id', INTEGER, nullable=False, autoincrement=True, primary_key=True),
    Column('user_id', INTEGER, nullable=False),
    Column('correct_tested', INTEGER, default=0),
    Column('wrong_tested', INTEGER, default=0),
    Column('word', TEXT, nullable=False),
    Column('raw_data', TEXT, nullable=True),

    UniqueConstraint('user_id', 'word', name='word_unique'),
    ForeignKeyConstraint(['user_id'], ['user.id'], onupdate="CASCADE", ondelete="CASCADE")
)

Table(
    'token', server_md,
    Column('id', INTEGER, nullable=False, autoincrement=True, primary_key=True),
    Column('user_id', INTEGER, nullable=False, unique=True),
    Column('value', TEXT, nullable=False),
    Column('expires_ts', TIMESTAMP, nullable=True),  # null = unexpired

    ForeignKeyConstraint(['user_id'], ['user.id'], onupdate="CASCADE", ondelete="CASCADE")
)

Table(
    'word_package', server_md,
    Column('id', INTEGER, nullable=False, autoincrement=True, primary_key=True),
    Column('name', TEXT, nullable=False, unique=True),
    Column('avatar', TEXT, nullable=False),
    Column('words', TEXT, nullable=False),
    Column('description', TEXT, nullable=False),
)
