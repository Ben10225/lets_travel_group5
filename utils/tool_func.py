import random
from random import choice
from api.db import *

def get_random_index(list):
  n1 = random.randint(0, len(list)-1)
  while True:
    n2 = random.randint(0, len(list)-1)
    if n1 != n2:
      break
  index_lst = [n1, n2]
  index_lst.sort()
  return  index_lst

def get_district_data(district_list):
  city1 = choice(district_list)
  data1 = get_img_city(city1)

  district_list.remove(city1)

  city2 = choice(district_list)
  data2 = get_img_city(city2)

  return data1, data2

def get_img_city(cityname):
  while True:
    data = choice(openJson(cityname))
    if bool(data["Picture"]):
      break
  return data