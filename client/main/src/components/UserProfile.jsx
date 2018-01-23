import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth/Auth';

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
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
    return (
      <div>

        <main style={{ marginTop: 130 }}>

          <div className="card" id="profile-card" style={{ marginTop: '11rem' }}>
            <img src={this.props.auth.user.profilePicture} alt="John" className="profile-picture"/>
            <h1>{`${this.props.auth.user.firstName} ${this.props.auth.user.lastName}`}</h1>
            <p className="title">CEO & Founder, Recipe</p>
            <p style={{ color: 'orange' }}>Software Developer</p>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <Link to="#"
                  data-toggle="modal"
                  data-target="#editModal"
                >
                  <i className="fa fa-pencil icons"
                    title="Edit Profile"
                    data-toggle="tooltip" /></Link>

                <Link to="#"
                  data-toggle="modal"
                  data-target="#resetPasswordModal"
                >
                  <i className="fa fa-key icons"
                    title="Reset Password"
                    data-toggle="tooltip" /></Link>
              </div>
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
