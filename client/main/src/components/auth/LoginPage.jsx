import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import { login, forgotPassword } from '../../actions/auth/Auth';


/**
 * @class LoginPage
 * @extends Component
 */
class LoginPage extends Component {
  /**
   * @description - Creates an instance of LoginPage.
   *
   * @method contructor
   *
   * @param {Object} props
   *
   * @returns {void} void
   * @memberof LoginPage
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.history = this.props.history;
  }

  /**
   * @description - Checks if user is authenticated
   *
   * @method componentWillMount
   *
   * @returns {void} void
   * @memberof LoginPage
   */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.history.push('/');
    }
  }

  /**
   * @description - Checks if there's are new props
   *
   * @method componentWillReceiveProps
   *
   * @param {Object} nextProps
   *
   * @returns {void} void
   * @memberof LoginPage
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      let redirectAfterLogin = this.history.location.search.split('=')[1];
      if (!redirectAfterLogin) {
        this.history.push('/');
      } else {
        this.history.push(`${redirectAfterLogin}`);
      }
    }
  }

  /**
   * @description - Change values in the state
   *
   * @method onChange
   *
   * @param {Object} event
   *
   * @returns {void}
   * @memberof LoginPage
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errors: '',
      resetPasswordMessage: '',
    });
  }
  /**
   * @description - Submit data
   *
   * @method onSubmit
   *
   * @param {Object} event
   *
   * @memberof LoginPage
   * @returns {void} void
   */
  onSubmit(event) {
    event.preventDefault();
    const data = this.state;
    let redirectAfterLogin = this.history.location.search.split('=')[1];
    if (!redirectAfterLogin) {
      if (!this.props.login(data, this.history)) {
        this.history.push('/');
      }
    } else {
      this.props.login(data);
    }
  }

  /**
   * @description - Makes forgot password request
   *
   * @method forgotPassword
   * @param {Object} event
   *
   * @returns {void} void
   * @memberof LoginPage
   */
  forgotPassword(event) {
    event.preventDefault();
    this.props.forgotPassword(this.state)
      .then(res => {
        this.setState({ resetPasswordMessage: res.message });
      });
  }

  /**
   * @description - Renders react component
   *
   * @method render
   *
   * @return {Jsx} Jsx
   * @memberof LoginPage
   */
  render() {
    return (
      <div>
        <main style={{ marginBottom: 0 }} id="signInFormContainer">
          <div className="container">
            <div className="row">
              <div className="col-md-4" />
              <div className="col-md-4">
                <LoginForm onSubmit={this.onSubmit}
                  state={this.state}
                  onChange={this.onChange}
                  forgotPassword={this.forgotPassword}
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
  auth: PropTypes.object,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  forgotPassword: PropTypes.func,
  login: PropTypes.func,
};

LoginPage.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state
 * @returns {Object} Object
 */
const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login, forgotPassword })(LoginPage);
