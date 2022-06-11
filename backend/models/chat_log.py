from models.db_mongo_atlas import db


def query_all_chat_log(room_uuid):
  collection = db.room_chat_logs.find_one({'room_uuid': room_uuid})
  return collection['chat_logs']


def add_chat_log(room_uuid, chatting_data):
  if 'roomUuid' in chatting_data:
    chatting_data.pop('roomUuid')
  db.room_chat_logs.update_one({'room_uuid': room_uuid}, {'$push': {'chat_logs': chatting_data}})
