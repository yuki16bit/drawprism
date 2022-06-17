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
      'canvas_size': 'square',
      'is_active': False,
      'create_on': datetime.utcnow(),
      'last_activity': ''
  }
  return room


def add_room(room):
  db.rooms.insert_one(room)
  db.room_participates.insert_one(
      {'room_uuid': room['room_uuid'], 'participates': [], 'participated': []})
  db.room_screen_shots.insert_one(
      {'room_uuid': room['room_uuid'], 'screen_shots': []})
  db.room_chat_logs.insert_one(
      {'room_uuid': room['room_uuid'], 'chat_logs': []})
  db.room_draw_logs.insert_one(
      {'room_uuid': room['room_uuid'], 'draw_logs': ''})


def query_room_uuid(room_uuid):
  return db.rooms.find_one({'room_uuid': room_uuid}, {'_id': False})


def query_screen_shots(room_uuid):
  return db.rooms.find_one({'room_uuid': room_uuid}, {'_id': False})


def query_chat_logs(room_uuid):
  return db.room_chat_logs.find_one({'room_uuid': room_uuid}, {'_id': False, 'room_uuid': False})


def update_room(updates):
  db.rooms.update_one(
      {'room_uuid': updates['room_uuid']},
      {'$set': updates}
  )


def query_all_active_room():
  cursor = db.rooms.find({'is_active': True}, {'_id': False})
  all_active_room = []
  for result in cursor:
    all_active_room.append(result)
  return all_active_room


def query_all_owned_room(user_uuid):
  cursor_room = db.rooms.find({'owner_uuid': user_uuid}, {'_id': False})
  all_owned_room = []
  for result in cursor_room:
    room_draw_log = db.room_draw_logs.find_one({'room_uuid': result['room_uuid']}, {'_id': False})
    result['draw_log'] = room_draw_log['draw_logs']
    all_owned_room.append(result)
  return all_owned_room


def remove_room(room_uuid):
  db.rooms.delete_one({'room_uuid': room_uuid})
  db.room_participates.delete_one({'room_uuid': room_uuid})
  db.room_screen_shots.delete_one({'room_uuid': room_uuid})
  db.room_chat_logs.delete_one({'room_uuid': room_uuid})
