from flask import Blueprint, abort, jsonify, make_response, request
from flask.views import MethodView
from flask_cors import CORS
from models.setting import generate_room, add_room, query_room_uuid, query_screen_shots, query_all_active_room, remove_room, update_room, query_all_owned_room
from utils.abort_msg import generate_abort_msg
from utils.string_convertor import to_snake_case
import os

bp_c_setting = Blueprint('c_setting', __name__)
CORS(bp_c_setting, origins=[os.getenv('DEV_ORIGIN'), os.getenv(
    'PROD_ORIGIN'), os.getenv('PROD_ORIGIN_WWW')], supports_credentials=True)


class Api_Setting(MethodView):
  def get(self):
    try:
      room_uuid = request.args.get('room')
      if room_uuid:
        room = query_room_uuid(room_uuid)
        screen_shots = query_screen_shots(room_uuid)
        return jsonify({
            'ownerUuid': room['owner_uuid'],
            'roomUuid': room['room_uuid'],
            'roomName': room['room_name'],
            'roomDescription': room['room_description'],
            'canvasSize': room['canvas_size'],
            'isActive': room['is_active'],
            'createOn': room['create_on'],
            'lastActivity': room['last_activity'],
            'screenShots': screen_shots
        })
      else:
        raise TypeError('Get room failed: Must provide room uuid.')
    except TypeError as e:
      abort(400, description=generate_abort_msg(e))
    except Exception as e:
      abort(500, description=generate_abort_msg(e))

  def post(self):
    try:
      owner_uuid = request.get_json()['ownerUuid']
      if owner_uuid:
        room = generate_room(owner_uuid)
        add_room(room)
        return make_response(jsonify({'ok': True, 'redirect': True, 'location': '/setting?room=' + f"{room['room_uuid']}"}))
      else:
        raise TypeError('Create room failed: Must provide owner uuid.')
    except TypeError as e:
      abort(400, description=generate_abort_msg(e))
    except Exception as e:
      abort(500, description=generate_abort_msg(e))

  def patch(self):
    try:
      updates = {to_snake_case(key): value for key,
                 value in request.json.items()}
      if updates['room_uuid']:
        if updates['canvas_size'] and updates['canvas_size'] != 'square' and updates['canvas_size'] != 'a6':
          raise TypeError('Update setting failed: Canvas size must be square or a6.')
        if updates['room_name'] and updates['room_name'] == '':
          raise TypeError('Update setting failed: Room name must not empty.')
        if query_room_uuid(updates['room_uuid']):
          update_room(updates)
          return jsonify({'ok': True})
        else:
          raise TypeError('Update setting failed: Room does not exists.')
      else:
        raise TypeError('Update setting failed: Must provide room uuid.')
    except Exception as e:
      abort(500, description=generate_abort_msg(e))


@bp_c_setting.route('/setting/<room_uuid>', methods=['DELETE'])
def delete_room(room_uuid):
  try:
    if room_uuid:
      remove_room(room_uuid)
      return jsonify({'ok': True})
    else:
      raise TypeError('Delete room failed: Must provide room uuid.')
  except TypeError as e:
    abort(400, description=generate_abort_msg(e))
  except Exception as e:
    abort(500, description=generate_abort_msg(e))


@bp_c_setting.route('/setting/room/active', methods=['GET'])
def get_all_active_room():
  try:
    all_active_room = query_all_active_room()
    return make_response(jsonify(all_active_room))
  except Exception as e:
    abort(500, description=generate_abort_msg(e))


@bp_c_setting.route('/setting/room/owned/<user_uuid>', methods=['GET'])
def get_all_owned_room(user_uuid):
  try:
    if user_uuid:
      all_owned_room = query_all_owned_room(user_uuid)
      return make_response(jsonify(all_owned_room))
    else:
      raise TypeError('Get all owned room failed: Must provide user uuid.')
  except TypeError as e:
    abort(400, description=generate_abort_msg(e))
  except Exception as e:
    abort(500, description=generate_abort_msg(e))


bp_c_setting.add_url_rule('/setting', view_func=Api_Setting.as_view('api_setting'))
