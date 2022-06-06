from wsgi import socket_io
from flask_socketio import emit

@socket_io.on('send-chat')
def chatting(chatting_data):
  print('chatting_data', chatting_data)
  emit('receive-chat', chatting_data, broadcast=True)

@socket_io.on('send-draw')
def drawing(drawing_data):
  emit('receive-draw', drawing_data, broadcast=True)
