import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { getFavouritedRecipes, getFavouritedRecipesIds, toggleFavouriteRecipe, addRecipe, getUserRecipes, allRecipes, deleteRecipe, editRecipe } from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Exclamation from './Exclamation';
import RecipeModal from './RecipeModal';


/**
 * @class UserRecipes
 */
class FavoruriteRecipes extends Component {
  /**
   * Creates an instance of FavoruriteRecipes.
   * @param {any} props
   * @memberof FavoruriteRecipes
   */
  constructor(props) {
    super(props);
    this.state = {
      favouritedRecipes: [],
      favouritedRecipesIds: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.toggleFavouriteRecipe = this.toggleFavouriteRecipe.bind(this);
    this.paginateRecipes = this.paginateRecipes.bind(this);
  }

  /**
 *@returns {void} void
 * @memberof FavoruriteRecipes
 */
  componentDidMount() {
    this.paginateRecipes(0);
  }

  /**
   *
   * @returns {void} void
   * @param {any} page
   * @memberof FavoruriteRecipes
   */
  paginateRecipes(page) {
    this.props.getFavouritedRecipes(page)
      .then(res => {
        this.setState({ favouritedRecipes: [...res.favouriteRecipes] });
      });

    this.props.getFavouritedRecipesIds();
  }


  /**
   * @returns {void} void
   * @param {any} data
   * @memberof FavoruriteRecipes
   */
  onSubmit(data) {
    this.props.addRecipe(data)
      .then(res => {
        this.setState({ allRecipes: [...this.state.allRecipes, res.recipe] });
      });
  }

  /**
   * @returns {void} void
   * @param {any} id
   * @memberof FavoruriteRecipes
   */
  deleteRecipe(id) {
    this.props.deleteRecipe(id)
      .then(res => {
        this.setState({ allRecipes: this.state.allRecipes.filter(recipe => recipe.id !== id) });
      });
  }

  /**
   * @returns {void} void
   * @param {any} id
   * @memberof FavoruriteRecipes
   */
  toggleFavouriteRecipe(id) {
    toggleFavouriteRecipe(id)
      .then(res => {
        this.setState({ favouritedRecipesIds: [...res.data.favouritedRecipesId] });
      });
  }

  /**
   * @returns {void} void
   * @param {any} id
   * @param {any} recipe
   * @memberof FavoruriteRecipes
   */
  editRecipe(id, recipe) {
    this.props.editRecipe(id, recipe)
      .then(res => {
        this.setState({ allRecipes: [...this.state.allRecipes.filter(recipe => recipe.id === id)] });
      });
  }


  /**
   * @returns {jsx} JSX
   * @memberOf UserRecipes
   * return {object}
   */
  render() {
    return (
      <div>
        <Navbar />
        <main style={{ marginTop: 40 }}>

          <div className="container">
            <div className="dropdown" style={{ float: 'left' }}>
              <button className="btn btn-default dropdown-toggle auth-button" type="button" id="about-us" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category
              </button>
              <div className="dropdown-menu" aria-labelledby="about-us">
                <Link className="dropdown-item" to="recipes.html">Dessert</Link>
                <Link className="dropdown-item" to="my_recipes.html">Pasta</Link>
                <Link className="dropdown-item" to="favourite_recipe.html">Fries</Link>
                <Link className="dropdown-item" to="#">Chinese</Link>
                <Link className="dropdown-item" to="index.html">Africa</Link>
              </div>
            </div>
          </div>

          <div className="container">
            <div style={{ textAlign: 'center', marginTop: 100 }}>
              <h4 className="container__myrecipes">Favourite Recipes</h4><br /><br />
              <RecipeModal addRecipe={this.onSubmit}/>
            </div>

            <div className="row">
              {
                this.state.favouritedRecipes.length > 0 ?
                  this.props.favouritedRecipes.map((elem, index) => (<RecipeCard key={elem.id}
                    user={this.props.user}
                    recipe={elem}
                    id={elem.id}
                    onDelete={this.deleteRecipe}
                    editRecipe={this.editRecipe}
                    toggleFavouriteRecipe={this.toggleFavouriteRecipe}
                  />)) :
                  <Exclamation>
                    <p className="text-muted text-center">Sorry you have not favourited any recipe yet!</p>
                  </Exclamation>
              }
            </div>
          </div>
        </main>
        <Pagination recipesCount={this.props.recipesCount} recipesPagination={this.paginateRecipes}/>
        <Footer />
      </div>
    );
  }
}

/**
 * mapStateToProps
 * @param {any} state
 * @returns {object} object
 */
const mapStateToProps = (state) => ({
  recipesCount: state.recipes.recipesCount,
  favouritedRecipes: state.recipes.favouriteRecipes
});

export default connect(mapStateToProps, {
  getFavouritedRecipes, getFavouritedRecipesIds, toggleFavouriteRecipe, allRecipes, addRecipe, getUserRecipes, deleteRecipe, editRecipe
})(FavoruriteRecipes);

