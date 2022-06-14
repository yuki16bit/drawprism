import collections
from models.db_mongo_atlas import db


def add_draw_log(room_uuid, canvas_snap_shot):
  db.room_draw_logs.update_one({'room_uuid': room_uuid}, {'$set': {'draw_logs': canvas_snap_shot}})


def query_previous_draw_log(room_uuid):
  result = db.room_draw_logs.find_one({'room_uuid': room_uuid}, {'_id': False})
  return result['draw_logs']


def query_all_previous_draw_log():
  try:
    all_draw_logs = []
    collection = db.room_draw_logs.find({}, {'_id': False})
    for doc in collection:
      all_draw_logs.append(doc['draw_logs'])
    return all_draw_logs
  except:
    return
