import shortuuid
from wsgi import socket_io
from flask_socketio import send, emit
from flask import session

@socket_io.on('connect')
def socket_connect():
  new_member_name = 'Guest-' + shortuuid.uuid()[:4]
  session.permanent = True
  session['member_name'] = new_member_name

@socket_io.on('message')
def handleMessage(msg):
  send(msg, broadcast=True)

@socket_io.on('member')
def socket_member():
  send(session['member_name'], broadcast=True)

@socket_io.on('drawing')
def handleDraw(data):
  emit('drawing', data, broadcast=True)
