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
   * @param {any} props
   * @memberof LoginPage
   */
  constructor(props) {
    super(props);
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
   * @param {any} nextProps
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
   * @param {any} data
   * @memberof LoginPage
   * @returns {void} void
   */
  onSubmit(data) {
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
                <LoginForm login={this.onSubmit}/>
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
