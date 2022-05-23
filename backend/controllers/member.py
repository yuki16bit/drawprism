from flask import current_app, Blueprint, request, abort, jsonify, make_response
from flask.views import MethodView
from models.member import signup_anonymous_member
from utils.abort_msg import abort_msg
import jwt
import shortuuid

bp_c_member = Blueprint('c_user', __name__)


class Api_Member(MethodView):
  def get(self):
    print('SHORT UUID おおおおおおおおおおお')
    print(shortuuid.uuid()[:4])
    return jsonify({'ok': True})

  def post(self):
    try:
      new_member_uuid = shortuuid.uuid()
      new_member_name = 'Guest' + new_member_uuid[:4]
      if all((new_member_uuid, new_member_name)):
        signup_anonymous_member(new_member_uuid, new_member_name, True)
        return make_response(jsonify({'ok': True}), 200)
      else:
        raise TypeError('Api_Member: POST, Fields should not be empty.')
    except TypeError as e:
      abort(400, description=abort_msg(e))
    except Exception as e:
      abort(500, description=abort_msg(e))

  def patch(self):
    return jsonify({'ok': True})

  def put(self):
    return jsonify({'ok': True})


bp_c_member.add_url_rule('/member', view_func=Api_Member.as_view('api_member'))
