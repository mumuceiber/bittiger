from cloudAMQP_client import CloudAMQPClient

CLOUDAMQP_URL = "amqp://qlwkzzvn:ryxQ2q_qD4lOMeSjhQ1FuelbUQKF-JPS@llama.rmq.cloudamqp.com/qlwkzzvn"
TEST_QUEUE_NAME = "test"

def test_basic():
    client = CloudAMQPClient(CLOUDAMQP_URL, TEST_QUEUE_NAME)

    sentMsg = {"test":"test"}
    client.sendMessage(sentMsg)

    receiveMsg = client.getMessage()

    assert sentMsg == receiveMsg
    print "test_baisc pass"

if __name__ == "__main__":
    test_basic()
