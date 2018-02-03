import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import LoginForm from './LoginForm';
import { login } from '../../actions/auth/Auth';


/**
 * @class LoginPage
 * @extends Component
 */
class LoginPage extends Component {
  /**
   * Creates an instance of LoginPage.
   * @param {obj} props
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
    this.history = this.props.history;
  }

  /**
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
   * @param {obj} nextProps
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
   * @param {obj} event
   * @returns {void}
   * @memberof LoginPage
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value, errors: '' });
  }
  /**
   * @param {obj} event
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
   * @return {JSX} jsx
   * @memberOf LoginPage
   */
  render() {
    return (
      <div>
        <Navbar />
        <main style={{ marginBottom: 0 }}>
          <div className="container">
            <div className="row">
              <div className="col-md-4" />
              <div className="col-md-4">
                <LoginForm onSubmit={this.onSubmit}
                  state={this.state}
                  onChange={this.onChange}
                />
              </div>
            </div><br /><br />
          </div>
        </main>
        <Footer />
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

export default connect(mapStateToProps, { login })(LoginPage);
