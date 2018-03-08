import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
 * @export
 * @class AllRecipes
 * @extends {Component}
 */
export class AllRecipes extends Component {
  /**
   * Creates an instance of AllRecipes.
   * @param {Object} props
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
    this.props.recipeCategories();
    this.paginateRecipes(1);
  }

  /**
   * @param {Number} page
   *
   * @returns {void} void
   * @memberof AllRecipes
   */
  paginateRecipes(page) {
    this.props.allRecipes(page);
  }


  /**
   * @param {Object} data
   *
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
        {this.props.pagination > 1 ? <Pagination recipesCount={this.props.pagination}
          recipesPagination={this.paginateRecipes}/> :
          ''
        }
      </div>
    );
  }
}

const propTypes = {
  recipes: PropTypes.array.isRequired,
  addRecipe: PropTypes.func.isRequired,
  recipeCategories: PropTypes.func.isRequired,
  allRecipes: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  pagination: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

AllRecipes.propTypes = propTypes;

/**
 * mapStateToProps
 * @export
 * @param {Object} state
 *
 * @returns {Object} object
 */
export const mapStateToProps = (state) => ({
  recipes: state.recipes.allRecipes,
  pagination: Number(state.recipes.pagination),
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

