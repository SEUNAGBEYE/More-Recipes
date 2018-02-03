import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFavouritedRecipes } from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Exclamation from './Exclamation';
import CategoryButton from './CategoryButton';


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
      favouritedRecipes: []
    };
    this.paginateRecipes = this.paginateRecipes.bind(this);
  }

  /**
 *@returns {void} void
 * @memberof FavoruriteRecipes
 */
  componentDidMount() {
    this.paginateRecipes(1);
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
              <h4 className="container__myrecipes">Favourite Recipes</h4><br /><br />
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
  recipesCount: state.recipes.pagination,
  favouritedRecipes: state.recipes.favouriteRecipes,
});

export default connect(mapStateToProps, {
  getFavouritedRecipes
})(FavoruriteRecipes);

