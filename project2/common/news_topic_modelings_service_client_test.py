import news_topic_modelings_service_client as client

def test_basic():
    newsTitle = "Pentagon might propose groupd troops for Syria"
    topic = client.classify(newsTitle)
    assert topic == "U.S."
    print ("test_basic passed!")

if __name__ == "__main__":
    test_basic()
