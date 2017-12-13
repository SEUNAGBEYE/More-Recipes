import React from 'react';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {Link, withRouter} from 'react-router-dom';
import {logout} from '../../actions/auth/LoginRequest'

/**
 * @class Navbar
 * @extends Component
 */
class Navbar extends React.Component {

  constructor(props){
    super(props)
    this.logout = this.logout.bind(this);
    this.search = this.search.bind(this);




    this.history = createHistory

  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
    window.location=('/login')
  }

  search(e){
    e.preventDefault();
    window.location=(`/search_results?search=${e.target.search.value}`)

  }
  /**
   * returns {obeject} object
   * @memberOf Navbar
   */
  render(){
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

              <form className="form-inline" action="" method="GET" onSubmit={this.search}>
 
                  <input type="text" name="search" className="form-control" id="search" placeholder="search" /> 
                
              </form>
              {isAuthenticated
               ?
               <div className="dropdown">
               <button className="btn btn-default dropdown-toggle auth-button" type="button" id="about-us" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Menu
               </button>
               <div className="dropdown-menu dropdown-menu-nav" aria-labelledby="about-us">
                 <Link className="dropdown-item" to="/recipes">All Recipes</Link>
                 <Link className="dropdown-item" to="/my_recipes">My Recipes</Link>
                 <Link className="dropdown-item" to="/my_favourites">Favourites</Link>
                 <Link className="dropdown-item" to="/profile">Profile</Link>
                 <Link className="dropdown-item" onClick={this.logout} to='#'>Logout</Link>
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