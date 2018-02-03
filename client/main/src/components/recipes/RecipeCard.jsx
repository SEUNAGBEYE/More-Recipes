import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
 * @class RecipeCard
 * @extends {Component}
 */
class RecipeCard extends Component {
  /**
	 * Creates an instance of RecipeCard.
	 * @param {any} props
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
   * @returns {jsx} JSX
   * @param {any} nextProps
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
   * @returns {jsx} JSX
   * @param {any} event
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
   *@returns {void} void
   * @param {any} event
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
   *
   * @param {any} id
   * @returns {jsx} JSX
   * @memberof RecipeCard
   */
  deleteRecipe(id) {
    this.props.deleteRecipe(id);
  }

  /**
   * @param {any} id
   * @param {any} recipe
   * @returns {void} void
   * @memberof RecipeCard
   */
  editRecipe(id, recipe) {
    this.props.editRecipe(id, recipe);
  }

  /**
   * @param {obj} event
   * @returns {obj} obj
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
   * @returns {jsx} JSX
   * @memberOf RecipeCard
   * return {object} object
   */
  render() {
    const { recipe, myFavs } = this.props;
    const isFavorited = myFavs.includes(parseInt(recipe.id, 10));
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 my-card">
        <Link to={`/recipe/${this.props.id}`}>
          <div className="card recipe-card">
            <img className="card-img-top"
              src={this.state.recipe.image}
              alt="Card image cap"
            />
            <div className="container">
              <div className="card-block">
                <h4 className="card-title">
                  {this.state.recipe.name.slice(0, 20)}
                </h4>
                <p className="card-text">
                  {this.state.recipe.description.slice(0, 80)}
                </p>
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
        </Link>
        <EditModal recipe={this.props.recipe}
          editRecipe={this.editRecipe}
          id={this.props.recipe.id}
        />
        <DeleteModal id={this.props.id} onDelete={this.deleteRecipe}/>
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
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  myFavs: state.auth.isAuthenticated ? state.recipes.userFavouritedRecipeId : []

});

export default connect(mapStateToProps, {
  toggleFavouriteRecipe,
  getFavouritedRecipesIds,
  toggleThumbsUpRecipe,
  toggleThumbsDownRecipe,
  deleteRecipe,
  editRecipe
})(RecipeCard);

