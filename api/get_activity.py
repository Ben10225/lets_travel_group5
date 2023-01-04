from flask import *
from api.db import *
from utils.tool_func import *

router_page_activity = Blueprint("router_page_activity", __name__, template_folder="templates")

north_district = ["keelung", "taipei", "newTaipei", "taoyuan"]
west_district = ["miaoliCounty", "taichung", "changhuaCounty", "yunlinCounty", "nantouCounty"]
south_district = ["chiayi", "chiayiCounty", "tainan", "kaohsiung", "pingtungCounty"]
east_district = ["yilanCounty", "hualienCounty", "taitungCounty"]


@router_page_activity.route("/api/home/activities")
def home_activities():
  nor_index = get_random_index(north_district)
  west_index = get_random_index(west_district)
  sou_index = get_random_index(south_district)
  east_index = get_random_index(east_district)

  data_n1 = openJson(north_district[nor_index[0]])
  data_n2 = openJson(north_district[nor_index[1]])

  data_w1 = openJson(west_district[west_index[0]])
  data_w2 = openJson(west_district[west_index[1]])

  data_s1 = openJson(south_district[sou_index[0]])
  data_s2 = openJson(south_district[sou_index[1]])

  data_e1 = openJson(east_district[east_index[0]])
  data_e2 = openJson(east_district[east_index[1]])

  result = [
    data_n1[random.randint(0, len(data_n1)-1)],
    data_n2[random.randint(0, len(data_n2)-1)],
    data_w1[random.randint(0, len(data_w1)-1)],
    data_w2[random.randint(0, len(data_w2)-1)],
    data_s1[random.randint(0, len(data_s1)-1)],
    data_s2[random.randint(0, len(data_s2)-1)],
    data_e1[random.randint(0, len(data_e1)-1)],
    data_e2[random.randint(0, len(data_e2)-1)],
  ]

  return {"data": result}, 200



@router_page_activity.route("/api/intro/activities", methods=["post"])
def intro_activities():
  city = request.json['city']
  id = request.json['id']

  district_data = openJson(city)
  
  for activity in district_data:
    if id == activity["ActivityID"]:
      result = activity
  
  if not result:
    return {"error": True}, 200

  return {"data": result}, 200


@router_page_activity.route("/api/activities/<county>")
def activities(county):
  data = openJson(county)
  return {"data": data}, 200