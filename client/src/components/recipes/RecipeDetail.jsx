import React, { Component } from 'react';
import Loader from 'react-loader';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import checkAuth from '../../../utils/CheckAuth';
import CreateReview from '../recipes/CreateReview';
import Review from '../recipes/Review';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { getRecipe, toggleThumbsDownRecipe, toggleThumbsUpRecipe, getRecipeReviews } from '../../actions/Recipes';
import RecipeCardActions from '../recipes/RecipeCardActions';


/**
 * @class RecipeDetail
 * @extends {Component}
 */
class RecipeDetail extends Component {
  /**
   * Creates an instance of RecipeDetail.
   * @param {any} props
   * @memberof RecipeDetail
   */
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        name: '',
        description: '',
        image: '',
        ingredients: [],
        steps: [],
        errors: {},
        categoryId: '',
        downvotes: [],
        upvotes: [],
        userRecipes: [],
        reviews: []
      },
      isDownVoted: '',
      isUpVoted: '',
      favouritedRecipeIds: [],
      reviewsLoaded: true
    };
    this.toggleFavouriteRecipe = this.toggleFavouriteRecipe.bind(this);
    this.toggleThumbsDownRecipe = this.toggleThumbsDownRecipe.bind(this);
    this.toggleThumbsUpRecipe = this.toggleThumbsUpRecipe.bind(this);
    this.viewMoreReviews = this.viewMoreReviews.bind(this);
  }

  /**
   * @returns {void} void
   * @memberof RecipeDetail
   */
  componentDidMount() {
    this.props.getRecipe(this.props.match.params.id)
      .then(res => {
        this.setState({
          recipe: this.props.recipe,
          isUpVoted: this.props.recipe.upvotes.includes(parseInt(this.props.user.userId, 10)),
          isDownVoted: this.props.recipe.downvotes.includes(parseInt(this.props.user.userId, 10))
        });
      });
  }


  /**
   * @returns {void} void
   * @param {any} nextProps
   * @memberof RecipeDetail
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
   * @returns {obj} obj
   * @param {any} event
   * @memberof RecipeDetail
   */
  toggleFavouriteRecipe(event) {
    event.preventDefault();
    if (this.props.isAuthenticated) {
      this.props.toggleFavouriteRecipe(parseInt(event.target.id, 10));
    }
    checkAuth(this.props.isAuthenticated, this.props.history);
  }

  /**
   *@returns {void} void
   * @param {any} event
   * @memberof RecipeDetail
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
   * @returns {jsx} jsx
   * @param {any} event
   * @memberof RecipeDetail
   */
  toggleThumbsDownRecipe(event) {
    event.preventDefault();
    event.preventDefault();
    if (this.props.isAuthenticated) {
      this.props.toggleThumbsDownRecipe(event.target.id);
      this.setState({ toggleThumbsUp: !this.state.toggleThumbsUp });
    }
    checkAuth(this.props.isAuthenticated, this.props.history);
  }


  /**
   * @param {any} event
   * @returns {void} void
   * @memberof RecipeDetail
   *
   */
  viewMoreReviews(event) {
    event.preventDefault();
    this.setState({
      reviewsLoaded: false
    });
    const limit = 5;
    const offset = this.state.recipe.reviews.length;
    this.props.getRecipeReviews(this.state.recipe.id, limit, offset);
    this.setState({
      reviewsLoaded: true
    });
  }

  /**
   * @returns {jsx} JSX
   * @memberOf RecipeDetail
   * return {object} object
   */
  render() {
    const isFavorited = this.props.myFavs.includes(parseInt(this.props.recipe.id, 10));
    const { recipe } = this.state;
    return (
      <div>
        <main style={{ marginTop: 100 }} id="body">

          <div className="container" >
            <h4 style={{ textAlign: 'center' }}>{recipe.name}</h4><br /><br />

            <div className="row">
              <div className="col-md-6">
                <div className="box">
                  <div className="circle"><img className ="circle" src={this.state.recipe.image} /></div>
                </div>
                <div className="container text-center">
                  <RecipeCardActions
                    isDownVoted={this.state.isDownVoted}
                    isUpVoted={this.state.isUpVoted}
                    isFavorited={isFavorited}
                    user={this.props.user}
                    recipe={this.state.recipe}
                    toggleFavouriteRecipe={this.toggleFavouriteRecipe}
                    toggleThumbsDownRecipe={this.toggleThumbsDownRecipe}
                    toggleThumbsUpRecipe={this.toggleThumbsUpRecipe} style={{ width: '50%', position: 'relative', margin: '0 auto' }}/>
                </div>
              </div>
              <div className="col-md-6">
                <h5>Description</h5>
                {this.state.recipe.description}
              </div>
            </div>
            <br />

            <div className="row">

              <div className="col-md-6">
                <h5>Ingredients</h5>
                <ul style={{ fontSize: 20 }}>
                  {
                    this.state.recipe.ingredients.map((step, index) => <li key={index}>{step}</li>)
                  }
                </ul>
              </div>

              <div className="col-md-6">
                <h5>Steps</h5>
                <ul style={{ fontSize: 20 }}>
                  {
                    this.state.recipe.steps.map((step, index) => <li key={index}>{step}</li>)
                  }
                </ul>
              </div>
            </div>

            <div className="row">

              <div className="col-md-6"> <CreateReview history={this.props.history} recipeId={this.state.recipe.id}/></div>
              <div className="col-md-6" />

            </div><br />

            <div>
              <h6 style={{ color: 'orange', margin: '5 0 10 0', fontSize: 16 }} className="text-center">What People Said</h6>
            </div>
            {this.state.recipe.reviews.map(review => <Review key={review.id} review={review}/>)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}><button className="auth-button" onClick={this.viewMoreReviews}>View More</button>
            <Link to="/" onClick={(event => {
              event.preventDefault();
              $('html, body').animate({
                scrollTop: $("#body").offset().top
              }, 1000);
            })}>Go Up</Link>
          </div>
          <Loader loaded={this.state.reviewsLoaded}/>
          <EditModal recipe={this.state.recipe} editRecipe={this.props.editRecipe}/>
          <DeleteModal id={this.state.recipe.id} onDelete={this.props.onDelete}/>
        </main>
      </div>
    );
  }
}

/**
 * mapStateToProps
 * @param {any} state
 * @param {any} props
 * @return {object} object
 */
const mapStateToProps = (state, props) => ({
  user: state.auth.user,
  recipe: state.recipes.singleRecipe,
  isAuthenticated: state.auth.isAuthenticated,
  myFavs: state.recipes.userFavouritedRecipeId || [],
});

export default connect(mapStateToProps, {
  getRecipe, toggleThumbsUpRecipe, toggleThumbsDownRecipe, getRecipeReviews
})(RecipeDetail);

