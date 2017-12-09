import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import SignUpForm from './SignUpForm';
import signUpRequest from '../../actions/auth/SignUpRequest';

/**
 * @class SignUpPage
 * @extends Component
 */
export default class SignUpPage extends Component{


  /**
   * return {object} object
   * @memberOf SignUpPage
   */
  render(){
    return (
      <div>
        <Navbar />
        <main>
          <div className="container">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <SignUpForm signUpRequest={signUpRequest}/>
              </div>
            </div><br />
          </div>
        </main>
        <Navbar />
      </div>
    )
  }
}
