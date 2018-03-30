from flask import Flask, request, url_for, jsonify, json
from flask_api import FlaskAPI, status, exceptions
from flask_cors import CORS, cross_origin
from db.db import sql_query, sql_execute

import numbers

app = Flask(__name__)
CORS(app, send_wildcard=True)
# cors = CORS(app, resources={r"/*": {"origins":"*"}})

@app.route('/login', methods=['POST'])
def get_login():
    username = request.get_json(force = True)["username"]
    password = request.get_json(force = True)["password"]
    results = sql_query('SELECT userId FROM Kram.User WHERE userName=\"' + username + '\" AND password=\"' + password + '\"', False)
    if (type(results) == type(None)):
        return jsonify( isUser=False, userId=None)
    else:
        return jsonify( isUser=True, userId=results[0])

@app.route('/list', methods=['POST'])
def get_search():
    user_id = request.get_json(force = True)["userId"]
    sort = request.get_json(force = True)["sort"]
    print(sort)
    if (sort == "price"):
        results = sql_query('SELECT Item.itemId, Item.name, Item.price FROM Kram.Item WHERE userId=' + str(user_id) + ' ORDER BY Item.price ASC;')
        resultsList = []
        for i in results:
            resDict = {
            "itemId": i[0],
            "name": i[1],
            "price": i[2]}
            resultsList.append(resDict)
        return jsonify({'data': resultsList})
    elif (sort == "location"):
        results = sql_query('SELECT Item.itemId, Item.name, Item.location FROM Kram.Item WHERE userId=' + str(user_id) + ' ORDER BY Item.location ASC;')
        resultsList = []
        for i in results:
            resDict = {
            "itemId": i[0],
            "name": i[1],
            "location": i[2]}
            resultsList.append(resDict)
        return jsonify({'data': resultsList})
    else:
        results = sql_query('SELECT Item.itemId, Item.name FROM Kram.Item WHERE userId=' + str(user_id) + ' ORDER BY Item.name ASC;')
        resultsList = []
        for i in results:
            resDict = {
            "itemId": i[0],
            "name": i[1]}
            resultsList.append(resDict)
        return jsonify({'data': resultsList})

@app.route('/item/<int:item_id>', methods=['GET'])
def get_item(item_id=1):
    results = sql_query('SELECT Item.name, Item.quantity, Item.price, Item.location, Item.notes FROM Kram.Item WHERE itemId=' + str(item_id) + ';', False)
    return jsonify(name = results[0], quantity = results[1], price = results[2], location = results[3], notes = results[4])

# add new item

# Update Item

# delete item

# search


@app.route('/signup', methods=['POST'])
def get_signup():
    email = request.get_json(force = True)["email"]
    full_name = request.get_json(force = True)["fullName"]
    password = request.get_json(force = True)["password"]
    sql_execute('INSERT INTO `Kram`.`User` (`email`, `fullName`, `password`) VALUE (\"' + str(email) + '\", \"' + str(full_name) + '\", \"' + str(password) + '\");')
    return jsonify({})


if __name__ == "__main__":
    app.run(debug=True)