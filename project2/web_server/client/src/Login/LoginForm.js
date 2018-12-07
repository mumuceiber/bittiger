import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import './LoginForm.css';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div className='container'>
    <div className='card-panel login-panel'>
    <form className="col s12" action="/" onSubmit={onSubmit}>
      <h4 className="center-align">Login</h4>
      {errors.summary && <div className="row"><p className="error-message">{errors.summary}</p></div>}
      <div className="row">
        <div className="input-field col s12">
          <input id="email" type="email" className="validate" name="email" onChange={onChange} />
          <label htmlFor="email">Email</label>
        </div>
      </div>
      {errors.email && <div className="row"><p className="error-message">{errors.email}</p></div>}
      <div className="row">
        <div className="input-field col s12">
          <input id="password" type="password" className="validate" name="password" onChange={onChange} />
          <label htmlFor="password">Password</label>
        </div>
      </div>
      {errors.password && <div className="row"><p className="error-message">{errors.password}</p></div>}
      <div className="row right-align">
        <input type="submit" className="waves-effect waves-light btn indigo lighten-1" value="Log in" />
      </div>
      <div className="row">
        <p className="right-align"> New to Tap News? <Link to="/signup">Log in</Link></p>
      </div>
      </form>
    </div>
  </div>
)


//规定当有人调用loginform的时候，必须提供一下四个参数，少一个都不行
//在compile时，做静态检查的时候就能帮我们检查调用loginform的地方是不是把这四个参数都提供了
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
