import eventlet
eventlet.monkey_patch(socket=True)

import os
from models.db_rds import init_connection_pool, get_connection
from controllers.member import bp_c_member
from flask_socketio import SocketIO
from flask import Flask, current_app, jsonify

app = Flask(__name__, static_folder='../front-end/build', static_url_path='/')
with app.app_context():
  current_app.connection_pool = init_connection_pool()
  current_app.get_connection = get_connection

app.secret_key = os.getenv('JWT_SECRET_KEY')

@app.route('/')
def index():
  return app.send_static_file('index.html')

@app.route('/api/test')
def test():
  return jsonify({'ok': True})

@app.errorhandler(404)
def not_found(e):
  return app.send_static_file('index.html')

@app.errorhandler(500)
def not_found(e):
  return app.send_static_file('index.html')

app.register_blueprint(bp_c_member, url_prefix='/api')

socket_io = SocketIO(app, cors_allowed_origins='*', async_mode='eventlet', logger=True)
from controllers import socket_events