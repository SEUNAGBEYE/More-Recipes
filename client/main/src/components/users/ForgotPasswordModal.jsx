import React from 'react';

const forgotPasswordModal = (props) => (
  <div className="modal fade" id="forgotPasswordModal"
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
          >Forgot Password</h4>
        </div>

        <div className="modal-body">
          { props.resetPasswordMessage &&
          <p className="alert-success">
            { props.resetPasswordMessage }</p>
          }
          <form>
            <fieldset className="form-group">
              <label htmlFor="confirm_password" className="form-inline">
                Email
              </label>
              <input type="email" className="form-control"
                name="email"
                required
                onChange={props.onChange}
              />
            </fieldset>

            <div className="modal-footer">
              { !props.resetPasswordMessage &&
                <button className="btn btn-secondary auth-button"
                  onClick={props.forgotPassword}
                >
                Submit
                </button>
              }
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

export default forgotPasswordModal;
