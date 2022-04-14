from flask import Flask, request, jsonify
from better_profanity import profanity


app = Flask(__name__)

@app.route("/", methods=['GET','POST'])
def send():
    if request.method=='POST':
        a = request.get_json()


        # t = a['password'] + "hello ji hello"
        print("-------------------------------")
        if a['utags']!= []:

            print(a['utags'])
            matrix = a['data']
            print(matrix[0]['hashtags'])
            tags = a['utags']
            weights = []
            print(weights)
            for i in range(len(matrix)):
                weigh = 0
                for j in tags:
                    if j in matrix[i]['hashtags']:
                        weigh+=1
                weights.append(weigh)
            sorted_matrix = []
            for i in range(len(weights)):

                if max(weights)!= -1:
                    t = weights.index(max(weights))
                    sorted_matrix.append(matrix[t])
                    weights[t]=-1
            for i in sorted_matrix:
                print(i['hashtags'])
            print(weights)

            return jsonify(sorted_matrix)

        else:
            return jsonify(None)


        #----------------------RECOMMENDATION--------------------------------------------------------
        #----------------------ALGORITHM---------------------------------------------------------
        
        # matrix = a['data']
        # tags = a['tags']
        # weights = [0*len(matrix)]
        # for i in range(len(matrix)):
        #     weigh = 0
        #     for j in tags:
        #         if j in matrix[i]['tags']:
        #             weigh+=1
        #     weights[i]=weigh
        # sorted_matrix = []
        


        
        #----------------------RECOMMENDATION--------------------------------------------------------
        #----------------------ALGORITHM---------------------------------------------------------
        
        
    #     for i in matrix:
    #         print(i)
    #         print("next object")

    #     print(a['data'][1])
    #     return jsonify(a['data'][1])


    # else: 
    #     return jsonify({"Hello": 'world', "Namaste":"Duniya", "working": True})


# @app.route("/filter", methods=['GET','POST'])
# def __init__():
#     if request.method=='POST':
#         a = request.get_json()
#         # t = a['password'] + "hello ji hello"
#         t = profanity.contains_profanity(a['data'])
#         print(t)
#         if t==True:

#             return jsonify('True')
#         else:
#             return jsonify('False')

            
#     else: 
#         return jsonify({"Hello": 'world', "Namaste":"Duniya", "working": True})




if __name__ == '__main__':
    app.run(debug=True)