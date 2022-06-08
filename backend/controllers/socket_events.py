from wsgi import socket_io
from flask_socketio import emit, join_room, leave_room


@socket_io.on('join-room')
def new_join_room(join_data):
  print('join_data', join_data)
  room = join_data['roomUuid']
  participate = join_data['participate']
  join_message = {
      'roomUuid': room,
      'talkerName': participate['userName'],
      'talkerUuid': participate['userUuid'],
      'text': f"({participate['role']}, {participate['mode']}) has joined this room."
  }
  join_room(room)
  emit('join-room', join_message, to=room)


@socket_io.on('send-chat')
def chatting(chatting_data):
  room = chatting_data['roomUuid']
  emit('receive-chat', chatting_data, to=room)


@socket_io.on('send-draw')
def drawing(drawing_data):
  room = drawing_data['roomUuid']
  emit('receive-draw', drawing_data, to=room)


@socket_io.on('leave-room')
def old_leave_room(leave_data):
  room = leave_data['roomUuid']
  participate = leave_data['participate']
  leave_message = {
      'talkerName': participate['userName'],
      'talkerUuid': participate['userUuid'],
      'text': f"({participate['role']}, {participate['mode']}) has left this room."
  }
  leave_room(room)
  emit('leave-room', leave_message, to=room)
