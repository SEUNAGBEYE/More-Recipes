import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, updateProfile } from '../../actions/auth/Auth';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';
import imageUpload from '../../../utils/ImageUploader';
import UpdateProfileModal from './UpdateProfileModal';
import ResetPasswordModal from './ResetPasswordModal';
import UserValidator from '../../validators/UserValidator';

/**
 * @class UserProfile
 * @extends {Component}
 */
class UserProfile extends Component {
  /**
   * Creates an instance of UserProfile.
   * @param {any} props
   *
   * @returns {void} void
   * @memberof UserProfile
   */
  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   *
   *
   * @param {obj} event
   * @returns {void}
   * @memberof UserProfile
   */
  async onSubmit(event) {
    event.preventDefault();
    this.setState({ loaded: false });
    const file = document.getElementById('profilePicture').files[0];
    if (file) {
      try {
        const image = await imageUpload(file);
        this.setState({ profilePicture: image.data.secure_url }, () => {
          setAuthorizationToken(localStorage.token);
          this.props.updateProfile(this.state)
            .then(res => {
              this.setState({ loaded: true });
              $('.modal').modal('hide');
              document.getElementById('form').reset();
            })
            .catch(error => {
              this.setState({
                errors: error.response.data.errors,
                loaded: true
              });
            });
        });
      } catch (error) {
        this.setState({ loaded: true });
      }
    } else {
      this.props.updateProfile(this.state)
        .then(res => {
          this.setState({ loaded: true });
          $('.modal').modal('hide');
          document.getElementById('form').reset();
        });
      document.getElementById('form').reset();
    }
  }


  /**
   *
   *
   * @param {obj} event
   * @returns {void}
   * @memberof UserProfile
   */
  onChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
    const self = this;
    UserValidator.passwordValidator(event, self);
  }
  /**
   * @returns {jsx} jsx
   * @memberof UserProfile
   */
  render() {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
    const {
      firstName,
      lastName,
      profilePicture,
      aboutMe
    } = this.props.auth.user;
    return (
      <div>

        <main style={{ marginTop: 130 }}>

          <div className="card" id="profile-card"
            style={{ marginTop: '11rem' }}
          >
            <img src={profilePicture} alt="John"
              className="profile-picture"
            />
            <h1 style={{ margin: '1rem' }}>
              {`${firstName} ${lastName}`}
            </h1>
            { aboutMe &&
              <div>
                About me

              </div>
            }
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
                    title="Change Password"
                    data-toggle="tooltip" /></Link>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <Link to="#" target="_blank" className="fa fa-twitter icons" />
                <Link to="#" target="_blank" className="fa fa-linkedin icons" />
                <Link to="#" target="_blank" className="fa fa-facebook icons" />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12"
                style={{ marginTop: 20 }}
              >
                <button id="profile-button">Contact</button>
              </div>
            </div>
          </div>

          <UpdateProfileModal
            user={this.props.auth.user}
            onChange={this.onChange}
            state={this.state}
            onSubmit={this.onSubmit}
          />
          <ResetPasswordModal
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            state={this.state}
          />
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

export default connect(mapStateToProps, { logout, updateProfile })(UserProfile);
