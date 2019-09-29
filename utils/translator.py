import functools
import requests
import logging

from settings import settings
from utils.validators import check_russian_word


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
        try:
            data = requests.get(url, params).json()
        except ValueError:
            logging.error(f"yander answer structure error")
            raise RuntimeError
        except requests.exceptions.RequestException:
            logging.error(f"network error")
            raise RuntimeError
        words = []
        if 'def' not in data:
            logging.error(f"def not in answer: {data}")
            raise RuntimeError

        for from_meaning in data['def']:
            if 'tr' not in from_meaning:
                logging.error(f"tr not in answer: {data}")
                raise RuntimeError
            words += [(meaning['pos'] + 's', meaning['text']) for meaning in from_meaning['tr'] if 'pos' in meaning and meaning['pos'] in
                      ['noun', 'adjective', 'adverb', 'verb'] and 'text' in meaning]
        result = {}
        for word in words:
            if not check_russian_word(word[1]):
                continue
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
