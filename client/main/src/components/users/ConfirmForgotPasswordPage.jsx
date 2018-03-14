import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmForgotPasswordForm from '../users/ConfirmForgotPasswordForm';
import { confirmForgotPassword } from '../../actions/auth/Auth';
import UserValidator from '../../validators/UserValidator';


/**
 * @class ConfirmForgotPasswordPage
 * @extends Component
 */
class ConfirmForgotPasswordPage extends Component {
  /**
   * @description - Creates an instance of ConfirmForgotPasswordPage.
   *
   * @method constructor
   *
   * @param {Object} props
   *
   * @returns {void} void
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
   * @description - Fetch Component Data
   *
   * @method componentDidMount
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
   * @description - Manage component new props
   *
   * @method componentWillReceiveProps
   *
   * @param {Object} nextProps
   *
   * @returns {void} void
   * @memberof ConfirmForgotPasswordPage
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
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
   * @description - Submit data
   *
   * @method onSubmit
   *
   * @param {Object} event
   *
   * @returns {void} void
   * @memberof ConfirmForgotPasswordPage
   */
  onSubmit(event) {
    event.preventDefault();
    const data = this.state;
    const { rememberToken } = this.props.match.params;
    this.props.confirmForgotPassword(data, rememberToken)
      .then(res => {
        toastr.success(res.message, 'Success');
        this.history.push('/login');
      })
      .catch(error =>
        this.setState({ passwordError: error.response.data.message }));
  }

  /**
   * @description - Renders react component
   *
   * @method render
   *
   * @return {Jsx} Jsx
   * @memberof ConfirmForgotPasswordPage
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

const propTypes = {
  confirmForgotPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

ConfirmForgotPasswordPage.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state
 *
 * @returns {Object} Object
 */
const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    confirmForgotPassword
  }
)(ConfirmForgotPasswordPage);
