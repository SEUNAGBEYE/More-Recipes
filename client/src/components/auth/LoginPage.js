import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import LoginForm from './LoginForm';



/**
 * @class LoginPage
 * @extends Component
 */
export default class LoginPage extends Component{

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
                  <LoginForm />
                </div>
              </div><br /><br />
            </div>
          </main>
          <Footer />
      </div>
    )
  }
}