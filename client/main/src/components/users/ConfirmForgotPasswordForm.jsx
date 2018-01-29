import React from 'react';

const ConfirmForgotPasswordForm = (props) => (
  <div>
    <form className="auth-form" onSubmit={props.onSubmit}>
      <fieldset className="form-group">
        {props.state.passwordError && <p className="errors">{props.state.passwordError}</p>}
        <label htmlFor="newPassword" className="form-inline">New Password</label>
        <input type="password" className="form-control" name="newPassword" onChange={props.onChange} required/>
      </fieldset>

      <fieldset className="form-group">
        <label htmlFor="confirmPassword" className="form-inline">Confirm Password</label>
        <input type="password" className="form-control" name="confirmPassword" onChange={props.onChange} />
      </fieldset>

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn auth-button">Submit</button>
      </div>
    </form><br/>
  </div>
);

export default ConfirmForgotPasswordForm;

