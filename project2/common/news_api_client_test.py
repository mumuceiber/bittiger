import news_api_client

def test_baics():
    articles = news_api_client.getNewsFromSource()
    assert(len(articles) > 0)

    articles = news_api_client.getNewsFromSource(sources=['bbc-news'], sortBy='top')
    assert(len(articles) > 0)


if __name__ == "__main__":
    test_baics()
