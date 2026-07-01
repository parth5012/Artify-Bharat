import os
import sys

parent_dir = sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from utils.search import index_product_names,search_product



index_product_names('')
search_product('')