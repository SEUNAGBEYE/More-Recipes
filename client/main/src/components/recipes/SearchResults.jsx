import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFavouritedRecipesIds, searchRecipes, toggleFavouriteRecipe, addRecipe, getUserRecipes, allRecipes, deleteRecipe, editRecipe } from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Exclamation from './Exclamation';
import CategoryButton from './CategoryButton';


/**
 * @class SearchResults
 * @extends {Component}
 */
class SearchResults extends Component {
  /**
   *
   *@returns {void} void
   * @memberof SearchResults
   */
  componentDidMount() {
    // this.paginateRecipes(0);

    this.props.getFavouritedRecipesIds()
      .then(res => {
        this.setState({ favouritedRecipeIds: [...res.favouritedRecipesIds] });
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
        <main style={{ marginTop: 40 }}>

          <div className="container">
            <CategoryButton />
          </div>

          <div className="container">
            <div style={{ textAlign: 'center', marginTop: 100 }}>
              <h4 className="container__myrecipes">Search Results</h4>
              <br /><br />
            </div>

            <div className="row">
              {
                this.props.recipes.length > 0 ?
                  this.props.recipes.map((elem, index) => (
                    <RecipeCard key={elem.id}
                      user={this.props.user}
                      recipe={elem}
                      id={elem.id}
                      onDelete={this.deleteRecipe}
                      editRecipe={this.editRecipe}
                      toggleFavouriteRecipe={this.toggleFavouriteRecipe}
                    />)) :
                  <Exclamation>
                    <p className="text-muted text-center">
                      Sorry no results, try searching something
                    </p>
                  </Exclamation>
              }
            </div>
          </div>
        </main>
        <Pagination recipesCount={this.props.recipesCount}
          recipesPagination={this.paginateRecipes}
        />
      </div>
    );
  }
}

/**
 * mapStateToProps
 * @param {any} state
 * @param {props} props
 * @returns {object} object
 */
const mapStateToProps = (state, props) => ({
  recipes: state.recipes.allRecipes,
  recipesCount: state.recipes.recipesCount,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getFavouritedRecipesIds,
  searchRecipes,
  toggleFavouriteRecipe,
  allRecipes,
  addRecipe,
  getUserRecipes,
  deleteRecipe,
  editRecipe
})(SearchResults);

