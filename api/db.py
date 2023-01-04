from flask import *

def openJson(district):

  with open(f"./data/{district}.json", "r", encoding="utf-8") as f:
    data = json.load(f)

  return data

  