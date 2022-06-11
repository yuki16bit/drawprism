from wsgi import celery_app
from flask_socketio import SocketIO
from models.participate import leave_participate
from models.chat_log import add_chat_log

local_socket_io = SocketIO(message_queue='redis://localhost:6379')


@celery_app.task()
def pull_participate_after_disconnect(participate):
  leave_participate({
      'room_uuid': participate['room_uuid'],
      'participate': participate})


@celery_app.task()
def record_chat_log(room_uuid, chatting_data):
  add_chat_log(room_uuid, chatting_data)
