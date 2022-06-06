from flask import Blueprint, abort, jsonify, make_response, request
import os
from flask_cors import CORS

bp_c_room = Blueprint('c_room', __name__)
CORS(bp_c_room, origins=[os.getenv('DEV_ORIGIN'), os.getenv('PROD_ORIGIN')], supports_credentials=True)

@bp_c_room.route('/room/<room_uuid>', methods=['GET'])
def room(room_uuid):
  print(room_uuid)
  return jsonify({ 'ok': True })