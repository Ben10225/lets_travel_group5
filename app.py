from flask import *
from api.get_activity import *
from api.nav import *

app=Flask(__name__)

app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.config["JSON_SORT_KEYS"]=False #可避免json自動排序


app.register_blueprint(router_page_activity)
app.register_blueprint(router_page_nav)


@app.route("/")
def index():
	return render_template("index.html")

@app.route("/activity")
def activity():
	return render_template("intro.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=True)