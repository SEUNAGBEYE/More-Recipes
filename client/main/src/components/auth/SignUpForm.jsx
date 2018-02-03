import React from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = (props) => (
  <div>
    <form className="auth-form" onSubmit={props.onSubmit}>
      <fieldset className="form-group">
        <label htmlFor="firstName" className="form-inline">First Name</label>
        <input type="text" className="form-control" id="first_name"
          name="firstName"
          onChange={props.onChange}
          required
          value={props.state.firstName}/>
      </fieldset>

      <fieldset className="form-group">
        <label htmlFor="lastName" className="form-inline">Last Name</label>
        <input type="text" className="form-control"
          id="last_name" name="lastName"
          onChange={props.onChange}
          required
          value={props.state.lastName}/>
      </fieldset>

      <fieldset className="form-group">
        {props.state.errors &&
               <p className="errors">
                 {
                   props.state.errors.map(error => (error.field === 'email' ?
                     error.description : 'ddddddd'))
                 }
               </p>}
        <label htmlFor="email" className="form-inline">Email</label>
        <input type="email" className="form-control"
          id="email"
          name="email"
          onChange={props.onChange}
          required
          value={props.state.email}/>
      </fieldset>

      <fieldset className="form-group">
        <label htmlFor="password" className="form-inline">Password</label>
        <input type="password" className="form-control"
          id="password"
          name="password"
          onChange={props.onChange}
          required
          value={props.state.password}/>
      </fieldset>

      <div className="d-flex justify-content-between">
        <button type="submit"
          className="btn btn-default"
          id="login"
        >Signup</button>
        <Link to="/login" style={{ paddingTop: 10 }}>Already a member</Link>
      </div>
    </form><br />
  </div>
);

export default SignUpForm;
