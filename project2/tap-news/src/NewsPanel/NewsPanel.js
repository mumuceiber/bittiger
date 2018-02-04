import React from 'react'
import './NewsPanel.css';
import NewsCard from '../NewsCard/NewsCard';

class NewsPanel extends React.Component {
  constructor() {
    super();
    this.state = { news:null }; // news:list of jason
  }

  // react 本身生命周期里的一个函数
  // 让render函数结束运行完成之后再运行componentDidMount
  componentDidMount(){
    this.loadMoreNews();
  }

  loadMoreNews() {
    this.setState({
      news: [
        {
          'url':'http://google.com',
          'title': "Inside andrew puzder's failed nomination",
          'description':"agaj;egjaigawo",
          'source':'cnn',
          'urlToImage':'',
          'digest':"gageiagg", // this is a hash for this news
          'reason':'Recommend'
        }]
    });
  }

  renderNews(){
    const news_list = this.state.news.map( news => { //把state里的list of news通过mapping函数
      //遍历一个一个的news
      return (
        // react里如果用list的话，要用一个key放react能够找到list里面变化的item
        // 从而让react只在virtual dom里面只更新变化的元素，而不是更新整个list
        <a className='list-group-item' key={news.digest} href="#">
          <NewsCard news={news} />
        </a>
      );
    });

    return (
      <div className="container-fluid">
        <div className="list-group">
          {news_list}
        </div>
      </div>
    )
  }

  render() {
    if (this.state.news) {
      return(
        <div>
          {this.renderNews()}
        </div>
      )
    } else {
      return(
        <div>
          Loading...
        </div>
      );
    }
  }
}

export default NewsPanel;
