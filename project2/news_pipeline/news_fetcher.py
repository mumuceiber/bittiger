import os, sys
from newspaper import Article

SCRAPE_NEWS_TASK_QUEUE_URL = "amqp://qlwkzzvn:ryxQ2q_qD4lOMeSjhQ1FuelbUQKF-JPS@llama.rmq.cloudamqp.com/qlwkzzvn"
SCRAPE_NEWS_TASK_QUEUE_NAME = "tap-news-scrape-news-task-queue"
DEDUPE_NEWS_TASK_QUEUE_URL = "amqp://erdpqwwu:2IB4o6UO4rJCPzYSzlcvkGtpmqAi_zet@llama.rmq.cloudamqp.com/erdpqwwu"
DEDUPE_NEWS_TASK_QUEUE_NAME = "tap-news-dedupe-news-task-queue"

SLEEP_TIME_IN_SECONDS = 5

#import common packages
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

from cloudAMQP_client import CloudAMQPClient

scrape_queue_client = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)
dedupe_queue_client = CloudAMQPClient(DEDUPE_NEWS_TASK_QUEUE_URL, DEDUPE_NEWS_TASK_QUEUE_NAME)

def handle_message(msg):
    if msg is None or not isinstance(msg, dict):
        print "message is broken"
        return
    task = msg

    article = Article(task['url'])
    article.download()
    article.parse()

    task['text'] = article.text
    dedupe_queue_client.sendMessage(task)

while True:
    if scrape_queue_client is not None:
        msg = scrape_queue_client.getMessage()

        if msg is not None:
            # Parse and process the task
            try:
                handle_message(msg)
            except Exception as e:
                print e
                pass
        scrape_queue_client.sleep(SLEEP_TIME_IN_SECONDS)
