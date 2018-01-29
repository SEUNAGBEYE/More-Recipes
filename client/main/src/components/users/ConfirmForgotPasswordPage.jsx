import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConfirmForgotPasswordForm from '../users/ConfirmForgotPasswordForm';
import { confirmForgotPassword } from '../../actions/auth/Auth';
import UserValidator from '../../validators/UserValidator';


/**
 * @class LoginPage
 * @extends Component
 */
class ConfirmForgotPasswordPage extends Component {
  /**
   * Creates an instance of ConfirmForgotPasswordPage.
   * @param {obj} props
   * @memberof ConfirmForgotPasswordPage
   */
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.history = this.props.history;
  }

  /**
   *
   * @returns {void} void
   * @memberof ConfirmForgotPasswordPage
   */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.history.push('/');
    }
  }

  /**
   * @param {obj} nextProps
   * @returns {void} void
   * @memberof ConfirmForgotPasswordPage
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.history.push('/');
    }
  }

  /**
   * @param {obj} event
   * @returns {void}
   * @memberof ConfirmForgotPasswordPage
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errors: '',
      resetPasswordMessage: '',
    });
    const self = this;
    UserValidator.passwordValidator(event, self);
  }
  /**
   * @param {obj} event
   * @memberof ConfirmForgotPasswordPage
   * @returns {void} void
   */
  onSubmit(event) {
    event.preventDefault();
    const data = this.state;
    const { rememberToken } = this.props.match.params;
    this.props.confirmForgotPassword(data, rememberToken)
      .then(res => {
        toastr.success(res.data.message, 'Success');
        this.history.push('/login');
      })
      .catch(error => this.setState({ passwordError: error.response.data.message }));
  }

  /**
   * @return {JSX} jsx
   * @memberOf ConfirmForgotPasswordPage
   */
  render() {
    return (
      <div>
        <main style={{ marginBottom: 0 }}>
          <div className="container">
            <div className="row">
              <div className="col-md-4" />
              <div className="col-md-4">
                <ConfirmForgotPasswordForm onSubmit={this.onSubmit}
                  state={this.state}
                  onChange={this.onChange}
                />
              </div>
            </div><br /><br />
          </div>
        </main>
      </div>
    );
  }
}

// LoginPage.propTypes = {
//   login: React.PropTypes.func.isRequired
// };

/**
 * mapStateToProps
 * @param {any} state
 * @returns {object} object
 */
const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { confirmForgotPassword })(ConfirmForgotPasswordPage);
