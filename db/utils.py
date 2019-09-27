from db.meta import server_md


def get_table(table_name):
    if table_name in server_md.tables:
        return server_md.tables[table_name]

    raise ValueError
