from flask import Blueprint, abort, jsonify, make_response
from flask.views import MethodView
from models.user import signup_user
from utils.abort_msg import generate_abort_msg
import shortuuid

bp_c_user = Blueprint('c_user', __name__)


class Api_User(MethodView):
  def get(self):
    print(shortuuid.uuid()[:4])
    return jsonify({'ok': True})

  def post(self):
    pass

  def patch(self):
    return jsonify({'ok': True})

  def put(self):
    return jsonify({'ok': True})


bp_c_user.add_url_rule('/user', view_func=Api_User.as_view('api_user'))
