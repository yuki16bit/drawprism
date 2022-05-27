from models.db_rds import with_connection
import jwt


@with_connection(need_commit=True)
def signup_anonymous_member(cursor, new_member_uuid, new_member_name, is_anonymous):
  cursor.execute('INSERT INTO member (uuid, name, is_anonymous) VALUES (%s, %s, %s)',
                 (new_member_uuid, new_member_name, is_anonymous))


@with_connection(need_commit=False)
def query_anonymous_member(cursor, member_uuid):
  cursor.execute('SELECT name FROM member WHERE uuid = %s',
                 (member_uuid, ))
  member = cursor.fetchone()
  return member
