from flask import Blueprint, abort, jsonify, request
from datetime import datetime
from utils.string_convertor import to_snake_case
from models.setting import update_room
from models.participate import query_all_participate, join_participate, leave_participate
from utils.abort_msg import generate_abort_msg
from flask_cors import CORS
import os

bp_c_participate = Blueprint('c_participate', __name__)
CORS(bp_c_participate, origins=[os.getenv('DEV_ORIGIN'), os.getenv('PROD_ORIGIN')], supports_credentials=True)


@bp_c_participate.route('/participate/<room_uuid>', methods=['GET'])
def get_all_participate(room_uuid):
  try:
    if not room_uuid:
      raise TypeError('Get participate failed: Must provide room uuid.')
    else:
      result = query_all_participate(room_uuid)
    return jsonify(result['participates'])
  except TypeError as e:
    abort(400, description=generate_abort_msg(e))
  except Exception as e:
    abort(500, description=generate_abort_msg(e))


@bp_c_participate.route('/participate/<room_uuid>', methods=['PATCH'])
def update_participate(room_uuid):
  try:
    updates = {to_snake_case(key): value for key, value in request.json.items()}
    if room_uuid:
      current_all_participate = query_all_participate(room_uuid)

      if updates['action'] and updates['action'] == 'join':
        if len(current_all_participate['participates']) <= 0:
          update_room({'room_uuid': room_uuid, 'is_active': True, 'last_activity': datetime.utcnow()})
        join_participate({'room_uuid': room_uuid, 'participate': updates['participate']})

      elif updates['action'] and updates['action'] == 'leave':
        if len(current_all_participate['participates']) - 1 <= 0:
          update_room({'room_uuid': room_uuid, 'is_active': False, 'last_activity': datetime.utcnow()})
        leave_participate({'room_uuid': room_uuid, 'participate': updates['participate']})

      else:
        raise TypeError('Get participate failed: No update action or invalid update action.')

      return jsonify({'ok': True})

    else:
      raise TypeError('Get participate failed: Must provide room uuid.')
  except TypeError as e:
    abort(400, description=generate_abort_msg(e))
  except Exception as e:
    abort(500, description=generate_abort_msg(e))
