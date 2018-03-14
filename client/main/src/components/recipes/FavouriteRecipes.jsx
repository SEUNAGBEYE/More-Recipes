import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFavouritedRecipes } from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Exclamation from './Exclamation';
import CategoryButton from './CategoryButton';


/**
 * @description - Favourite Recipe Component
 * @export - FavouriteRecipes
 * @class FavouriteRecipes
 * @extends {Component}
 */
export class FavouriteRecipes extends Component {
  /**
   * @description - Creates an instance of FavoruriteRecipes.
   *
   * @method constructor
   *
   * @param {Object} props
   *
   * @returns {void} void
   * @memberof FavouriteRecipes
   */
  constructor(props) {
    super(props);
    this.state = {
      favouritedRecipes: []
    };
    this.paginateRecipes = this.paginateRecipes.bind(this);
  }

  /**
   * @description - Fetch Component Data
   *
   * @method componentDidMount
   *
   * @returns {void} void
   * @memberof FavouriteRecipes
   */
  componentDidMount() {
    this.paginateRecipes(1);
  }

  /**
   * @description - Paginate Recipes
   *
   * @method paginateRecipe
   *
   * @param {Number} page
   *
   * @returns {void} void
   * @memberof FavouriteRecipes
   */
  paginateRecipes(page) {
    this.props.getFavouritedRecipes(page)
      .then(res => {
        this.setState({ favouritedRecipes: [...res.favouriteRecipes] });
      });
  }

  /**
   * @description - Renders react component
   *
   * @method render
   *
   * @returns {Jsx} Jsx
   * @memberof FavouriteRecipes
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
              <h4 className="container__myrecipes">Favourite Recipes</h4>
              <br /><br />
            </div>

            <div className="row">
              {
                this.state.favouritedRecipes.length > 0 ?
                  this.props
                    .favouritedRecipes.map((elem, index) => (<RecipeCard
                      key={elem.id}
                      recipe={elem}
                      history={this.props.history}
                      id={elem.id}
                    />)) :
                  <Exclamation>
                    <p className="text-muted text-center">
                      Sorry you have not favourited any recipe yet!
                    </p>
                  </Exclamation>
              }
            </div>
          </div>
        </main>
        {this.props.pagination > 1 ?
          <Pagination recipesCount={this.props.pagination}
            recipesPagination={this.paginateRecipes}/> :
          ''
        }
      </div>
    );
  }
}

const propTypes = {
  pagination: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  favouritedRecipes: PropTypes.array.isRequired,
  getFavouritedRecipes: PropTypes.func.isRequired,
};

FavouriteRecipes.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state
 *
 * @returns {Object} Object
 */
const mapStateToProps = (state) => ({
  pagination: state.recipes.pagination,
  favouritedRecipes: state.recipes.favouriteRecipes,
});

export default connect(mapStateToProps, {
  getFavouritedRecipes
})(FavouriteRecipes);

