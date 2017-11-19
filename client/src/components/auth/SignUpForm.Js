import React from 'react';
import {Link} from 'react-router-dom';

const SignUpForm = () => {
  return (
    <div>
      <form action="" className="auth-form">
        <fieldset className="form-group">
          <label htmlFor="first_name" className="form-inline">First Name</label>
          <input type="text" className="form-control" id="first_name" name="first_name" />
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="first_name" className="form-inline">Last Name</label>
          <input type="text" className="form-control" id="first_name" name="first_name" />
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="email" className="form-inline">Email</label>
          <input type="email" className="form-control" id="email" name="email" />
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="password" className="form-inline">Password</label>
          <input type="password" className="form-control" id="password" name="password" />
        </fieldset>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-default" id="login">Signup</button>
          <Link to='/login' style={{paddingTop: 10}}>Already a member</Link>	
        </div>		
      </form><br />
    </div>
  )
}

export default SignUpForm;