from flask import Flask, send_file, request
from getimages import get_animal_info


app = Flask(__name__)


@app.get("/")
def open_file_print():
    return send_file("index.html")


@app.get("/info")
def get_animal_info_dicts():
    number = int(request.args.get("number"))
    info = []
    for x in range(number):
        info.append(get_animal_info())
    return info
