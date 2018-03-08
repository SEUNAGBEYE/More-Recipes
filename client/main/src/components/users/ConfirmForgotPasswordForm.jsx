import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description - Confirm Forgot Modal
 *
 * @param {Object} props
 *
 * @returns {Jsx} Jsx
 */
const ConfirmForgotPasswordForm = (props) => (
  <div>
    <form className="auth-form" onSubmit={props.onSubmit}>
      <fieldset className="form-group">
        {
          props.state.passwordError &&
          <p className="errors">
            {props.state.passwordError}
          </p>
        }
        <label htmlFor="newPassword" className="form-inline">
          New Password
        </label>
        <input type="password" className="form-control" name="newPassword"
          onChange={props.onChange} required
        />
      </fieldset>

      <fieldset className="form-group">
        <label htmlFor="confirmPassword" className="form-inline">
          Confirm Password
        </label>
        <input type="password" className="form-control"
          name="confirmPassword"
          onChange={props.onChange}
        />
      </fieldset>

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn auth-button">Submit</button>
      </div>
    </form><br/>
  </div>
);

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

ConfirmForgotPasswordForm.propTypes = propTypes;

export default ConfirmForgotPasswordForm;

