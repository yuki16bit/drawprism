from wsgi import socket_io
from flask_socketio import send, emit
from models.user import generate_jwt_token, verify_jwt_token, generate_anonymous_user

@socket_io.on('authentication')
def authentication(jwt_cookie):
  # 檢查 User 有無攜帶 JWT
  user=None
  if jwt_cookie:
    # 若有，自動驗證 JWT
    user=verify_jwt_token(jwt_cookie)
    emit('anonymous-signin', user)
    if not user:
      # 若 JWT 驗證失敗或過期，補登記成新匿名遊客
      user=generate_anonymous_user()
      jwt = generate_jwt_token(user['uuid'], user['name'])
      emit('anonymous-signup', jwt)
  else:
    # 若無，登記成新匿名遊客
    user = generate_anonymous_user()
    jwt = generate_jwt_token(user['uuid'], user['name'])
    emit('anonymous-signup', jwt)

@socket_io.on('chatting')
def chatting(chatting_text):
  send(chatting_text, broadcast=True)

@socket_io.on('drawing')
def drawing(data):
  emit('drawing', data, broadcast=True)
