import json
from utils.translator import Translator


def main1(input_file, output_file):
    lines= list()
    with open(input_file) as f_in:
        lines = f_in.readlines()
    lines = ['"' + line[:-1] + '",\n' for line in lines]
    with open(output_file, 'w+') as f_out:
        f_out.write('{"avatar":"","description":"","data":[')
        f_out.writelines(lines)
        f_out.write(']}')


def main2(input_file, output_file):
    with open(input_file) as f_in:
        data = json.load(f_in)
    tmp = list()
    tr = Translator()
    for elem in data['data']:
        trans = tr.translate(elem)
        if not list(trans.keys()):
            continue
        key = list(trans.keys())[0]
        val = trans[key][0]
        tmp.append({
            'word':elem,
            'translations': {key:val}
        })
    data['data'] = tmp
    with open(output_file, 'w+') as f_out:
        f_out.write(json.dumps(data))


def main4(input_file, output_file):
    with open(input_file) as f_in:
        data = json.load(f_in)
    tmp = list()
    tr = Translator()
    for elem in data['data']:
        if ' ' in elem['word']:
            continue
        key = list(elem['translations'].keys())[0]
        val = elem['translations'][key]
        tmp.append({
            'word':elem['word'],
            'translations': {key:[val]}
        })
    data['data'] = tmp
    with open(output_file, 'w+') as f_out:
        f_out.write(json.dumps(data))


def main3(input_file):
    with open(input_file) as f_in:
        data = json.load(f_in)
        print(data)


if __name__ == '__main__':
    # main1('word_packs/wild_animals3.json', 'word_packs/wild_animals2.json')
    # main2('word_packs/wild_animals2.json', 'word_packs/wild_animals.json')
    # main3('word_packs/wild_animals.json')
    main4('word_packs/birds.json', 'word_packs/birds.json')
