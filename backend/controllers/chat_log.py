from flask import Blueprint, abort, jsonify, make_response, request
from utils.abort_msg import generate_abort_msg
from flask_cors import CORS
import os


bp_c_chat_log = Blueprint('c_chat_log', __name__)
CORS(bp_c_chat_log, origins=[os.getenv('DEV_ORIGIN'), os.getenv('PROD_ORIGIN')], supports_credentials=True)


@bp_c_chat_log.route('/chat_log/<room_uuid>', methods=['GET'])
def get_chat_log(room_uuid):
  return jsonify({'ok': True})


@bp_c_chat_log.route('/chat_log/<room_uuid>', methods=['POST'])
def post_chat_log(room_uuid):
  return jsonify({'ok': True})
