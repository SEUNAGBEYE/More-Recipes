import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ForgotPasswordModal from '../users/ForgotPasswordModal';

/**
 * @description - Renders SignUpForm
 *
 * @param {Object} props
 *
 * @returns {Jsx} Jsx
 */
const SignUpForm = (props) => (
  <div>
    <form className="auth-form" id="signFormContainer">
      <fieldset className="form-group">
        <label htmlFor="firstName" className="form-inline">First Name</label>
        <input type="text" className="form-control" id="firstName"
          name="firstName"
          onChange={props.onChange}
          required
          defaultValue={props.state.firstName}/>
      </fieldset>

      <fieldset className="form-group">
        <label htmlFor="lastName" className="form-inline">Last Name</label>
        <input type="text" className="form-control"
          id="lastName" name="lastName"
          onChange={props.onChange}
          required
          defaultValue={props.state.lastName}/>
      </fieldset>

      <fieldset className="form-group">
        <label htmlFor="email" className="form-inline">Email</label>
        <input type="email" className="form-control"
          id="email"
          name="email"
          onChange={props.onChange}
          required
          defaultValue={props.state.email}/>
      </fieldset>

      <fieldset className="form-group">
        {props.state.passwordError &&
          <p className="errors">
            {
              props.state.passwordError
            }
          </p>
        }
        <label htmlFor="newPassword" className="form-inline">Password</label>
        <input type="password" className="form-control"
          name="newPassword"
          id="newPassword"
          onChange={props.onChange}
          required
          defaultValue={props.state.newPassword}/>
      </fieldset>

      <fieldset className="form-group">
        <label htmlFor="confirmPassword" className="form-inline">
          Confirm Password
        </label>
        <input type="password" className="form-control"
          name="confirmPassword"
          id="confirmPassword"
          onChange={props.onChange}
          required
          defaultValue={props.state.confirmPassword}/>
      </fieldset>
      {props.state.errors &&
        <div className="errors">
          <ul>
            {
              props.state.errors
                .map((error, index) => (<li key={index}>{error.message}</li>))
            }
          </ul>
        </div>
      }
      <div className="d-flex justify-content-between">
        <button type="submit"
          className="btn btn-default auth-button"
          id="signUpSubmit"
          onClick={props.onSubmit}
        >Signup</button>
        <Link to="/login" className="auth-link">Already a member</Link>
        <Link to="#" className="auth-link" data-toggle="modal"
          data-target="#forgotPasswordModal"
        >
        Forgot Password
        </Link>
      </div>
    </form><br />
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

SignUpForm.propTypes = propTypes;

export default SignUpForm;
