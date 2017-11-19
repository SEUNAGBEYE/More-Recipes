import React from 'react';
import {Link} from 'react-router-dom';

const LoginForm = () => {
  return (
    <div>
      <form action="" className="auth-form">
        <fieldset className="form-group">
          <label htmlFor="email" className="form-inline">Email</label>
          <input type="email" className="form-control" id="email" name="email" />
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="password" className="form-inline">Password</label>
          <input type="password" className="form-control" id="password" name="password" />
        </fieldset>

        <label className="custom-control custom-checkbox" style={{float: 'left'}}>
          <input type="checkbox" className="custom-control-input" id="checked" />
          <span className="custom-control-indicator"></span>
          <span className="custom-control-description">Remember Me</span>
        </label>
        <br /><br />
        
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-default" id="login">Login</button>
          <Link to='/signup' style={{paddingTop: 10}}>Not a member</Link>	
        </div>
      </form><br/>
    </div>
  )
}

export default LoginForm;