import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ForgotPasswordModal from '../users/ForgotPasswordModal';
/**
 * @description - Renders LoginForm Component
 *
 * @param {Object} props
 *
 * @returns {Jsx} Jsx
 */
const LoginForm = (props) => (
  <div>
    <form className="auth-form" onSubmit={props.onSubmit}>
      <fieldset className="form-group">
        {props.state.errors && <p className="errors">{props.state.errors}</p>}
        <label htmlFor="email" className="form-inline">Email</label>
        <input type="email" className="form-control" id="email"
          name="email"
          onChange={props.onChange}
          required value={props.state.email}
        />
      </fieldset>

      <fieldset className="form-group">
        <label htmlFor="password" className="form-inline">Password</label>
        <input type="password" className="form-control" id="password"
          name="password" onChange={props.onChange} required
        />
      </fieldset>

      <div className="d-flex justify-content-between">
        <button type="submit"
          className="btn btn-default auth-button" id="loginSubmit"
        >
         Login
        </button>
        <Link to="/signup" className="auth-link" id="not-a-member">
          Not a member
        </Link>
        <Link to="#" className="auth-link"
          data-toggle="modal"
          data-target="#forgotPasswordModal"
        >
          Forgot Password
        </Link>
      </div>
    </form><br/>
    <ForgotPasswordModal onChange={props.onChange}
      forgotPassword={props.forgotPassword}
      resetPasswordMessage={props.state.resetPasswordMessage}
    />
  </div>
);

const propTypes = {
  state: PropTypes.object,
  forgotPassword: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

LoginForm.propTypes = propTypes;
export default LoginForm;

