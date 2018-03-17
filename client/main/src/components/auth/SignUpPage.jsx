import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignUpForm from './SignUpForm';
import { signUpRequest, forgotPassword } from '../../actions/auth/Auth';
import UserValidator from '../../validators/UserValidator';

/**
 * @class SignUpPage
 * @extends {Component}
 */
class SignUpPage extends Component {
  /**
   * @description - Creates an instance of SignUpPage.
   *
   * @method constructor
   *
   * @param {any} props
   *
   * @returns {void} void
   * @memberof SignUpPage
   */
  constructor(props) {
    super(props);
    this.history = this.props.history;
    this.signUpRequest = signUpRequest;

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.history = this.props.history;
  }

  /**
   * @description - Checks if user is authenticated
   *
   * @method componentWillMount
   *
   * @returns {void} void
   * @memberof SignUpPage
   */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.history.push('/');
    }
  }

  /**
 * @description - Change state values
 *
 * @method onChange
 *
 * @param {Object} event
 *
 * @returns {void} void
 * @memberof SignUpPage
 */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errors: '',
      resetPasswordMessage: ''
    });
    const self = this;
    UserValidator.passwordValidator(event, self);
  }


  /**
* @description - Submit data
*
* @method onSubmit
*
* @param {Object} event
*
* @returns {void} void
* @memberof SignUpPage
*/
  onSubmit(event) {
    event.preventDefault();
    this.props.signUpRequest(this.state)
      .then(signUpResponse => {
        if (signUpResponse && signUpResponse.errors) {
          this.setState({ errors: signUpResponse.errors });
        } else {
          this.history.push('/');
        }
      });
  }

  /**
   * @description - Renders react component
   *
   * @method render
   *
   * @returns {Jsx} Jsx
   * @memberof SignUpPage
   */
  render() {
    return (
      <div>
        <main>
          <div className="container">
            <div className="row">
              <div className="col-md-4" />
              <div className="col-md-4">
                <SignUpForm signUpRequest={this.signUpRequest}
                  state={this.state}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  forgotPassword={this.forgotPassword}
                />
              </div>
            </div><br />
          </div>
        </main>
      </div>
    );
  }
}
const propTypes = {
  auth: PropTypes.object,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  forgotPassword: PropTypes.func,
  signUpRequest: PropTypes.func,
};

SignUpPage.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {any} state
 * @returns {object} object
 */
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  signUpRequest,
  forgotPassword
})(SignUpPage);
