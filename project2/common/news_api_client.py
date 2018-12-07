import requests
from json import loads

DEFAULT_SOURCES = [
    'cnn',
    'bbc-news',
    'bbc-sport',
    'bloomberg']
SORT_BY_TOP = 'top'

NEWS_API_KEY = 'ab8ea861ad5b411e9df359010ad40b98'
NEWS_API_ENDPOINT = 'https://newsapi.org/v1/'
ARTICLES_API = 'articles'

def _buildURL(endPoint=NEWS_API_ENDPOINT, apiName=ARTICLES_API):
    return endPoint + apiName

def getNewsFromSource(sources=DEFAULT_SOURCES, sortBy=SORT_BY_TOP):
    articles = []

    for source in sources:
        payload = { 'apiKey': NEWS_API_KEY,
                    'source': source,
                    'sortBy': sortBy }
        response = requests.get(_buildURL(), params=payload)
        res_json = loads(response.content.decode('utf-8'));

        # Extract news from response
        if ( res_json is not None  and
             res_json['status'] == 'ok' and
             res_json['source'] is not None ):
             # Populate source in each articles
             for news in res_json['articles']:
                 news['source'] = res_json['source']
             articles.extend(res_json['articles'])
             print articles
    return articles
