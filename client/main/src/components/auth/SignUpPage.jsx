import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUpForm from './SignUpForm';
import { signUpRequest, forgotPassword } from '../../actions/auth/Auth';
import UserValidator from '../../validators/UserValidator';

/**
 * @class SignUpPage
 * @extends {Component}
 */
class SignUpPage extends Component {
  /**
   * Creates an instance of SignUpPage.
   * @param {any} props
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
    this.forgotPassword = this.forgotPassword.bind(this);
    this.history = this.props.history;
  }

  /**
   * @returns {void} void
   * @memberof SignUpPage
   */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.history.push('/');
    }
  }

  /**
 * @returns {void} void
 * @param {obj} event
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
*
* @returns {void} void
* @param {any} e
* @memberof SignUpPage
*/
  onSubmit(e) {
    e.preventDefault();
    this.props.signUpRequest(this.state)
      .then(signUpResponse => {
        if (signUpResponse[0] && signUpResponse[0].description) {
          toastr.error(signUpResponse[0].description, 'Error!');
          this.setState({ errors: signUpResponse });
        } else {
          this.history.push('/');
        }
      });
  }

  /**
   * @param {obj} event
   * @returns {void} void
   * @memberof SignUpPage
   */
  forgotPassword(event) {
    event.preventDefault();
    this.props.forgotPassword(this.state)
      .then(res => this.setState({ resetPasswordMessage: res.data.message }));
  }

  /**
   * @returns {JSX} jsx
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

/**
 * mapStateToProps
 * @param {any} state
 * @returns {object} object
 */
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signUpRequest, forgotPassword })(SignUpPage);
