from flask import *
from api.db import *
from utils.tool_func import *

router_page_activity = Blueprint("router_page_activity", __name__, template_folder="templates")


@router_page_activity.route("/api/home/activities")
def home_activities():

  north_district = ["keelung", "taipei", "newTaipei", "taoyuan"]
  west_district = ["miaoliCounty", "taichung", "changhuaCounty", "yunlinCounty", "nantouCounty"]
  south_district = ["chiayi", "chiayiCounty", "tainan", "kaohsiung", "pingtungCounty"]
  east_district = ["yilanCounty", "hualienCounty", "taitungCounty"]

  data_n1, data_n2 = get_district_data(north_district)
  data_w1, data_w2 = get_district_data(west_district)
  data_s1, data_s2 = get_district_data(south_district)
  data_e1, data_e2 = get_district_data(east_district)

  result = [
    data_n1, data_n2, data_w1, data_w2, data_s1, data_s2, data_e1, data_e2
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


@router_page_activity.route("/api/activities/<county>", methods=["post"])
def activities(county):
  page = request.json['page']

  if county == "chiayi":
    data = openJson("chiayi") + openJson("chiayiCounty")
  else:
    data = openJson(county)

  if page == 0:
    if len(data) > 9:
      page += 1
      result = data[:9]
    else:
      page = None
      result = data
  
  elif page > 0:
    if len(data[page*9:]) > 9:
      data = data[page*9:page*9+9]
      page += 1
      result = data[:9]
    else:
      page = -1
      result = data[page*9:]

  return {"data": result, "page": page, "city": county}, 200