import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import LoginForm from './LoginForm';
import {login} from '../../actions/auth/LoginRequest';


/**
 * @class LoginPage
 * @extends Component
 */
class LoginPage extends Component{

  onSubmit = (data) => {

      const history =  this.props.history
      this.props.login(data, history)
  }

  /**
   * return {object} object
   * @memberOf LoginPage
   */
  render(){
    return (
      <div>
          <Navbar />
        	<main style={{marginBottom: 0}}>
            <div className="container">
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <LoginForm login={this.onSubmit}/>
                </div>
              </div><br /><br />
            </div>
          </main>
          <Footer />
      </div>
    )
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
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { login })(LoginPage);