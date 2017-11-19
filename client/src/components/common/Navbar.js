import React from 'react';
import {Link} from 'react-router-dom';

/**
 * @class Navbar
 * @extends Component
 */
export default class Navbar extends React.Component {

  /**
   * returns {obeject} object
   * @memberOf Navbar
   */
  render(){
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

              <Link className="btn btn-default auth-button" to='/login'>Login</Link>

              <Link className="btn btn-default auth-button" to="signup">Signup</Link>
            </div>
          
          </nav>
        </header>
      </div>
    )
  }
}