from flask import Blueprint, abort, jsonify, make_response, request
from utils.abort_msg import generate_abort_msg
from models.chat_log import query_all_chat_log
from flask_cors import CORS
import os


bp_c_chat_log = Blueprint('c_chat_log', __name__)
CORS(bp_c_chat_log, origins=[os.getenv('DEV_ORIGIN'), os.getenv(
    'PROD_ORIGIN'), os.getenv('PROD_ORIGIN_WWW')], supports_credentials=True)


@bp_c_chat_log.route('/chat_log/<room_uuid>', methods=['GET'])
def get_chat_log(room_uuid):
  try:
    if room_uuid:
      all_chat_log = query_all_chat_log(room_uuid)
      all_chat_log.reverse()
      return make_response(jsonify(all_chat_log))
    else:
      raise TypeError('Get all chat log failed: Must provide room uuid.')
  except TypeError as e:
    abort(400, description=generate_abort_msg(e))
  except Exception as e:
    abort(500, description=generate_abort_msg(e))
