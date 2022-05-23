from controllers.member import bp_c_member
from utils.with_cnx import with_cnx
from flask import Flask, abort, current_app, jsonify, session, request
from flask_socketio import SocketIO, send, emit
from mysql.connector import Error, pooling
import os
import shortuuid
import boto3
import eventlet
eventlet.monkey_patch(socket=True)


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


app = Flask(__name__, static_folder='../front-end/build', static_url_path='/')
with app.app_context():
  current_app.db_pool = create_rds_pool()
  current_app.rds_cnx = rds_cnx

app.secret_key = os.getenv('JWT_SECRET_KEY')


@app.route('/')
def index():
  return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
  return app.send_static_file('index.html')


@app.errorhandler(500)
def not_found(e):
  return app.send_static_file('index.html')


app.register_blueprint(bp_c_member, url_prefix='/api')


socket_io = SocketIO(app, cors_allowed_origins='*',
                     async_mode='eventlet',
                     logger=True)


@socket_io.on('connect')
def socket_connect():
  print('あおおああおあおいうふぃｆｊごｗじおｗｊ！')
  new_member_name = 'Guest-' + shortuuid.uuid()[:4]
  session.permanent = True
  session['member_name'] = new_member_name


@socket_io.on('member')
def socket_member():
  send(session['member_name'], broadcast=True)


@socket_io.on('message')
def handleMessage(msg):
  send(msg, broadcast=True)


@socket_io.on('draw')
def handleDraw(data):
  emit('show', data)
