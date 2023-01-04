import random

def get_random_index(list):
  n1 = random.randint(0, len(list)-1)
  while True:
    n2 = random.randint(0, len(list)-1)
    if n1 != n2:
      break
  index_lst = [n1, n2]
  index_lst.sort()
  return  index_lst