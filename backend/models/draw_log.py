from models.db_mongo_atlas import db


def add_draw_log(room_uuid, saved_url):
  db.room_draw_logs.update_one({'room_uuid': room_uuid}, {'$set': {'draw_logs': saved_url}})


def query_previous_draw_log(room_uuid):
  result = db.room_draw_logs.find_one({'room_uuid': room_uuid}, {'_id': False})
  return result['draw_logs']
