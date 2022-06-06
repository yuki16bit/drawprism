from flask import Blueprint, abort, jsonify, make_response, request
from flask.views import MethodView
from flask_cors import CORS
from models.user import sign_up_user, verify_jwt_token, generate_anonymous_user, generate_jwt_token, query_user_email, hash_password, verify_password, query_user_uuid
from utils.abort_msg import generate_abort_msg
from utils.input_validation import validate_email, validate_password, validate_name
import os

bp_c_user = Blueprint('c_user', __name__)
CORS(bp_c_user, origins=[os.getenv('DEV_ORIGIN'), os.getenv('PROD_ORIGIN')], supports_credentials='True')

class Api_User(MethodView):
  def get(self):
    try:
      new_user=True
      user=generate_anonymous_user()
      jwt_cookie=request.cookies.get('jwt')

      if jwt_cookie and verify_jwt_token(jwt_cookie) is not None:
        user=verify_jwt_token(jwt_cookie)
        new_user=False

      res=make_response(jsonify({'uuid': user['uuid'], 'name': user['name'], 'isAnonymous': user['is_anonymous']}))

      if new_user:
        new_jwt=generate_jwt_token(user['uuid'], user['name'])
        res.set_cookie(
          'jwt',
          value=new_jwt,
          samesite='None' if os.getenv('FLASK_ENV') == 'development' else 'Lax',
          secure='False' if os.getenv('FLASK_ENV') == 'development' else 'True'
          )

      return res

    except Exception as e:
      abort(500, description=generate_abort_msg(e))

  def post(self):
    try:
      jwt_cookie=request.cookies.get('jwt')

      if jwt_cookie:
        user=verify_jwt_token(jwt_cookie)
        if user is not None:
          new_uuid=user['uuid']
          new_name = request.get_json()['name']
          new_email = request.get_json()['email']
          new_password = request.get_json()['password']

          if all((new_name, new_email, new_password)):
            if query_user_email(new_email):
              raise ValueError('Sign up failed: This email is already being used.')
            elif not validate_email(new_email):
              raise TypeError('Sign up failed: Invalid email format.')
            elif not validate_password(new_password):
              raise TypeError('Sign up failed: Password must be 8 to 16 characters with at least 1 digit, 1 uppercase and 1 lowercase letter.')
            elif not validate_name(new_name):
              raise TypeError('Sign up failed: Please enter alphabet-based name.')
            else:
              new_jwt=generate_jwt_token(new_uuid, new_name, False)
              res=make_response(jsonify({'ok': True}))
              res.set_cookie(
                'jwt',
                value=new_jwt,
                samesite='None' if os.getenv('FLASK_ENV') == 'development' else 'Lax',
                secure='False' if os.getenv('FLASK_ENV') == 'development' else 'True'
                )
              sign_up_user(new_uuid, new_name, new_email, hash_password(new_password))
              return res
          else:
            raise TypeError('Sign up failed: All fields must not be empty.')
        else: 
          raise ValueError('Sign up failed: Invalid token, please refresh the page and try again.')
      else:
        raise ValueError('Sign up failed: Invalid cookie, please refresh the page and try again.')

    except (ValueError, TypeError) as e:
      abort(400, description = generate_abort_msg(e))

    except Exception as e:
      abort(500, description = generate_abort_msg(e))

  def patch(self):
    try:
      email=request.get_json()['email']
      password=request.get_json()['password']
      member=query_user_email(email)
      if all((email, password)):
        if not validate_email(email):
          raise TypeError('Sign in failed: Invalid email format.')
        elif not validate_password(password):
          raise TypeError('Sign in failed: Password must be 8 to 16 characters with at least 1 digit, 1 uppercase and 1 lowercase letter.')
        elif not verify_password(hash_password(password), password) or member is None:
          raise TypeError('Sign in failed: Wrong email or password.')
        else:
          res=make_response(jsonify({'uuid': member['uuid'], 'name': member['name'], 'isAnonymous': False}))
          renew_jwt=generate_jwt_token(member['uuid'], member['name'], False)
          res.set_cookie(
            'jwt',
            value=renew_jwt,
            samesite='None' if os.getenv('FLASK_ENV') == 'development' else 'Lax',
            secure='False' if os.getenv('FLASK_ENV') == 'development' else 'True'
            )
          return res
      else:
        raise TypeError('Sign in failed: All fields must not be empty.')

    except TypeError as e:
      abort(400, description = generate_abort_msg(e))

    except Exception as e:
      abort(500, description = generate_abort_msg(e))

@bp_c_user.route('/user/<uuid>', methods=['DELETE'])
def log_out_user(uuid):
  try:
    member=query_user_uuid(uuid)
    if member is not None:
      res = make_response(jsonify({ 'ok': True }))
      res.delete_cookie(
        'jwt',
        samesite='None' if os.getenv('FLASK_ENV') == 'development' else 'Lax',
        secure='False' if os.getenv('FLASK_ENV') == 'development' else 'True'
        )
      return res
    else:
      raise TypeError("Log Out failed: Must need member's uuid")
  
  except TypeError as e:
      abort(400, description = generate_abort_msg(e))
  
  except Exception as e:
    abort(500, description = generate_abort_msg(e))

bp_c_user.add_url_rule('/user', view_func=Api_User.as_view('api_user'))
