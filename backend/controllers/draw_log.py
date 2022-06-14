from flask import Blueprint, abort, jsonify, make_response
from utils.abort_msg import generate_abort_msg
from models.draw_log import query_previous_draw_log, query_all_previous_draw_log
from flask_cors import CORS
import os


bp_c_draw_log = Blueprint('c_draw_log', __name__)
CORS(bp_c_draw_log, origins=[os.getenv('DEV_ORIGIN'), os.getenv(
    'PROD_ORIGIN'), os.getenv('PROD_ORIGIN_WWW')], supports_credentials=True)


@bp_c_draw_log.route('/draw_log', methods=['GET'])
def get_all_draw_log():
  try:
    all_previous_draw_log = query_all_previous_draw_log()
    return make_response(jsonify(all_previous_draw_log))
  except Exception as e:
    abort(500, description=generate_abort_msg(e))


@bp_c_draw_log.route('/draw_log/<room_uuid>', methods=['GET'])
def get_draw_log(room_uuid):
  try:
    if room_uuid:
      previous_draw_log = query_previous_draw_log(room_uuid)
      return make_response(jsonify(previous_draw_log))
    else:
      raise TypeError('Get all chat log failed: Must provide room uuid.')
  except TypeError as e:
    abort(400, description=generate_abort_msg(e))
  except Exception as e:
    abort(500, description=generate_abort_msg(e))
