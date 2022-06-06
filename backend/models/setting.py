from datetime import datetime
from models.db_mongo_atlas import db
import shortuuid

def generate_room(owner_uuid):
  room_uuid = shortuuid.uuid()[:9]
  room = {
    'owner_uuid': owner_uuid,
    'room_uuid': room_uuid,
    'room_name': 'room @ ' + room_uuid,
    'room_description': '',
    'thumbnail': '',
    'canvas_size': 'square',
    'is_active': False,
    'create_on': datetime.utcnow(),
    'last_activity': ''
  }
  return room

def add_room(room):
  db.rooms.insert_one(room)
  db.room_participates.insert_one({'room_uuid': room['room_uuid'], 'participates': []})
  db.room_screen_shots.insert_one({'room_uuid': room['room_uuid'], 'screen_shots': []})
  db.room_chat_logs.insert_one({'room_uuid': room['room_uuid'], 'chat_logs': []})

def query_room_uuid(room_uuid):
  return db.rooms.find_one({ 'room_uuid': room_uuid }, {'_id': False})

def query_participates(room_uuid):
  return db.room_participates.find_one({ 'room_uuid': room_uuid }, {'_id': False, 'room_uuid': False})

def query_screen_shots(room_uuid):
  return db.rooms.find_one({ 'room_uuid': room_uuid }, {'_id': False})

def query_chat_logs(room_uuid):
  return db.room_chat_logs.find_one({ 'room_uuid': room_uuid }, {'_id': False, 'room_uuid': False})

def update_room(room_uuid, room_name, room_description, canvas_size):
  room=query_room_uuid(room_uuid)
  db.rooms.update_one(
    { 'room_uuid': room_uuid },
    {'$set': {
      'room_name': room_name if room['room_name'] != room_name else room['room_name'],
      'room_description': room_description if room['room_description'] != room_description else room['room_description'],
      'canvas_size': canvas_size if room['canvas_size'] != canvas_size else room['canvas_size']
    }}
  )

def remove_room(room_uuid):
  db.rooms.delete_one({'room_uuid': room_uuid})
  db.room_participates.delete_one({'room_uuid': room_uuid})
  db.room_screen_shots.delete_one({'room_uuid': room_uuid})
  db.room_chat_logs.delete_one({'room_uuid': room_uuid})
