import React from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswordModal from '../users/ForgotPasswordModal';

const LoginForm = (props) => (
  <div>
    <form className="auth-form" onSubmit={props.onSubmit}>
      <fieldset className="form-group">
        {props.state.errors && <p className="errors">{props.state.errors}</p>}
        <label htmlFor="email" className="form-inline">Email</label>
        <input type="email" className="form-control" id="email" name="email" onChange={props.onChange} required value={props.state.email}/>
      </fieldset>

      <fieldset className="form-group">
        <label htmlFor="password" className="form-inline">Password</label>
        <input type="password" className="form-control" id="password" name="password" onChange={props.onChange} required value={props.state.password}/>
      </fieldset>

      <label className="custom-control custom-checkbox" style={{ float: 'left' }}>
        <input type="checkbox" className="custom-control-input" id="checked" />
        <span className="custom-control-indicator" />
        <span className="custom-control-description">Remember Me</span>
      </label>
      <br /><br />

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-default" id="login">Login</button>
        <Link to="/signup" style={{ paddingTop: 10 }}>Not a member</Link>
        <Link to="#" style={{ paddingTop: 10 }} data-toggle="modal" data-target="#forgotPasswordModal">Forgot Password</Link>
      </div>
    </form><br/>
    <ForgotPasswordModal onChange={props.onChange}
      forgotPassword={props.forgotPassword}
      resetPasswordMessage={props.state.resetPasswordMessage}
    />
  </div>
);

export default LoginForm;

