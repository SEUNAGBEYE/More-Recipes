import React from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {logout} from '../../actions/auth/LoginRequest'

/**
 * @class Navbar
 * @extends Component
 */
class Navbar extends React.Component {

  constructor(props){
    super(props)
    console.log(this.props)
    console.log(props)

    this.logout = this.logout.bind(this)
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
    console.log('============',this.props)
    //this.props.history.push('/login')
    window.location=('/login')
  }
  /**
   * returns {obeject} object
   * @memberOf Navbar
   */
  render(){
    console.log('============',this.props)
    const isAuthenticated = this.props.auth.isAuthenticated;
    return (
      <div>
        <header className='header'>
          <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light d-flex p-2">

            <Link className="navbar-brand" to='/' id="brand">Recipes</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">   

              <form className="form-inline" action="search_results.html" method="GET">
 
                  <input type="text" name="" className="form-control" id="search" placeholder="search" /> 
                
              </form>
              {isAuthenticated
               ?
               <div className="dropdown">
               <button className="btn btn-default dropdown-toggle auth-button" type="button" id="about-us" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Menu
               </button>
               <div className="dropdown-menu dropdown-menu-nav" aria-labelledby="about-us">
                 <Link className="dropdown-item" to="/">All Recipes</Link>
                 <Link className="dropdown-item" to="/my_recipes">My Recipes</Link>
                 <Link className="dropdown-item" to="/">Favorites</Link>
                 <Link className="dropdown-item" to="/">Profile</Link>
                 <Link className="dropdown-item" onClick={this.logout} to='/'>Logout</Link>
               </div>
             </div>
               : 
              <div> 
               <Link className="btn btn-default auth-button" to='/login'>Login</Link>
                <Link className="btn btn-default auth-button" to="/signup">Signup</Link>
              </div>
              }
            </div>
          
          </nav>
        </header>
      </div>
    )
  }
}

// Navbar.contextTypes = {
//   router: React.PropTypes.object.isRequired
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


export default connect(mapStateToProps, { logout })(Navbar);