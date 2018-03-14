import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { allRecipes, recipeCategories, popularRecipes } from '../actions/Recipes';
import RecipeCircle from './recipes/RecipeCircle';


/**
 * @export
 * @class Homepage
 * @extends {Component}
 */
export class Homepage extends Component {

  /**
   * @description - Get Component Data
   *
   * @method componentDidMount
   *
   * @returns {void} void
   * @memberof Homepage
   */
  componentDidMount() {
    this.props.popularRecipes(3);
    this.props.recipeCategories();
    this.props.allRecipes(1, 3);
  }


  /**
   * @description - Render react component
   *
   * @method render
   *
   * @returns {Jsx} Jsx
   * @memberof Homepage
   */
  render() {
    return (
      <div>
        <main>
          <section className="banner">
            <div className="overlay">
              <h3 className="overlay__h3">
              Welcome To Recipes. All About Reciping
              </h3>
            </div>
          </section>

          <section>
            <div className="container">

              <h3 className="title"
                style={{ textAlign: 'center', marginTop: 40, fontSize: 32 }}>
                <Link to="/recipes" className="title__link">Recipes</Link>
              </h3>

              <div className="row">
                {
                  this.props.recipes.map((recipe) =>
                    <RecipeCircle key={recipe.id} recipe={recipe} />)
                }
              </div>

              <h3 style={{ textAlign: 'center', marginTop: 40, fontSize: 32 }}>
                <Link to="#" className="title-link">
                Categories</Link>
              </h3>

              <div className="row">
                {
                  this.props.categories
                    .map((category) =>
                      (<RecipeCircle key={category.id} recipe={category}
                        to={`/categories/${category.name}`} />))
                }
              </div>
              <h3 style={{ textAlign: 'center', marginTop: 40, fontSize: 32 }}>
                <Link to="#" className="title-link">Popular</Link>
              </h3>

              <div className="row">
                {
                  this.props.popularRecipe
                    .map((recipe) => (<RecipeCircle
                      key={recipe.id} recipe={recipe} />))
                }
              </div>

            </div>
          </section>

        </main>
      </div>
    );
  }
}

const propTypes = {
  recipes: PropTypes.array.isRequired,
  recipeCategories: PropTypes.func.isRequired,
  allRecipes: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  popularRecipes: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

Homepage.propTypes = propTypes;

/**
 * mapStateToProps
 * @export
 * @param {Object} state
 *
 * @returns {Object} object
 */
export const mapStateToProps = (state) => ({
  recipes: state.recipes.allRecipes,
  popularRecipe: state.recipes.popularRecipes,
  categories: state.recipes.recipeCategories
});

export default connect(mapStateToProps, {
  allRecipes,
  recipeCategories,
  popularRecipes
})(Homepage);
