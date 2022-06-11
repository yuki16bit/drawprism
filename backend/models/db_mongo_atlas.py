from pymongo import MongoClient
import os

client = MongoClient(os.getenv('MONGO_ALTAS_URI'))
db = client.drawprism
