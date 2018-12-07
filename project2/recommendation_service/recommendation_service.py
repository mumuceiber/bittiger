import os
# import jsonrpclib
import sys

# import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
import mongodb_client

PREFERENCE_MODEL_TABLE_NAME = 'user_preference_model'

SERVER_HOST = 'localhost'
SERVER_PORT = 5050

def isclose(a, b, rel_tol=1e-09, abs_tol=0.0):
    return abs(a-b) <= max(rel_tol * max(abs(a), abs(b), abs_tol))


""" Get user's preference in an ordered class list """
def getPreferenceForUser(self, user_id):
    db = mongodb_client.get_db()
    model = db[PREFERENCE_MODEL_TABLE_NAME].find_one({'userId': user_id})
    if model is None:
        return []

    sorted_tuples = sorted(model['preference'].items(), key=operator.itemgetter(1), reverse=True)
    sorted_list = [news[0] for news in sorted_tuples]
    sorted_value = [news[1] for news in sorted_tuples]

    # If the first preference is same as the last one,
    # the preference makes no sense
    if isclose(float(sorted_value[0]), float(sorted_value[-1])):
        return []

    return sorted_list


# THreading HTTP Server`
# http_server = pyjsonrpc.ThreadingHttpServer(
#     server_address = (SERVER_HOST, SERVER_PORT),
#     RequestHandlerClass = RequestHandler
# )
