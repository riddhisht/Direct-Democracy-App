from flask import Flask, request, jsonify


app = Flask(__name__)

@app.route("/", methods=['GET','POST'])
def send():
    if request.method=='POST':
        a = request.get_json()
        # t = a['password'] + "hello ji hello"
        print("---------------")
        matrix = a['data']

        for i in matrix:
            print(i)
            print("next object")

        print(a['data'][1])
        return jsonify(a['data'][1])


    else: 
        return jsonify({"Hello": 'world', "Namaste":"Duniya", "working": True})



if __name__ == '__main__':
    app.run(debug=True)