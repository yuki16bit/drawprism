from models.db_mongo_atlas import db


def query_all_active_room():
  return db.rooms.find({}, {'is_active': True})
