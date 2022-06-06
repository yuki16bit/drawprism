from flask import Blueprint, abort, jsonify, make_response, request
from flask.views import MethodView
from flask_cors import CORS
from models.setting import generate_room, add_room, query_room_uuid, query_participates, query_screen_shots, query_chat_logs, remove_room, update_room
from utils.abort_msg import generate_abort_msg
import os

bp_c_setting = Blueprint('c_setting', __name__)
CORS(bp_c_setting, origins=[os.getenv('DEV_ORIGIN'), os.getenv('PROD_ORIGIN')], supports_credentials=True)

class Api_Setting(MethodView):
  def get(self):
    try:
      room_uuid=request.args.get('room')
      if room_uuid:
        room=query_room_uuid(room_uuid)
        participates=query_participates(room_uuid)
        screen_shots=query_screen_shots(room_uuid)
        return jsonify({
          'ownerUuid': room['owner_uuid'],
          'roomUuid': room['room_uuid'],
          'roomName': room['room_name'],
          'roomDescription': room['room_description'],
          'canvasSize': room['canvas_size'],
          'thumbnail': room['thumbnail'],
          'isActive': room['is_active'],
          'createOn': room['create_on'],
          'lastActivity': room['last_activity'],
          'participants': participates,
          'screenShots': screen_shots
        })
      else:
        raise TypeError('Get room failed: Must provide room uuid.')
    except TypeError as e:
      abort(400, description = generate_abort_msg(e))
    except  Exception as e:
      abort(500, description = generate_abort_msg(e))

  def post(self):
    try:
      owner_uuid=request.get_json()['ownerUuid']
      if owner_uuid:
        room=generate_room(owner_uuid)
        add_room(room)
        return make_response(jsonify({ 'ok': True, 'redirect': True, 'location': '/setting?room=' + f"{room['room_uuid']}" }))
      else:
        raise TypeError('Create room failed: Must provide owner uuid.')
    except TypeError as e:
      abort(400, description=generate_abort_msg(e))
    except Exception as e:
      abort(500, description=generate_abort_msg(e))

  def patch(self):
    try:
      room_uuid=request.get_json()['roomUuid']
      if room_uuid:
        room_name=request.get_json()['roomName']
        canvas_size=request.get_json()['canvasSize']
        if all((room_name, canvas_size)):
          room_description=request.get_json()['roomDescription']
          update_room(room_uuid, room_name, room_description, canvas_size)
          return jsonify({ 'ok': True })
        else:
          raise TypeError('Update setting failed: Room name and canvas size must not empty.')
      else:
        raise TypeError('Update setting failed: Must provide room uuid.')
    except Exception as e:
      abort(500, description = generate_abort_msg(e))

@bp_c_setting.route('/setting/<room_uuid>', methods=['POST'])
def request_logs(room_uuid):
  try:
    log_name=request.get_json()['logName']
    if room_uuid:
      if log_name:
        result=None
        if log_name == 'chat':
          result=query_chat_logs(room_uuid)
          return jsonify(result['chat_logs'])
        elif log_name == 'participate':
          result=query_participates(room_uuid)
          return jsonify(result['participates'])
      else:
        raise TypeError('Request logs failed: Must tell server which log do you want.')
    else:
      raise TypeError('Request logs failed: Must provide room uuid.')
  except TypeError as e:
      abort(400, description = generate_abort_msg(e))
  except Exception as e:
    abort(500, description = generate_abort_msg(e))

@bp_c_setting.route('/setting/<room_uuid>', methods=['DELETE'])
def delete_room(room_uuid):
  try:
    if room_uuid:
      remove_room(room_uuid)
      return jsonify({ 'ok': True })
    else:
      raise TypeError('Delete room failed: Must provide room uuid.')
  except TypeError as e:
      abort(400, description = generate_abort_msg(e))
  except Exception as e:
    abort(500, description = generate_abort_msg(e))

bp_c_setting.add_url_rule('/setting', view_func=Api_Setting.as_view('api_setting'))
