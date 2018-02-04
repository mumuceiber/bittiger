import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import LoginPage from './Login/LoginPage';
import SignUpPage from './SignUp/SignUpPage';

ReactDOM.render(
  <SignUpPage />,
  // <LoginPage />,
  // <App />, //content
  document.getElementById('root')// context
)
