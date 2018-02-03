import React from 'react';
import Loader from 'react-loader';

const ResetPasswordModal = (props) => (
  <div className="modal fade" id="resetPasswordModal"
    tabIndex="-1" role="dialog" aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close"
            data-dismiss="modal" aria-label="Close"
            style={{ color: 'orange' }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title" id="modalLabel"
            style={{ color: 'orange' }}
          >Reset Password</h4>
        </div>

        <div className="modal-body">
          <form>
            <fieldset className="form-group">
              <label htmlFor="new_password" className="form-inline">
                New Password
              </label>
              <input type="password" className="form-control"
                name="newPassword"
                onChange={props.onChange}
              />
            </fieldset>

            <fieldset className="form-group">
              {
                props.state.passwordError &&
                <p className="text-danger">
                  {props.state.passwordError}
                </p>
              }
              <label htmlFor="confirm_password" className="form-inline">
                Confirm Password
              </label>
              <input type="password" className="form-control"
                name="confirmPassword"
                onChange={props.onChange}
              />
            </fieldset>

            <div className="modal-footer">
              <Loader loaded={props.state.loaded} />
              <button className="btn btn-secondary auth-button"
                onClick={props.onSubmit}
              >
                Submit
              </button>
              <button type="button"
                className="btn btn-secondary auth-button"
                data-dismiss="modal"
              >
                  Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default ResetPasswordModal;
