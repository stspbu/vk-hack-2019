import json
from utils.translator import Translator

if __name__ == '__main__':
    data = dict()
    with open('word_packs/nature.json') as f_in:
        data = json.load(f_in)
        print(data)
    tmp = list()
    for elem in data['data']:
        key = list(elem['translations'].keys())[0]
        val = elem['translations'][key][0]
        tmp.append({
                'word':elem['word'],
                'translations': {key:val}
            })
    # tr = Translator()
    # for elem in data['data']:
    #     tmp.append({
    #         'word':elem,
    #         'translations': tr.translate(elem)
    #     })
    data['data'] = tmp
    with open('word_packs/nature2.json', 'w+') as f_out:
        f_out.write(json.dumps(data))
