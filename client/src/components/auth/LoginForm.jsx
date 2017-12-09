import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../actions/auth/LoginRequest';

export default class LoginForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, errors: '' });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state)
  }

  render(){

    return (
      <div>
        <form className="auth-form" onSubmit={this.onSubmit}>
          <fieldset className="form-group">
          {this.state.errors && <p className='errors'>{this.state.errors}</p>}
          <label htmlFor="email" className="form-inline">Email</label>
          <input type="email" className="form-control" id="email" name="email" onChange={this.onChange} required value={this.state.email}/>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="password" className="form-inline">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={this.onChange} required value={this.state.password}/>
        </fieldset>

          <label className="custom-control custom-checkbox" style={{float: 'left'}}>
            <input type="checkbox" className="custom-control-input" id="checked" />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Remember Me</span>
          </label>
          <br /><br />
          
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-default" id="login">Login</button>
            <Link to='/signup' style={{paddingTop: 10}}>Not a member</Link>	
          </div>
        </form><br/>
      </div>
    )
  }

}

// /**
//  * mapStateToProps
//  * @param {any} state
//  * @returns {object} object
//  */
// const mapStateToProps = (state) => {
//   return {
//     auth: state.auth
//   };
// }

// export default connect(mapStateToProps, { login })(LoginForm);
