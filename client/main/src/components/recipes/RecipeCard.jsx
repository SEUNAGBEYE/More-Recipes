import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import checkAuth from '../../../utils/CheckAuth';
import RecipeCardActions from '../recipes/RecipeCardActions';

import {
  toggleThumbsDownRecipe,
  toggleThumbsUpRecipe,
  getFavouritedRecipesIds,
  toggleFavouriteRecipe,
  deleteRecipe,
  editRecipe
}
  from '../../actions/Recipes';


/**
 * @export
 * @class RecipeCard
 * @extends {Component}
 */
export class RecipeCard extends Component {
  /**
   * Creates an instance of RecipeCard.
   * @param {Object} props
   * @memberof RecipeCard
   */
  constructor(props) {
    super(props);
    this.toggleFavouriteRecipe = this.toggleFavouriteRecipe.bind(this);
    this.toggleThumbsDownRecipe = this.toggleThumbsDownRecipe.bind(this);
    this.toggleThumbsUpRecipe = this.toggleThumbsUpRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);

    this.state = {
      recipe: {
        name: '',
        description: '',
        upvotes: [],
        downvotes: []
      },
      isDownVoted: '',
      isUpVoted: ''
    };
  }

  /**
   * @returns {void} void
   * @memberof RecipeCard
   */
  componentWillMount() {
    const { recipe, user } = this.props;
    this.setState({
      recipe,
      isUpVoted: recipe.upvotes.includes(parseInt(user.userId, 10)),
      isDownVoted: recipe.downvotes.includes(parseInt(user.userId, 10))
    });
  }

  /**
   * @param {Object} nextProps
   *
   * @returns {void} void
   * @memberof RecipeCard
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.recipe !== nextProps.recipe) {
      const { recipe } = nextProps;
      const { user } = this.props;
      this.setState({
        recipe,
        isUpVoted: recipe.upvotes.includes(parseInt(user.userId, 10)),
        isDownVoted: recipe.downvotes.includes(parseInt(user.userId, 10))
      });
    }
  }

  /**
   * @param {Object} event
   *
   * @returns {void} void
   * @memberof RecipeCard
   */
  toggleFavouriteRecipe(event) {
    event.preventDefault();
    const { isAuthenticated, history } = this.props;
    if (isAuthenticated) {
      this.props.toggleFavouriteRecipe(parseInt(event.target.id, 10));
    }
    checkAuth(isAuthenticated, history);
  }

  /**
   * @param {any} event
   *
   * @returns {void} void
   * @memberof RecipeCard
   */
  toggleThumbsUpRecipe(event) {
    event.preventDefault();
    if (this.props.isAuthenticated) {
      this.props.toggleThumbsUpRecipe(event.target.id);
      this.setState({ toggleThumbsUp: !this.state.toggleThumbsUp });
    }
    checkAuth(this.props.isAuthenticated, this.props.history);
  }

  /**
   * @param {Object} event
   *
   * @returns {void} void
   * @memberof RecipeCard
   */
  deleteRecipe(event) {
    const { id } = event.target;
    this.props.deleteRecipe(id);
  }

  /**
   * @param {Number} id
   * @param {Object} recipe
   *
   * @returns {void} void
   * @memberof RecipeCard
   */
  editRecipe(id, recipe) {
    return this.props.editRecipe(id, recipe);
  }

  /**
   * @param {Object} event
   *
   * @returns {Object} object
   * @memberof RecipeCard
   */
  toggleThumbsDownRecipe(event) {
    event.preventDefault();
    if (this.props.isAuthenticated) {
      this.props.toggleThumbsDownRecipe(event.target.id);
      this.setState({ toggleThumbsUp: !this.state.toggleThumbsUp });
    }
    checkAuth(this.props.isAuthenticated, this.props.history);
  }


  /**
   * @returns {JSX} jsx
   * @memberof RecipeCard
   */
  render() {
    const { recipe, myFavouriteRecipes } = this.props;
    const isFavorited = myFavouriteRecipes.includes(parseInt(recipe.id, 10));
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 my-card">
        <div className="card recipe-card">
          <img className="card-img-top"
            src={this.state.recipe.image}
            alt="Card image cap"
          />
          <div className="container">
            <div className="card-block">
              <Link to={`/recipe/${this.props.id}`}
                data-recipe-card-id={`recipe${this.props.id}`}
              >
                <h4 className="card-title break-word">
                  {this.state.recipe.name.slice(0, 15)}
                </h4>
                <p className="card-text break-word">
                  {this.state.recipe.description.slice(0, 80)}
                </p>
              </Link>
              <RecipeCardActions
                isDownVoted={this.state.isDownVoted}
                isUpVoted={this.state.isUpVoted}
                isFavorited={isFavorited}
                user={this.props.user}
                recipe={this.props.recipe}
                toggleFavouriteRecipe={this.toggleFavouriteRecipe}
                toggleThumbsDownRecipe={this.toggleThumbsDownRecipe}
                toggleThumbsUpRecipe={this.toggleThumbsUpRecipe}/>
            </div>
          </div>
        </div>
        <EditModal recipe={this.props.recipe}
          editRecipe={this.editRecipe}
          id={this.props.recipe.id}
        />
        <DeleteModal id={this.props.id} onDelete={this.deleteRecipe}/>
      </div>
    );
  }
}

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object,
  recipe: PropTypes.object.isRequired,
  myFavouriteRecipes: PropTypes.array.isRequired,
  toggleFavouriteRecipe: PropTypes.func.isRequired,
  getFavouritedRecipesIds: PropTypes.func.isRequired,
  toggleThumbsDownRecipe: PropTypes.func.isRequired,
  toggleThumbsUpRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  editRecipe: PropTypes.func.isRequired,
};

RecipeCard.propTypes = propTypes;

/**
 * mapStateToProps
 * @export
 * @param {Object} state
 *
 * @returns {object} object
 */
export const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  myFavouriteRecipes: state.auth.isAuthenticated ? state.recipes.userFavouritedRecipeId : []

});

export default connect(mapStateToProps, {
  toggleFavouriteRecipe,
  getFavouritedRecipesIds,
  toggleThumbsUpRecipe,
  toggleThumbsDownRecipe,
  deleteRecipe,
  editRecipe
})(RecipeCard);

