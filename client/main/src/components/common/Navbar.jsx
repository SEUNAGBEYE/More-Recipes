import React from 'react';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth/Auth';
import { searchRecipes, getFavouritedRecipesIds }
  from
  '../../actions/Recipes';

/**
 * @class Navbar
 * @extends Component
 */
class Navbar extends React.Component {
  /**
   * Creates an instance of Navbar.
   * @param {any} props
   * @memberof Navbar
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.search = this.search.bind(this);
    this.searchRecipes = this.searchRecipes.bind(this);
    this.history = createHistory;
  }
  /**
 *
 * @returns {void} void
 * @memberof Navbar
 */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.getFavouritedRecipesIds();
    }
  }

  /**
 *
 *
 * @param {any} event
 * @memberof Navbar
 * @returns {void}
 */
  logout(event) {
    event.preventDefault();
    this.props.logout();
    this.props.history.push('/login');
  }
  /**
 *
 *
 * @param {any} event
 * @memberof Navbar
 * @returns {void} void
 */
  search(event) {
    event.preventDefault();
    this.props.history.push(`/search_results?search=${event.target.search.value}`);
  }

  /**
   *@returns {void} void
   * @param {any} searchValue
   * @param {any} page
   * @memberof Navbar
   */
  searchRecipes(searchValue, page) {
    this.props.searchRecipes(searchValue, page);
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

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">

              <form className="form-inline" action="" method="GET" onSubmit={this.search}>

                <input type="text" name="search" className="form-control" placeholder="search" />

              </form>
              {isAuthenticated ?
                <ul className="navbar-nav">
                  <div className="dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                        Categories
                    </a>
                    <div className="dropdown-menu dropdown-menu-nav" aria-labelledby="about-us">
                      {
                        this.props.categories.map(category =>
                          (<Link className="dropdown-item"
                            key={category.id}
                            to={`/categories/${category.name}`}
                          >{category.name}</Link>))
                      }
                    </div>
                  </div>
                  <div className="dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                      {this.props.auth.user.firstName}
                    </a>
                    <div className="dropdown-menu dropdown-menu-nav" aria-labelledby="about-us">
                      <Link className="dropdown-item" to="/recipes">All Recipes</Link>
                      <Link className="dropdown-item" to="/recipes">Popular Recipes</Link>
                      <Link className="dropdown-item" to="/my_recipes">My Recipes</Link>
                      <Link className="dropdown-item" to="/my_favourites">Favourites</Link>
                      <Link className="dropdown-item" to="/profile">Profile</Link>
                      <Link className="dropdown-item" onClick={this.logout} to="#">Logout</Link>
                    </div>
                  </div>
                </ul> :
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <div className="dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                        Recipes
                      </a>
                      <div className="dropdown-menu dropdown-menu-nav" aria-labelledby="about-us">
                        <Link className="dropdown-item" to="/recipes">All Recipes</Link>
                        <Link className="dropdown-item" to="/my_recipes">Popular Recipes</Link>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                        Categories
                      </a>
                      <div className="dropdown-menu dropdown-menu-nav" aria-labelledby="about-us">
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
                    <Link className="nav-link" to="/login">Sign In</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
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

// Navbar.contextTypes = {
//   router: React.PropTypes.object.isRequired
// };

/**
 * mapStateToProps
 * @param {any} state
 * @returns {object} object
 */
const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  categories: state.recipes.recipeCategories
    .map(category => ({ name: category.name, id: category.id }))
});

export default connect(mapStateToProps, { logout, searchRecipes, getFavouritedRecipesIds })(Navbar);
