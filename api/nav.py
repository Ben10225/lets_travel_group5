from flask import *
from api.db import *
import json
from random import sample
router_page_nav = Blueprint("router_page_nav", __name__, template_folder="templates")

@router_page_nav.route("/api/nav")
def navData():
  data= openJson("activity")
  data_list=[]
  for i in range(0,len(data)):
    activityName=data[i]["ActivityName"]
    city=data[i]["City"]
    result=city+":"+activityName
    data_list.append(result)	
  random_data=sample(data_list, 30)
  print(random_data)
  
  # with open('data/activity.json', 'r') as f:
  #     data = json.load(f)
  return random_data
