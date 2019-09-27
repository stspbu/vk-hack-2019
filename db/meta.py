from sqlalchemy import *

server_md = MetaData()

Table(
    'test', server_md,
    Column('id', INTEGER, nullable=False, autoincrement=True),
    Column('raw_data', TEXT, nullable=True),

    # created_ts ?
    # deleted_ts ?

    PrimaryKeyConstraint('id', name=f'pk_fssdf_t_id')
)

