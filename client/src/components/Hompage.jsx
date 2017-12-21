import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { allRecipes, recipeCategories, popularRecipes } from '../actions/Recipes';
import RecipeCircle from './recipes/RecipeCircle';


/**
 * @class Homepage
 * @extends Component
 */
class Homepage extends Component {
  /**@returns {void} void
   * @memberof Homepage
   */
  componentDidMount() {
    this.props.popularRecipes(3);
    this.props.recipeCategories();
    this.props.allRecipes(1, 3);
  }


  /**
   *@returns {jsx} jsx
   * @memberof Homepage
   */
  render() {
    return (
      <div>
        <main>
          <section className="banner">
            <div className="overlay">
              <h3 className="overlay__h3"> Welcome To Recipes. All About Reciping</h3>
            </div>
          </section>

          <section>
            <div className="container">

              <h3 className="title" style={{ textAlign: 'center', marginTop: 40, fontSize: 32 }}><Link to="/recipes" className="title__link">Recipes</Link></h3>

              <div className="row">
                {
                  this.props.recipes.map((recipe) => <RecipeCircle key={recipe.id} recipe={recipe} />)
                }
              </div>

              <h3 style={{ textAlign: 'center', marginTop: 40, fontSize: 32 }}><a href="recipes.html" className="title-link">Categories</a></h3>

              <div className="row">
                {
                  this.props.categories.map((recipe) => <RecipeCircle key={recipe.id} recipe={recipe} />)
                }
              </div>
              <h3 style={{ textAlign: 'center', marginTop: 40, fontSize: 32 }}><a href="#" className="title-link">Popular</a></h3>

              <div className="row">
                {
                  this.props.popularRecipe.map((recipe) => <RecipeCircle key={recipe.id} recipe={recipe} />)
                }
              </div>

            </div>
          </section>

        </main>
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
  popularRecipe: state.recipes.popularRecipes,
  categories: state.recipes.recipeCategories
});

export default connect(mapStateToProps, { allRecipes, recipeCategories, popularRecipes })(Homepage);
