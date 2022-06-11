import re


def to_snake_case(word):
  return re.sub('(?<!^)(?=[A-Z])', '_', word).lower()
