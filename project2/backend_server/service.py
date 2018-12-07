import json
import os, sys
import pickle
import redis
from bson.json_util import dumps
from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer

#import common packages
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

import mongodb_client
from cloudAMQP_client import CloudAMQPClient
import news_recommendation_service_client

REDIS_HOST = 'localhost'
REDIS_PORT = 6379
redis_client = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT)

SERVER_HOST = "localhost"
SERVER_PORT = 4040

NEWS_TABLE_NAME = "news-test"
NEWS_LIMIT = 200
NEWS_TIME_OUT_IN_SECONDS = 60
NEWS_LIST_PAGE_SIZE = 10

NEWS_TASK_QUEUE_URL = "amqp://tibffleu:PRGvnjGl6hHY4G-Ewd5VckQnPFbtTIYk@termite.rmq.cloudamqp.com/tibffleu"
NEWS_TASK_QUEUE_NAME = "tap-news-log-clicks-task-queue"

cloudAMQP_client = CloudAMQPClient(NEWS_TASK_QUEUE_URL, NEWS_TASK_QUEUE_NAME)

def add(num1, num2):
    print "Add is called with %d and %d" % (num1, num2)
    return num1 + num2

def get_one_news():
    # news = mongodb_client.get_db()['news'].find_one()
    count = mongodb_client.get_db()[NEWS_TABLE_NAME].count()
    print "get one news: %d" % count
    # return json.load(dumps(news))

def get_news_summaries_for_user(user_id, page_num):
    page_num = int(page_num)
    begin_index = (page_num - 1) * NEWS_LIST_PAGE_SIZE
    end_index = page_num * NEWS_LIST_PAGE_SIZE

    sliced_news = []

    if redis_client.get(user_id) is not None:
        total_news_digest = pickle.loads(redis_client.get(user_id))
        sliced_news_digest = total_news_digest[begin_index: end_index]
        db = mongodb_client.get_db()
        sliced_news = list(db[NEWS_TABLE_NAME].find({'digest': {'$in':sliced_news_digest}}))

    else:
        db = mongodb_client.get_db()
        total_news = list(db[NEWS_TABLE_NAME].find().sort([('publishedAt', -1)]).limit(NEWS_LIMIT))
        total_news_digest = [news['digest'] for news in total_news]
        redis_client.set(user_id, pickle.dumps(total_news_digest));
        redis_client.expire(user_id, NEWS_TIME_OUT_IN_SECONDS)
        sliced_news = total_news[begin_index: end_index]

    # Get preference for the user
    # preference = news_recommendation_service_client.getPreferenceForUser(user_id)
    # topPreference = None
    #
    # if preference is not None and len(preference) > 0:
    #     topPreference = preference[0]
    #
    # for news in sliced_news:
    #     if news['class'] == topPreference:
    #         news['reason'] = 'Recommend'

    return json.loads(dumps(sliced_news))


def log_news_click_for_user(user_id, news_id):
    message = {"userId": user_id, "newsId": news_id, 'timestamp': str(datetime.utcnow())}
    cloudAMQP_client.sendMessage(message)



RPCServer = SimpleJSONRPCServer((SERVER_HOST, SERVER_PORT))
RPCServer.register_function(add, 'add')
RPCServer.register_function(get_one_news, 'getOneNews')
RPCServer.register_function(get_news_summaries_for_user, 'getNewsSummariesForUser')
RPCServer.register_function(log_news_click_for_user, 'logNewsClickForUser')

print "Start RPC server at %s : %d" % (SERVER_HOST, SERVER_PORT)

RPCServer.serve_forever();
