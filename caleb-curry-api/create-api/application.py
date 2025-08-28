from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello World!'

@app.route('/drinks')
def get_drinks():
    return {"drinks": "drinks data", "food": "food data"}