import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFavouritedRecipesIds, toggleFavouriteRecipe, addRecipe, getUserRecipes, allRecipes, favouriteRecipe, deleteRecipe, editRecipe } from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Exclamation from './Exclamation';
import RecipeModal from './RecipeModal';


/**
 * @class AllRecipes
 * @extends {Component}
 */
class AllRecipes extends Component {
  /**
   * Creates an instance of AllRecipes.
   * @param {any} props
   * @memberof AllRecipes
   */
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.toggleFavouriteRecipe = this.toggleFavouriteRecipe.bind(this);
    this.paginateRecipes = this.paginateRecipes.bind(this);
  }

  /**
   * @returns {void} void
 * @memberof AllRecipes
 */
  componentDidMount() {
    this.paginateRecipes(1);

    this.props.getFavouritedRecipesIds()
      .then(res => {
        this.setState({ favouritedRecipeIds: [...res.favouritedRecipesIds] });
      });
  }

  /**
   * @returns {void} void
   * @param {any} page
   * @memberof AllRecipes
   */
  paginateRecipes(page) {
    this.props.allRecipes(page)
      .then(res => {
        this.setState({ allRecipes: [...res.allRecipes] });
      });
  }


  /**
   * @param {any} data
   * @returns {void} void
   * @memberof AllRecipes
   */
  onSubmit(data) {
    this.props.addRecipe(data)
      .then(res => {
        this.setState({ allRecipes: [...this.state.allRecipes, res.recipe] });
      });
  }

  /**
   * @param {any} id
   * @returns {void} void
   * @memberof AllRecipes
   */
  deleteRecipe(id) {
    this.props.deleteRecipe(id)
      .then(res => {
        this.setState({ allRecipes: this.state.allRecipes.filter(recipe => recipe.id !== id) });
      });
  }

  /**
 * @param {any} id
 * @returns {void} void
 * @memberof AllRecipes
 */
  toggleFavouriteRecipe(id) {
    toggleFavouriteRecipe(id)
      .then(res => {
        this.setState({ favouritedRecipesIds: [...res.data.favouritedRecipesId] });
      });
  }


  /**
   * @param {any} id
   * @returns {void} void
   * @param {any} recipe
   * @memberof AllRecipes
   */
  editRecipe(id, recipe) {
    this.props.editRecipe(id, recipe)
      .then(res => {
        this.setState({ allRecipes: [...this.state.allRecipes.filter(recipe => recipe.id === id)] });
      });
  }


  /**
   * @memberOf UserRecipes
   * @returns {jsx} JSX
   * return {object}
   */
  render() {
    return (
      <div>
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
              <h4 className="container__myrecipes">All Recipes</h4><br /><br />
              <RecipeModal addRecipe={this.onSubmit}/>
            </div>

            <div className="row">
              {
                this.props.recipes.length > 0 ?
                  this.props.recipes.map((elem, index) => (<RecipeCard key={elem.id}
                    user={this.props.user}
                    recipe={elem}
                    id={elem.id}
                    onDelete={this.deleteRecipe}
                    editRecipe={this.editRecipe}
                    toggleFavouriteRecipe={this.toggleFavouriteRecipe}
                    history={this.props.history}
                  />)) :
                  <Exclamation>
                    <p className="text-muted text-center">Sorry no recipe has been added yet, please add to get started</p>
                  </Exclamation>
              }
            </div>
          </div>
        </main>
        <Pagination recipesCount={this.props.pagination} recipesPagination={this.paginateRecipes}/>
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
  recipes: state.recipes.allRecipes,
  pagination: state.recipes.pagination,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  getFavouritedRecipesIds, toggleFavouriteRecipe, allRecipes, addRecipe, getUserRecipes, deleteRecipe, editRecipe
})(AllRecipes);

