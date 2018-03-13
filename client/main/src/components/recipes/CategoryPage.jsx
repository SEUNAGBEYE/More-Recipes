import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import { recipeCategories } from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Exclamation from './Exclamation';
import CategoryButton from './CategoryButton';


/**
 * @class CategoryPage
 * @extends {Component}
 */
export class CategoryPage extends Component {
  /**
   * @description - Creates an instance of AllRecipes.
   *
   * @method contructor
   *
   * @param {any} props
   *
   * @returns {void} void
   * @memberof AllRecipes
   */
  constructor(props) {
    super(props);
    this.paginateRecipes = this.paginateRecipes.bind(this);
    this.state = {
      loaded: false
    };
  }

  /**
   * @description - Get component data
   *
   * @method componentDidMount
   *
   * @returns {void} void
   * @memberof CategoryPage
   */
  componentDidMount() {
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
   * @memberof CategoryPage
   */
  async paginateRecipes(page) {
    await this.props.recipeCategories();
    this.setState({ loaded: true });
  }

  /**
   * @description - Renders react component
   *
   * @returns {Jsx} Jsx
   * @memberof CategoryPage
   */
  render() {
    return (
      <div>
        { this.state.loaded ?
          <main style={{ marginTop: 40 }}>
            <div className="container">
              <CategoryButton />
            </div>

            <div className="container">
              <div style={{ textAlign: 'center', marginTop: 100 }}>
                <h4 className="container__myrecipes">
                  {this.props.category.name}
                </h4><br /><br />
              </div>

              <div className="row">
                {
                  this.props.category.recipes.length > 0 ?
                    this.props.category.recipes.map((elem, index) => (
                      <RecipeCard key={elem.id}
                        recipe={elem}
                        id={elem.id}
                        history={this.props.history}
                      />)) :
                    <Exclamation>
                      <p className="text-muted text-center">
                        {
                          `Sorry no recipe has been added to 
                        ${this.props.category.name} 
                       yet, please add to get started`
                        }
                      </p>
                    </Exclamation>
                }
              </div>
            </div>
            { this.props.pagination > 1 ?
              <Pagination recipesCount={this.props.pagination}
                recipesPagination={this.paginateRecipes}
              /> : ''
            }
          </main> :
          <Loader loaded={this.state.loaded}/> }
      </div>
    );
  }
}

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
  isAuthenticated: state.auth.isAuthenticated,
  category: state.recipes.recipeCategories
    .find(recipeCategory => (
      recipeCategory.name === props.match.params.categoryName
    )) || {}
});

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  recipes: PropTypes.array.isRequired,
  category: PropTypes.object.isRequired,
  recipeCategories: PropTypes.func.isRequired,
  pagination: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired

};

CategoryPage.propTypes = propTypes;

export default connect(mapStateToProps, { recipeCategories })(CategoryPage);

