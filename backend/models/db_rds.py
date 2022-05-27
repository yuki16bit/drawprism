import os
from flask import current_app, abort
from mysql.connector import Error, pooling
from functools import wraps


def init_connection_pool():
  return pooling.MySQLConnectionPool(
      pool_name=os.getenv('POOL_NAME'),
      pool_size=int(os.getenv('POOL_SIZE')),
      host=os.getenv('RDS_HOST'),
      port=int(os.getenv('RDS_PORT')),
      user=os.getenv('RDS_USER'),
      password=os.getenv('RDS_PASSWORD'),
      database=os.getenv('RDS_DB')
  )


def get_connection():
  try:
    cnx = current_app.db_pool.get_connection()
    if cnx.is_connected():
      return cnx
  except Error as e:
    print('RDS Connection error: ', e)


def with_connection(need_commit=None):
  def decorator(func):
    @wraps(func)
    def decorated_func(*args, **kwargs):
      cnx = current_app.rds_cnx()
      cursor = cnx.cursor()
      try:
        result = func(cursor, *args, **kwargs)
        if need_commit:
          cnx.commit()
      except Error as e:
        cnx.rollback()
        abort(500, description=f'Exception raised in cnx.py: {e}')
      finally:
        cursor.close()
        cnx.close()
      return result
    return decorated_func
  return decorator
