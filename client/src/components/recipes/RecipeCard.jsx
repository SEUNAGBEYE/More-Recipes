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
  toggleFavouriteRecipe
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

    this.state = {
      recipe: {
        name: '',
        description: '',
        upvotes: [],
        downvotes: []
      },
      isDownVoted: '',
      isUpVoted: '',
      favouritedRecipeIds: []
    };
  }

  /**
	 * @returns {void} void
	 * @memberof RecipeCard
	 */
  componentDidMount() {
    this.setState({
      recipe: this.props.recipe,
      isUpVoted: this.props.recipe.upvotes.includes(parseInt(this.props.user.userId, 10)),
      isDownVoted: this.props.recipe.downvotes.includes(parseInt(this.props.user.userId, 10))
    });
  }

  /**
   * @returns {jsx} JSX
   * @param {any} nextProps
   * @memberof RecipeCard
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.recipe !== nextProps.recipe) {
      this.setState({
        recipe: nextProps.recipe,
        isUpVoted: nextProps.recipe.upvotes.includes(parseInt(this.props.user.userId, 10)),
        isDownVoted: nextProps.recipe.downvotes.includes(parseInt(this.props.user.userId, 10))
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
    checkAuth(this.props.user, this.props.history);
    this.props.toggleFavouriteRecipe(parseInt(event.target.id, 10));
  }

  /**
   *@returns {void} void
   * @param {any} event
   * @memberof RecipeCard
   */
  toggleThumbsUpRecipe(event) {
    event.preventDefault();
    checkAuth(this.props.user, this.props.history);
    this.props.toggleThumbsUpRecipe(event.target.id);
    this.setState({ toggleThumbsUp: !this.state.toggleThumbsUp });
  }

  /**
   * @returns {jsx} jsx
   * @param {any} event
   * @memberof RecipeCard
   */
  toggleThumbsDownRecipe(event) {
    event.preventDefault();
    checkAuth(this.props.user, this.props.history);
    this.props.toggleThumbsDownRecipe(event.target.id);
    this.setState({ toggleThumbsDown: !this.state.toggleThumbsDown });
  }


  /**
   * @returns {jsx} jsx
   * @memberOf RecipeCard
   * return {object} object
   */
  render() {
    const isFavorited = this.props.myFavs.includes(parseInt(this.props.recipe.id, 10));
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 my-card">
        <Link to={`/recipe/${this.props.id}`}>
          <div className="card recipe-card">
            <img className="card-img-top" src={this.state.recipe.image} alt="Card image cap" />
            <div className="container">
              <div className="card-block">
                <h4 className="card-title">{this.state.recipe.name.slice(0, 20)}</h4>
                <p className="card-text">{this.state.recipe.description.slice(0, 90) || "Some quick example text to build on the card title and make up the bulk of the card's content."}</p>
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
        <EditModal recipe={this.props.recipe} editRecipe={this.props.editRecipe} id={this.props.recipe.id}/>
        <DeleteModal id={this.props.id} onDelete={this.props.onDelete}/>
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
  myFavs: state.recipes.userFavouritedRecipeId || [],

});

export default connect(mapStateToProps, {
  toggleFavouriteRecipe, getFavouritedRecipesIds, toggleThumbsUpRecipe, toggleThumbsDownRecipe
})(RecipeCard);

