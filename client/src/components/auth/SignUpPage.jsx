import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import SignUpForm from './SignUpForm';
import { signUpRequest } from '../../actions/auth/Auth';

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
   * @returns {JSX} jsx
   * @memberof SignUpPage
   */
  render() {
    return (
      <div>
        <Navbar />
        <main>
          <div className="container">
            <div className="row">
              <div className="col-md-4" />
              <div className="col-md-4">
                <SignUpForm signUpRequest={this.signUpRequest}/>
              </div>
            </div><br />
          </div>
        </main>
        <Footer />
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

export default connect(mapStateToProps, { signUpRequest })(SignUpPage);
