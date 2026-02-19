import os
import requests
from whoosh import fields
from whoosh.index import create_in, open_dir


def create_index():
    schema = fields.Schema(product=fields.TEXT)

    if not os.path.exists("index"):
        os.mkdir("index")
    idx = create_in("index", schema)
    return idx


def get_index():
    return open_dir("index")


def index_product_names():
    requests.get('http://localhost:8000/store/products/names/')