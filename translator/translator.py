import functools
import requests

class Translator:
    @functools.lru_cache(None)
    def translate(self, word, language='en-ru'):
        params = {
            'lang': language,
            'text': word,
            'option': '0x0002',
            'key': 'dict.1.1.20190707T212740Z.63c69eb98eae973c.d4e03018461eaac7cfb1187cb9f7fbdc5ac8d4f8'
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
