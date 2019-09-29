import re


valid_english_word_regexp = re.compile(r"^[a-z]+$")
valid_russian_word_regexp = re.compile(r"^[а-яa-z]+$")


def check_english_word(s: str) -> bool:
    if not isinstance(s, str):
        return False
    return bool(valid_english_word_regexp.findall(s))


def check_russian_word(s: str) -> bool:
    if not isinstance(s, str):
        return False
    return bool(valid_russian_word_regexp.findall(s))

