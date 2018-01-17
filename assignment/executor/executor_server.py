import json
from flask import Flask
# __name__is a python buildin variable
# it is the current python file name
app = Flask(__name__)
# convert a object in python into json for js
from flask import jsonify
from flask import request
import executor_utils as eu


# define the route path this method will accept
@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/build_and_run_results', methods=['POST'])
def build_and_run_results():
    data = request.get_json()
    print data
    print 'hahah'
    if 'code' not in data or 'lang' not in data:
        return 'You should provide codes and lang'
    code = data['code']
    lang = data['lang']
    print "API get called with code: %s in %s" %(code, lang)
    result = eu.build_and_run_results(code, lang)
    return jsonify(result)


# check if this file is not imported in and run in other files
# true if the the file is executed inside itself
if __name__ == '__main__':
    # set debug to true to make flask works like nodemon
    # update when file changes
    eu.load_image() #load image when server start
    app.run(debug=True)
