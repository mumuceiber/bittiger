import React from 'react';
import ReactDom from 'react-dom';
import Auth from '../Auth/Auth';
import { Link } from 'react-router';

class Base extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <nav className="nav-bar indigo lighten-1">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">  Tap News</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {Auth.isUserAuthenticated() ?  (
                <div>
                  <li><Link to="/">{Auth.getEmail()}</Link></li>
                  <li><Link to="/logout">Log out</Link></li>
                </div>
              ) : (
                <div>
                  <li><Link to="/login">Log in</Link></li>
                  <li><Link to="/signUp">Sign up</Link></li>
                </div>
              )}
            </ul>
          </div>
        </nav>
        <br/>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Base;
