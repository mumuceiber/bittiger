import json
import os, sys
from bson.json_util import dumps
from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer

#import utils packages
sys.path.append(os.path.join(os.path.dirname(__file__), 'utils'))

import mongodb_client

SERVER_HOST = "localhost"
SERVER_PORT = 4040

def add(num1, num2):
    print "Add is called with %d and %d" % (num1, num2)
    return num1 + num2

def get_one_news():
    # news = mongodb_client.get_db()['news'].find_one()
    count = mongodb_client.get_db()['news'].count()
    print "get one news: %d" % count
    # return json.load(dumps(news))


RPCServer = SimpleJSONRPCServer((SERVER_HOST, SERVER_PORT))
RPCServer.register_function(add)
RPCServer.register_function(get_one_news)

print "Start RPC server at %s : %d" % (SERVER_HOST, SERVER_PORT)

RPCServer.serve_forever();
