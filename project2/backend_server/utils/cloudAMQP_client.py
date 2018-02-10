import pika
import json, os


class CloudAMQPClient:
    def __init__(self, cloud_amqp_url, queue_name):
        self.cloud_amqp_url = cloud_amqp_url
        self.queue_name = queue_name
        self.params = pika.URLParameters(cloud_amqp_url)
        self.params.socket_timeout = 3
        self.connection = pika.BlockingConnection(self.params)
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=queue_name)

    # send a message
    def sendMessage(self, message):
        self.channel.basic_publish(exchange='', routing_key=self.queue_name, body=json.dumps(message))
        print "[X] Send message %s to %s" % (message, self.queue_name)

    def callback(ch, method, properties, body):
        print "[X] received %r" % (body)

    # get a sendMessage
    def getMessage(self):
        method_frame, header_frame, body = self.channel.basic_get(queue=self.queue_name, no_ack=False)
        if method_frame:
            print "[X] Received message from %s : %s" % (self.queue_name, body)
            self.channel.basic_ack(method_frame.delivery_tag)
            return json.loads(body)
        else:
            print "[X] No message returned."
            return None

    # BlockingConnection.sleep is safe way to sleep than time.sleep().
    # This will respond to server's heartbeat
    def sleep(self, seconds):
        self.connection.sleep(seconds);
