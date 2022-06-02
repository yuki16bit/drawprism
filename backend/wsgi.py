import eventlet
eventlet.monkey_patch(socket=True)

from models.db_rds import init_connection_pool, get_connection
from controllers.user import bp_c_user
from flask import Flask, current_app
from flask_socketio import SocketIO
import os

app = Flask(__name__, static_folder='../front-end/build', static_url_path='/')
with app.app_context():
  current_app.connection_pool = init_connection_pool()
  current_app.get_connection = get_connection

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_ALG'] = os.getenv('JWT_ALG')

@app.route('/')
def index():
  return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
  return app.send_static_file('index.html')

@app.errorhandler(500)
def not_found(e):
  return app.send_static_file('index.html')

app.register_blueprint(bp_c_user, url_prefix='/api')

socket_io = SocketIO(app, cors_allowed_origins='*', async_mode='eventlet', logger=True)
from controllers import socket_events