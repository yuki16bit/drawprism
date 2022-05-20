import os
import boto3
from mysql.connector import Error, pooling
from flask_socketio import SocketIO, send, emit
from flask import Flask, current_app, jsonify
from wrappers.with_cnx import with_cnx


def create_rds_pool():
  return pooling.MySQLConnectionPool(
      pool_name=os.getenv('POOL_NAME'),
      pool_size=int(os.getenv('POOL_SIZE')),
      host=os.getenv('RDS_HOST'),
      port=int(os.getenv('RDS_PORT')),
      user=os.getenv('RDS_USER'),
      password=os.getenv('RDS_PASSWORD'),
      database=os.getenv('RDS_DB')
  )


def rds_cnx():
  try:
    cnx = current_app.db_pool.get_connection()
    if cnx.is_connected():
      return cnx
  except Error as e:
    print('RDS Connection error: ', e)


app = Flask(__name__, static_folder='../client/build', static_url_path='/')
with app.app_context():
  current_app.db_pool = create_rds_pool()
  current_app.rds_cnx = rds_cnx


socketio = SocketIO(app, cors_allowed_origins='*', logger=True)


@app.route('/')
def index():
  return app.send_static_file('index.html')


@with_cnx(need_commit=False)
def query_messages(cursor):
  cursor.execute('SELECT content, image_url FROM messages')
  columns = [column[0] for column in cursor.description]
  output = [dict(zip(columns, row)) for row in cursor.fetchall()]
  return output


@app.route('/api/test', methods=['GET'])
def test():
  try:
    result = query_messages()
    return jsonify({'data': result if result else []})
  except Exception as e:
    abort(500, description=e)


@app.errorhandler(404)
def not_found(e):
  return app.send_static_file('index.html')


@socketio.on('message')
def handleMessage(msg):
  send(msg, broadcast=True)
