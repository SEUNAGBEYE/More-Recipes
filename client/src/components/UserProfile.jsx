import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth/LoginRequest';

/**
 * @class UserProfile
 * @extends {Component}
 */
class UserProfile extends Component {
  /**
   * @returns {jsx} jsx
   * @memberof UserProfile
   */
  render() {
    return (
      <div>

        <main style={{ marginTop: 130 }}>

          <button className="btn btn-default" id="edit-profile" data-toggle="modal" data-target="#editModal">Edit Profile</button>

          <button className="btn btn-default" id="edit-profile" data-toggle="modal" data-target="#resetPasswordModal" style={{ float: 'right' }}>Reset Password</button>


          <div className="card" id="profile-card">
            <img src={this.props.auth.user.profilePicture} alt="John" className="profile-picture"/>
            <h1>{`${this.props.auth.user.firstName} ${this.props.auth.user.lastName}`}</h1>
            <p className="title">CEO & Founder, Recipe</p>
            <p style={{ color: 'orange' }}>Software Developer</p>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <Link to="#" target="_blank" className="fa fa-dribbble icons" />
                <Link to="#" target="_blank" className="fa fa-twitter icons" />
                <Link to="#" target="_blank" className="fa fa-linkedin icons" />
                <Link to="#" target="_blank" className="fa fa-facebook icons" />
                <Link to={`mailto:${this.props.auth.user.email}`} target="_blank" className="fa fa-envelope icons" />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12" style={{ marginTop: 20 }}>
                <button id="profile-button">Contact</button>
              </div>
            </div>
          </div>


          <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ color: 'orange' }}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 className="modal-title" id="modalLabel" style={{ color: 'orange' }}>Profile</h4>
                </div>

                <div className="modal-body">
                  <form id="form">
                    <fieldset className="form-group">
                      <label htmlFor="first_name" className="form-inline">First Name</label>
                      <input type="text" className="form-control" id="first_name" name="first_name" />
                    </fieldset>

                    <fieldset className="form-group">
                      <label htmlFor="first_name" className="form-inline">Last Name</label>
                      <input type="text" className="form-control" id="first_name" name="first_name" />
                    </fieldset>

                    <fieldset className="form-group">
                      <label htmlFor="first_name" className="form-inline">Facebook Url</label>
                      <input type="text" className="form-control" id="first_name" name="first_name" />
                    </fieldset>

                    <fieldset className="form-group">
                      <label htmlFor="first_name" className="form-inline">Twitter User</label>
                      <input type="text" className="form-control" id="first_name" name="first_name" />
                    </fieldset>

                    <fieldset className="form-group">
                      <label htmlFor="first_name" className="form-inline">LinkedIn Url</label>
                      <input type="text" className="form-control" id="first_name" name="first_name" />
                    </fieldset>


                    <fieldset className="form-group">
                      <label htmlFor="last_name" className="form-inline">Picture</label>
                      <input type="file" className="form-control" id="last_name" name="last_name" />
                    </fieldset>

                    <div className="modal-footer">
                      <button className="btn btn-secondary auth-button" data-dismiss = "modal">Submit</button>
                      <button type="button" className="btn btn-secondary auth-button" data-dismiss="modal">
                          Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="resetPasswordModal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ color: 'orange' }}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 className="modal-title" id="modalLabel" style={{ color: 'orange' }}>Reset Password</h4>
                </div>

                <div className="modal-body">
                  <form action="" id="form">
                    <fieldset className="form-group">
                      <label htmlFor="new_password" className="form-inline">New Password</label>
                      <input type="password" className="form-control" id="new_password" name="new_password" />
                    </fieldset>

                    <fieldset className="form-group">
                      <label htmlFor="confirm_password" className="form-inline">Confirm Password</label>
                      <input type="password" className="form-control" id="confirm_password" name="confirm_password" />
                    </fieldset>

                    <div className="modal-footer">
                      <button className="btn btn-secondary auth-button" data-dismiss = "modal">Submit</button>
                      <button type="button" className="btn btn-secondary auth-button" data-dismiss="modal">
                          Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

/**
 * mapStateToProps
 * @param {any} state
 * @returns {object} object
 */
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(UserProfile);
