from flask import Flask, send_file, request
from get_query_urls import get_query_urls
import sys



app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def open_file_print():
    return send_file("index.html")


@app.route("/info", methods=['GET', 'POST'])
def get_urls():
    number = request.json['number']
    animalClass = request.json['animalClass']

    print(number, animalClass)
    return get_query_urls(number, animalClass)
    
