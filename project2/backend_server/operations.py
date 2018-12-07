import service

def test_getNewsSummariesForUser_basic():
    news_list = service.get_news_summaries_for_user('user123',1)
    assert len(news_list) > 0
    print "test_getNewsSummariesForUser_basic pass"

def test_getNewsSummariesForUser_page():
    news_page_1 = service.get_news_summaries_for_user('user123',1)
    news_page_2 = service.get_news_summaries_for_user('user123',2)

    assert len(news_page_1) > 0
    assert len(news_page_2) > 0

    page_1_set = set([news['digest'] for news in news_page_1])
    page_2_set = set([news['digest'] for news in news_page_2])

    assert len(page_1_set.intersection(news_page_2)) == 0

    print "test_getNewsSummariesForUser_page pass"


if __name__ == '__main__':
    test_getNewsSummariesForUser_basic()
    test_getNewsSummariesForUser_page()
