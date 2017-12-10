import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class SignUpForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @memberof SignUpForm
   */
  onChange(e){
    this.setState({ [e.target.name]: e.target.value, errors: '' });
  }

  /**
   * @memberof SignUpForm
   */
  onSubmit(e){
    e.preventDefault();
    this.props.signUpRequest(this.state)
    .then(res => {
      toastr.success('Account created please login to continue', 'Success!')
      window.location=('/login');
    })
    .catch((errors) => {
      console.log(errors)
      toastr.error(errors.response, 'Error!')
      this.setState({errors: errors.response})
    })
  }

  render() {
    return (
      <div>
        <form className="auth-form" onSubmit={this.onSubmit}>
          <fieldset className="form-group">
            <label htmlFor="firstName" className="form-inline">First Name</label>
            <input type="text" className="form-control" id="first_name" name="firstName" onChange={this.onChange} required value={this.state.firstName}/>
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="lastName" className="form-inline">Last Name</label>
            <input type="text" className="form-control" id="last_name" name="lastName" onChange={this.onChange} required value={this.state.lasttName}/>
          </fieldset>

          <fieldset className="form-group">
            {this.state.errors && <p className='errors'>{this.state.errors}</p>}
            <label htmlFor="email" className="form-inline">Email</label>
            <input type="email" className="form-control" id="email" name="email" onChange={this.onChange} required value={this.state.email}/>
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="password" className="form-inline">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={this.onChange} required value={this.state.password}/>
          </fieldset>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-default" id="login">Signup</button>
            <Link to='/login' style={{paddingTop: 10}}>Already a member</Link>	
          </div>		
        </form><br />
      </div>
    )
 }
}

export default SignUpForm;