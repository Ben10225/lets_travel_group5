from flask import *
from api.db import *
import json
router_page_nav = Blueprint("router_page_nav", __name__, template_folder="templates")

@router_page_nav.route("/api/nav")
def navData():
  data = openJson("activity")
  return data