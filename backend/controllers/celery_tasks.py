from wsgi import celery_app
from flask_socketio import SocketIO
from models.participate import leave_participate
from models.chat_log import add_chat_log
from models.draw_log import add_draw_log
import os

redis_url = os.getenv('PROD_REDIS_CLOUD_URL') if os.getenv(
    'FLASK_ENV') == 'production' else os.getenv('DEV_REDIS_CLOUD_URL')
local_socket_io = SocketIO(message_queue=redis_url)


@celery_app.task()
def pull_participate_after_disconnect(participate):
  leave_participate({
      'room_uuid': participate['room_uuid'],
      'participate': participate})


@celery_app.task()
def record_chat_log(room_uuid, chatting_data):
  add_chat_log(room_uuid, chatting_data)


@celery_app.task()
def record_draw_log(room_uuid, drawing_data):
  add_draw_log(room_uuid, drawing_data)
