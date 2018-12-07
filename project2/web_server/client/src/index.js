import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';

import { browserHistory, Router } from 'react-router';
import routes from './routes';

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  // <LoginPage />,
  // <App />, //content
  document.getElementById('root')// context
)
