import os
import requests
from whoosh import fields
from whoosh.index import create_in, open_dir


def create_index():
    schema = fields.Schema(product=fields.TEXT)

    if not os.path.exists("index"):
        os.mkdir("index")
    idx = create_in("index", schema)
    print('index created!')
    return idx


def get_index():
    return open_dir("index")


def index_product_names(token):
    try:
        response = requests.get("http://localhost:8002/store/products/names/",headers={
            'Authorization': f'Bearer {token}'
        })
        if response.status_code == 200:
            data = response.json()
            print(data)
            # return data
    except Exception as e:
        print("Couldn't connect to django server!! \n Error:", e)
        return 
    for product in data:
        index = get_index()
        writer = index.writer()
        writer.add_document(product=product)
        writer.commit()
    print('Added Products to Search Index')
    return data
    

def search_product(query):
    index = get_index()
    with index.searcher() as searcher:
        results = searcher.find("product", query)
        return [result['product'] for result in results]