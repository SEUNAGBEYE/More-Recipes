import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, updateProfile } from '../../actions/auth/Auth';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';
import imageUpload from '../../../utils/imageUploader';
import UpdateProfileModal from './UpdateProfileModal';
import ChangePasswordModal from './ChangePasswordModal';
import UserValidator from '../../validators/UserValidator';

/**
 * @class UserProfile
 * @extends {Component}
 */
class UserProfile extends Component {
  /**
   * @description - Creates an instance of UserProfile.
   *
   * @method constructor
   *
   * @param {Object} props
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
   * @description - Submit data
   *
   * @method onSubmit
   *
   * @param {Object} event
   *
   * @returns {void}
   * @memberof UserProfile
   */
  async onSubmit(event) {
    event.preventDefault();
    this.setState({ loaded: false });
    if (event.target.id === 'resetPasswordButton' && !this.state.oldPassword) {
      await this.setState({ oldPassword: '' });
    }
    const file = document.getElementById('profilePicture').files[0];
    if (file) {
      try {
        const image = await imageUpload(file);
        await this.setState({ profilePicture: image.data.secure_url });
        setAuthorizationToken(localStorage.token);
        this.props.updateProfile(this.state)
          .then(response => {
            this.setState({ loaded: true });
            $('.modal').modal('hide');
            document.getElementById('form').reset();
          })
          .catch(error => {
            this.setState({
              errors: error.message,
              loaded: true
            });
          });
      } catch (error) {
        this.setState({ loaded: true });
      }
    } else {
      this.props.updateProfile(this.state)
        .then(response => {
          if (response && response.status === 'Failure') {
            this.setState({
              loaded: true,
              errors: response.message,
            });
          } else {
            this.setState({
              loaded: true,
            });
            $('.modal').modal('hide');
            document.getElementById('change-password-modal').reset();
          }
        });
      document.getElementById('change-password-modal').reset();
    }
  }


  /**
   * @description - Change state values
   *
   * @method onChange
   *
   * @param {obj} event
   *
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
   * @description - Renders react component
   *
   * @method render
   *
   * @returns {Jsx} Jsx
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
      aboutMe,
      facebookUrl,
      twitterUrl,
      linkedInUrl
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
                <h4>About me</h4>
                <p>{aboutMe}</p>
              </div>
            }
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <Link to="#"
                  data-toggle="modal"
                  data-target="#editModal"
                  data-update-profile="update-profile"
                >
                  <i className="fa fa-pencil icons"
                    title="Edit Profile"
                    data-toggle="tooltip" /></Link>

                <Link to="#"
                  data-toggle="modal"
                  data-target="#resetPasswordModal"
                  data-reset-password="reset-password"
                >
                  <i className="fa fa-key icons"
                    title="Change Password"
                    data-toggle="tooltip" /></Link>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <Link to={twitterUrl || '#'} target="_blank"
                  className="fa fa-twitter icons" 
                />
                <Link to={linkedInUrl || '#'} target="_blank"
                  className="fa fa-linkedin icons" 
                />
                <Link to={facebookUrl || '#'} target="_blank"
                  className="fa fa-facebook icons" 
                />
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
          <ChangePasswordModal
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            state={this.state}
          />
        </main>
      </div>
    );
  }
}

const propTypes = {
  auth: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

UserProfile.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state
 *
 * @returns {Object} Object
 */
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout, updateProfile })(UserProfile);
