import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth/Auth';
import { getFavouritedRecipesIds }
  from
  '../../actions/Recipes';

/**
 * @class Navbar
 * @extends Component
 */
export class Navbar extends React.Component {
  /**
   * Creates an instance of Navbar.
   * @param {any} props
   * @memberof Navbar
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.search = this.search.bind(this);
    this.history = createHistory;
  }
  /**
 *
 * @returns {void} void
 * @memberof Navbar
 */
  componentWillMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.getFavouritedRecipesIds();
    }
  }

  /**
* @returns {void}
 * @memberof Navbar
 */
  logout() {
    this.props.logout();
    this.props.history.push('/login');
  }
  /**
 *
 *
 * @param {Object} event
 *
 * @returns {void} void
 * @memberof Navbar
 */
  search(event) {
    event.preventDefault();
    this.props.history
      .push(`/search_results?search=${event.target.search.value}`);
  }

  /**
   * @returns {jsx} JSX
   * @memberOf Navbar
   */
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <header className="header">
          <nav
            className="navbar fixed-top navbar-expand-lg navbar-light bg-light d-flex p-2"
            id="navbar"
          >

            <Link className="navbar-brand" to="/" id="brand">Recipes</Link>

            <button className="navbar-toggler" type="button"
              data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">

              <form className="form-inline" id="search-form" onSubmit={this.search}>

                <input type="text" name="search"
                  className="form-control"
                  placeholder="search" />

              </form>
              {isAuthenticated ?
                <ul className="navbar-nav">
                  <div className="dropdown">
                    <Link className="nav-link dropdown-toggle categories" to="#"
                      id="categories-down-down"
                      data-toggle="dropdown">
                        Categories
                    </Link>
                    <div className="dropdown-menu dropdown-menu-nav"
                      aria-labelledby="about-us">
                      {
                        this.props.categories.map(category =>
                          (<Link className="dropdown-item"
                            key={category.id}
                            to={`/categories/${category.name}`}
                          >{category.name}</Link>))
                      }
                    </div>
                  </div>
                  <div className="dropdown" id="user-drop-down">
                    <Link className="nav-link dropdown-toggle" to="#"
                      data-toggle="dropdown">
                      {this.props.auth.user.firstName}
                    </Link>
                    <div className="dropdown-menu dropdown-menu-nav"
                      aria-labelledby="about-us">
                      <Link className="dropdown-item" to="/recipes"
                        id="all-recipes"
                      >
                        All Recipes
                      </Link>
                      <Link className="dropdown-item" to="/my_recipes"
                        id="my-recipes"
                      >
                        My Recipes
                      </Link>
                      <Link className="dropdown-item" to="/my_favourites">
                        Favourites
                      </Link>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                      <Link className="dropdown-item"
                        onClick={this.logout} to="#" id="logout">Logout</Link>
                    </div>
                  </div>
                </ul> :
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <div className="dropdown">
                      <Link className="nav-link dropdown-toggle" to="#"
                        id="recipesNav" data-toggle="dropdown">
                        Recipes
                      </Link>
                      <div className="dropdown-menu dropdown-menu-nav"
                        aria-labelledby="about-us">
                        <Link className="dropdown-item"
                          id="allRecipesNav"
                          to="/recipes">
                        All Recipes
                        </Link>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="dropdown">
                      <Link className="nav-link dropdown-toggle categories" to="#"
                        data-toggle="dropdown">
                        Categories
                      </Link>
                      <div className="dropdown-menu dropdown-menu-nav"
                        aria-labelledby="about-us">
                        {
                          this.props.categories.map(category =>
                            (<Link className="dropdown-item"
                              key={category.id}
                              to={`/categories/${category.name}`}
                            >{category.name}</Link>))
                        }
                      </div>
                    </div>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" id="signIn">Sign In</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup" id="signUp">Sign Up</Link>
                  </li>
                </ul>
              }
            </div>

          </nav>
        </header>
      </div>
    );
  }
}

const propTypes = {
  auth: PropTypes.object.isRequired,
  getFavouritedRecipesIds: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

Navbar.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {any} state
 * @returns {object} object
 */
export const mapStateToProps = (state) => ({
  auth: state.auth,
  categories: state.recipes.recipeCategories
    .map(category => ({ name: category.name, id: category.id }))
});

export default connect(mapStateToProps, {
  logout,
  getFavouritedRecipesIds
})(Navbar);
