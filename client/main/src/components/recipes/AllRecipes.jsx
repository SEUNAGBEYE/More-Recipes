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
import CategoryButton from './CategoryButton';
import SortButton from './SortButton';

/**
 * @export
 * @class AllRecipes
 * @extends {Component}
 */
export class AllRecipes extends Component {
  /**
   * @deprecated - Creates an instance of AllRecipes.
   *
   * @method contructor
   *
   * @param {Object} props
   *
   * @returns {void} void
   * @memberof AllRecipes
   */
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.paginateRecipes = this.paginateRecipes.bind(this);
  }


  /**
   * @description - Get component data
   *
   * @method componentDidMount
   *
   * @returns {void} void
   * @memberof AllRecipes
   */
  componentDidMount() {
    this.props.recipeCategories();
    this.paginateRecipes(1);
  }

  /**
   * @description - Get all recipes
   *
   * @method paginateRecipe
   *
   * @param {Number} page
   *
   * @returns {void} void
   * @memberof AllRecipes
   */
  paginateRecipes(page) {
    if (typeof page === 'object') {
      const event = page;
      event.preventDefault();
      const limit = 10;
      const { sort, order } = event.target.dataset;
      this.props.allRecipes(1, limit, sort, order);
    } else {
      this.props.allRecipes(page);
    }
  }

  /**
   * @description - Submit add recipe data
   *
   * @method onSubmit
   *
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
   * @description - Renders react component
   *
   * @method render
   *
   * @memberof AllRecipes
   * @returns {Jsx} Jsx
   */
  render() {
    return (
      <div>
        <main style={{ marginTop: 40 }}>

          <div className="container">
            <CategoryButton/>
            <SortButton sortRecipes={this.paginateRecipes}/>
          </div>

          <div className="container">
            <div style={{ textAlign: 'center', marginTop: 100 }}>
              <h4 className="container__myrecipes">All Recipes</h4><br /><br />
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
        {this.props.pagination > 1 ?
          <Pagination
            recipesCount={this.props.pagination}
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

