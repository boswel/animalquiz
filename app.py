from flask import Flask, send_file, request
from get_query_urls import get_query_urls


app = Flask(__name__)


@app.get("/")
def open_file_print():
    return send_file("index.html")


@app.get("/info")
def get_urls():
    number = int(request.args.get("number"))
    return get_query_urls(number)
    
