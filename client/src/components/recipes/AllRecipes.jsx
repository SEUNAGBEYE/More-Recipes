import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getFavouritedRecipesIds,
  addRecipe,
  allRecipes,
  recipeCategories
}
  from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Exclamation from './Exclamation';
import RecipeModal from './RecipeModal';
import CategoryButton from './CategoryButton';


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
    this.paginateRecipes = this.paginateRecipes.bind(this);
  }

  /**
   * @returns {void} void
 * @memberof AllRecipes
 */
  componentDidMount() {
    this.paginateRecipes(1);
  }

  /**
   * @returns {void} void
   * @param {any} page
   * @memberof AllRecipes
   */
  paginateRecipes(page) {
    this.props.recipeCategories();
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
   * @memberOf UserRecipes
   * @returns {jsx} JSX
   * return {object}
   */
  render() {
    return (
      <div>
        <main style={{ marginTop: 40 }}>

          <div className="container">
            <CategoryButton/>
          </div>

          <div className="container">
            <div style={{ textAlign: 'center', marginTop: 100 }}>
              <h4 className="container__myrecipes">All Recipes</h4><br /><br />
              <RecipeModal
                addRecipe={this.onSubmit}
                recipeCategories={this.props.categories}
              />
            </div>

            <div className="row">
              {
                this.props.recipes.length > 0 ?
                  this.props.recipes.map((recipe, index) => (
                    <RecipeCard key={recipe.id}
                      user={this.props.user}
                      recipe={recipe}
                      id={recipe.id}
                      history={this.props.history}
                    />)) :
                  <Exclamation>
                    <p className="text-muted text-center">
                      Sorry no recipe has been added yet,
                      please add to get started
                    </p>
                  </Exclamation>
              }
            </div>
          </div>
        </main>
        <Pagination recipesCount={this.props.pagination}
          recipesPagination={this.paginateRecipes}/>
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
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  categories: state.recipes.recipeCategories
});

export default connect(mapStateToProps, {
  getFavouritedRecipesIds,
  allRecipes,
  addRecipe,
  recipeCategories
})(AllRecipes);

