from flask import current_app
from datetime import datetime, timedelta
from models.db_rds import with_connection
from models.nickname import query_random_nickname
from random import randint
import jwt
import shortuuid
import math

@with_connection(need_commit=True)
def signup_user(cursor, new_user_uuid, new_user_name):
  cursor.execute('INSERT INTO user (uuid, name) VALUES (%s, %s)', (new_user_uuid, new_user_name))


@with_connection(need_commit=False)
def query_user(cursor, uuid):
  cursor.execute('SELECT name FROM user WHERE uuid = %s', (uuid, ))
  user = cursor.fetchone()
  return user[0]

def verify_jwt_token(token):
  try:
    user = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=current_app.config['JWT_ALG'])
    return user
  except:
    return

def generate_jwt_token(uuid, name, is_anonymous=True):
  payload = {
    'uuid': uuid,
    'name': name,
    'is_anonymous': is_anonymous,
    'exp': datetime.utcnow() + timedelta(days = 90)
  }
  return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm=current_app.config['JWT_ALG'])

def generate_anonymous_user():
  new_user_uuid = shortuuid.uuid()[:7]
  new_user_name = query_random_nickname() + str(randint(math.pow(10, 3), math.pow(10, 4)-1))
  return {'uuid':new_user_uuid, 'name': new_user_name}