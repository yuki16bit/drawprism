from models.db_rds import with_connection

@with_connection(need_commit=True)
def insert_new_nicknames(cursor, word_list):
  cursor.executemany('INSERT INTO nickname (word) VALUES (%s)', word_list)

@with_connection(need_commit=False)
def query_random_nickname(cursor):
  cursor.execute('SELECT word FROM nickname ORDER BY RAND() LIMIT 1')
  random_nickname = cursor.fetchone()
  return random_nickname[0]
