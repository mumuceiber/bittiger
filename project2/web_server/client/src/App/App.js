import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

import React from 'react';
import './App.css';
import logo from './logo.png';
import NewsPanel from '../NewsPanel/NewsPanel';

//一个component里面的html必须包括在一个div里面
class App extends React.Component {
  render() {
    return(
      <div>
        <img className='logo' src={logo} alt='logo' />
        <div className='container'>
          <NewsPanel />
        </div>
      </div>
    )
  }
}

export default App;
