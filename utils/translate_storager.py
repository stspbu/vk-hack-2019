import sqlalchemy as sa
import db
import json
from utils.validators import check_english_word, check_russian_word


def merge_translations(user_id: int, new_word: str, new_translations: dict, conn) -> bool:
    words_t = db.get_table('words')

    try:
        raw_data = conn.execute(sa.select([words_t.c.raw_data]).where(words_t.c.user_id == user_id).
                                where(words_t.c.word == new_word)).next()[0]
        raw_data = json.loads(raw_data)
    except:
        raw_data = {'translations': {}}
        conn.execute(words_t.insert(), {'user_id': user_id, 'word': new_word, 'raw_data': json.dumps(raw_data)})

    translations = raw_data['translations']
    flag = False
    for key, value in new_translations.items():
        if not check_english_word(key):
            continue
        if key not in translations:
            translations[key] = []
        set_before = set(translations[key])
        old_len = len(set_before)
        set_new = set()
        for elem in value:
            if check_russian_word(elem):
                set_new.add(elem)

        set_updated = set_before.union(set_new)
        if len(set_updated) > old_len:
            flag = True
        translations[key] = list(set_updated)

    conn.execute(words_t.update(words_t.c.user_id == user_id).where(words_t.c.word == new_word),
                 {'raw_data': json.dumps(raw_data)})
    return flag

