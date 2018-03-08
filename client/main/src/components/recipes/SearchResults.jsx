import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFavouritedRecipesIds,
  searchRecipes,
} from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Exclamation from './Exclamation';
import CategoryButton from './CategoryButton';


/**
 * @description - Search Results Component
 *
 * @export
 * @class SearchResults
 * @extends {Component}
 */
export class SearchResults extends Component {
  /**
   * Creates an instance of SearchResults.
   * @param {Object} props
   * @memberof SearchResults
   */
  constructor(props) {
    super(props);
    this.searchRecipes = this.searchRecipes.bind(this);
  }
  /**
   *
   *@returns {void} void
   * @memberof SearchResults
   */
  componentWillMount() {
    this.props.getFavouritedRecipesIds()
      .then(res => {
        this.setState({ favouritedRecipeIds: [...res.favouritedRecipesIds] });
      });
    this.searchRecipes();
  }

  /**
   * @param {Number} page
   *
   * @returns {void} void
   * @memberof SearchResults
   */
  searchRecipes(page) {
    const search = this.props.location.search.split('=');
    this.props.searchRecipes(search[1], page);
  }

  /**
   * @returns {Jsx} Jsx
   * @memberof UserRecipes
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
                      recipe={elem}
                      id={elem.id}
                      history={this.props.history}
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
  recipes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pagination: PropTypes.number.isRequired,
  getFavouritedRecipesIds: PropTypes.func.isRequired,
  searchRecipes: PropTypes.func.isRequired,
};

SearchResults.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state
 * @param {Object} props
 *
 * @returns {Object} object
 */
export const mapStateToProps = (state, props) => ({
  recipes: state.recipes.allRecipes,
  pagination: Number(state.recipes.pagination),
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getFavouritedRecipesIds,
  searchRecipes
})(SearchResults);

