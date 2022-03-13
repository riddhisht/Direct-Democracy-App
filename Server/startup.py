from flask import Flask, request, jsonify


app = Flask(__name__)

@app.route("/", methods=['GET','POST'])
def send():
    if request.method=='POST':
        a = request.get_json()
        t = a['password'] + "hello ji hello"
        return jsonify(t)
        # return "dataaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    return jsonify({"Hello": 'world', "Namaste":"Duniya", "working": True})

    # if request.method == 'POST':
    #     userId = request.get('userId')
        
    #     page = request.get('page')
    #     return "Hello World!"+page+userId
    # return "hw-"


if __name__ == '__main__':
    app.run(debug=True)