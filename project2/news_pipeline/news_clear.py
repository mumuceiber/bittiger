import os, sys

SCRAPE_NEWS_TASK_QUEUE_URL = "amqp://qlwkzzvn:ryxQ2q_qD4lOMeSjhQ1FuelbUQKF-JPS@llama.rmq.cloudamqp.com/qlwkzzvn"
SCRAPE_NEWS_TASK_QUEUE_NAME = "tap-news-scrape-news-task-queue"

#import common packages
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

from cloudAMQP_client import CloudAMQPClient

queue_client = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)


def clear_queue():
    number_of_news = 0

    while True:
        if queue_client is not None:
            msg = queue_client.getMessage()

            if msg is not None:
                number_of_news += 1
            else:
                print "Cleared %d messages" % number_of_news
                return

if __name__ == '__main__':
    clear_queue()
