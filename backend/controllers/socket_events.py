from wsgi import socket_io
from flask import request
from flask_socketio import emit, join_room, leave_room
from models.participate import join_participate, leave_participate, query_participate_request_sid
from controllers.celery_tasks import pull_participate_after_disconnect, record_chat_log


@socket_io.on('connect')
def client_connect():
  print('connect', request.sid)


@socket_io.on('join-room')
def new_join_room(join_data):
  room_uuid = join_data['roomUuid']
  join_message = {
      'talkerName': join_data['participate']['userName'],
      'talkerUuid': join_data['participate']['userUuid'],
      'text': f" ({join_data['participate']['role']}, {join_data['participate']['mode']}) has joined this room."
  }
  if join_data['action'] == 'join':
    join_participate({'room_uuid': room_uuid, 'participate': {
                     **join_data['participate'], 'room_uuid': room_uuid, 'request_sid': request.sid}})

  join_room(room_uuid)
  record_chat_log(room_uuid, join_message)
  emit('join-room', join_message, to=room_uuid)


@socket_io.on('send-chat')
def chatting(chatting_data):
  room_uuid = chatting_data['roomUuid']
  record_chat_log(room_uuid, chatting_data)
  emit('receive-chat', chatting_data, to=room_uuid)


@socket_io.on('send-draw')
def drawing(drawing_data):
  room_uuid = drawing_data['roomUuid']
  emit('receive-draw', drawing_data, to=room_uuid)


@socket_io.on('leave-room')
def old_leave_room(leave_data):
  room_uuid = leave_data['roomUuid']
  leave_message = {
      'talkerName': leave_data['participate']['userName'],
      'talkerUuid': leave_data['participate']['userUuid'],
      'text': f"({leave_data['participate']['role']}, {leave_data['participate']['mode']}) has left this room."
  }
  if leave_data['action'] == 'leave':
    leave_participate({'room_uuid': room_uuid, 'participate': {
        **leave_data['participate'], 'room_uuid': room_uuid, 'request_sid': request.sid}})
  leave_room(room_uuid)
  record_chat_log(room_uuid, leave_message)
  emit('leave-room', leave_message, to=room_uuid)


@socket_io.on('disconnect')
def client_disconnect():
  try:
    participate = query_participate_request_sid(request.sid)
    if participate:
      leave_message = {
          'talkerName': participate['userName'],
          'talkerUuid': participate['userUuid'],
          'text': f"({participate['role']}, {participate['mode']}) has left this room."
      }
      record_chat_log(participate['room_uuid'], leave_message)
      emit('receive-chat', leave_message, to=participate['room_uuid'])
      pull_participate_after_disconnect(participate)
      print(request.sid, 'client disconnect!')
  except:
    return
