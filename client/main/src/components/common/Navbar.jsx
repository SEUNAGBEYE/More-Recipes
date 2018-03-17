import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth/Auth';
import { getFavouritedRecipesIds, searchRecipes, recipeCategories }
  from
  '../../actions/Recipes';

/**
 * @class Navbar
 * @extends Component
 */
export class Navbar extends React.Component {
  /**
   * @description - Creates an instance of Navbar.
   *
   * @method contructor
   *
   * @param {any} props
   *
   * @returns {void} void
   * @memberof Navbar
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.search = this.search.bind(this);
    this.history = createHistory;
  }

  /**
 * @description - Get Navbar data
 *
 * @method componentDidMount
 *
 * @returns {void} void
 * @memberof Navbar
 */
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    this.props.recipeCategories();
    if (isAuthenticated) {
      this.props.getFavouritedRecipesIds();
    }
  }

  /**
 * @description - Log out a user
 *
 * @method logout
 *
 * @returns {void}
 * @memberof Navbar
 */
  logout() {
    this.props.logout();
    this.props.history.push('/login');
  }

  /**
 * @description - Search for recipes
 *
 * @method search
 *
 * @param {Object} event
 *
 * @returns {void} void
 * @memberof Navbar
 */
  search(event) {
    event.preventDefault();
    const { search } = event.target;
    this.props.searchRecipes(search.value);
    this.props.history
      .push(`/search_results?search=${search.value}`);
  }

  /**
   * @description - Renders react component
   *
   * @method render
   *
   * @returns {jsx} JSX
   * @memberof Navbar
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

            <div className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >

              <form className="form-inline" id="search-form"
                onSubmit={this.search}
              >

                <input type="text" name="search"
                  className="form-control"
                  id="search"
                  placeholder="Recipe name or list of ingredients separed by ,"/>

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
                      <Link className="dropdown-item" to="/my_favourites"
                        id="favourite-recipes"
                      >
                        Favourites
                      </Link>
                      <Link className="dropdown-item" to="/profile"
                        id="profile"
                      >
                        Profile
                      </Link>
                      <Link className="dropdown-item"
                        onClick={this.logout} to="#" id="logout">Logout</Link>
                    </div>
                  </div>
                </ul> :
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="recipes"
                      id="recipesNav">
                        All Recipes
                    </Link>
                  </li>
                  <li>
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
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" id="signIn">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup" id="signUp">
                      Sign Up
                    </Link>
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
  recipeCategories: PropTypes.func.isRequired,
  searchRecipes: PropTypes.func.isRequired,
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
  getFavouritedRecipesIds,
  searchRecipes,
  recipeCategories
})(Navbar);
