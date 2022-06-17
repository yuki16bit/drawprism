from flask import Blueprint, abort, jsonify, request
from datetime import datetime
from utils.string_convertor import to_snake_case
from models.setting import update_room
from models.participate import query_all_participate, join_participate, leave_participate
from utils.abort_msg import generate_abort_msg
from flask_cors import CORS
import os

bp_c_participate = Blueprint('c_participate', __name__)
CORS(bp_c_participate, origins=[os.getenv('DEV_ORIGIN'), os.getenv(
    'PROD_ORIGIN'), os.getenv('PROD_ORIGIN_WWW')], supports_credentials=True)


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
