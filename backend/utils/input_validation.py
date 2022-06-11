import re
from datetime import datetime


def validate_email(email):
  email_format: str = r"\S+@\S+\.\S+"
  return True if re.match(email_format, str(email), re.IGNORECASE) else False


def validate_password(password):
  # 8-16 位英數字，至少包含 1 數字 + 1 大寫 + 1 小寫
  password_format: str = r"^(?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])[A-Za-z\d]{8,16}$"
  return True if re.match(password_format, str(password), re.IGNORECASE) else False


def validate_name(name):
  # 歐美姓名
  alphabet_name_format: str = r"^([ \u00c0-\u01ffa-zA-Z'\-])+$"
  return True if re.match(alphabet_name_format, str(name)) else False


def validate_date(date):
  # YYYY-DD-MM
  return True if date == datetime.strptime(date, "%Y-%m-%d").strftime('%Y-%m-%d') else False
