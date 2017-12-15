import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import SignUpForm from './SignUpForm';
import signUpRequest from '../../actions/auth/SignUpRequest';

/**
 * @returns {jsx} JSX
 */
function SignUpPage() {
  return (
    <div>
      <Navbar />
      <main>
        <div className="container">
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4">
              <SignUpForm signUpRequest={signUpRequest}/>
            </div>
          </div><br />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SignUpPage;
