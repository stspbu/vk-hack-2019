import functools
import requests

from settings import settings


# todo add exception if yandex dictionary is inaccesable
class Translator:
    @functools.lru_cache(None)
    def translate(self, word, language='en-ru'):
        params = {
            'lang': language,
            'text': word,
            'option': '0x0002',
            'key': settings['YANDEX_DICTINARY_TOKEN']
        }
        url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
        json = requests.get(url, params).json()
        words = []
        for from_meaning in json['def']:
            words += [(meaning['pos'] + 's', meaning['text']) for meaning in from_meaning['tr'] if 'pos' in meaning and meaning['pos'] in
                      ['noun', 'adjective', 'adverb', 'verb']]
        result = {}
        for word in words:
            key = word[0]
            value = word[1]
            if key not in result:
                result[key] = []
            result[key].append(value)
        return result

    def translate_en_ru(self, word):
        return self.translate(word, 'en-ru')

    def translate_ru_en(self, word):
        return self.translate(word, 'ru-en')


if __name__ == "__main__":
    translator = Translator()
    print(translator.translate('spell'))
