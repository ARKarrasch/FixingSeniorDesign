import pymysql.cursors

def sql_query(sql, many=True):
    result = None
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='Password99',
        database='Kram'
    )
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql)
            if (many):
                result = cursor.fetchall()
            else:
                result = cursor.fetchone()
    finally:
        connection.close()
    return result

def sql_execute(sql):
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='Password99',
        database='Kram',
        autocommit=True
    )
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql)
    finally:
        connection.close()