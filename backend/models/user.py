from flask import current_app
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from models.db_mongo_atlas import db
from models.nickname import query_random_nickname
from random import randint
import jwt
import shortuuid
import math


def sign_up_user(new_uuid, new_name, new_email, new_password):
  db.users.insert_one({
      'uuid': new_uuid,
      'name': new_name,
      'email': new_email,
      'password': new_password
  })


def query_user_uuid(uuid):
  return db.users.find_one({'uuid': uuid})


def query_user_email(email):
  return db.users.find_one({'email': email})


def hash_password(password):
  return generate_password_hash(password)


def verify_password(password_hash, password):
  return check_password_hash(password_hash, password)


def verify_jwt_token(token):
  try:
    user = jwt.decode(
        token, current_app.config['SECRET_KEY'], algorithms=current_app.config['JWT_ALG'])
    return user
  except:
    return


def generate_jwt_token(uuid, name, is_anonymous=True):
  payload = {
      'uuid': uuid,
      'name': name,
      'is_anonymous': is_anonymous,
      'exp': datetime.utcnow() + timedelta(days=90)
  }
  return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm=current_app.config['JWT_ALG'])


def generate_anonymous_user():
  uuid = shortuuid.uuid()[:7]
  name = query_random_nickname() + str(randint(10, math.pow(10, 4)-1))
  return {'uuid': uuid, 'name': name, 'is_anonymous': True}
