from models.db_mongo_atlas import db

def insert_new_nicknames(words):
  db.nicknames.insert_many(words)

def query_random_nickname():
  cursor=db.nicknames.aggregate([{ '$sample': { 'size': 1 } }])
  res=None
  for document in cursor:
    res=document['word']
  return res