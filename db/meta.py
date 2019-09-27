from sqlalchemy import *

server_md = MetaData()

Table(
    'user', server_md,
    Column('user_id', INTEGER, nullable=False, autoincrement=True, primary_key=True),

    # created_ts ?
    # deleted_ts ?
)

Table(
    'words', server_md,
    Column('user_id', INTEGER, ForeignKey("user.user_id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False),
    Column('word', TEXT, nullable=False),
    Column('raw_data', TEXT, nullable=True),

    PrimaryKeyConstraint('user_id', 'word', name=f'pk_words_t_id')
)
