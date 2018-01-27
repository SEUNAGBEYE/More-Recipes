import React, { Component } from 'react';
import Loader from 'react-loader';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import checkAuth from '../../../utils/CheckAuth';
import CreateReview from '../recipes/CreateReview';
import Review from '../recipes/Review';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { getRecipe,
  reviewRecipe,
  toggleFavouriteRecipe,
  toggleThumbsDownRecipe,
  toggleThumbsUpRecipe,
  getRecipeReviews,
  editRecipe } from '../../actions/Recipes';
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
        errors: {},
        reviews: [],
        reviewBody: ''
      },
      reviewsLoaded: true,
      loading: true
    };
    this.toggleFavouriteRecipe = this.toggleFavouriteRecipe.bind(this);
    this.toggleThumbsDownRecipe = this.toggleThumbsDownRecipe.bind(this);
    this.toggleThumbsUpRecipe = this.toggleThumbsUpRecipe.bind(this);
    this.viewMoreReviews = this.viewMoreReviews.bind(this);
    this.onChange = this.onChange.bind(this);
    this.reviewRecipe = this.reviewRecipe.bind(this);
  }

  /**
   * @returns {void} void
   * @memberof RecipeDetail
   */
  componentWillMount() {
    this.props.getRecipe(this.props.match.params.id).then(() => {
      this.setState({ loading: false });
    });
  }

  /**
   *
   * @param {obj} event
   * @memberof RecipeDetail
   * @returns {void}
   */
  onChange(event) {
    checkAuth(this.props.isAuthenticated, this.props.history);
    this.setState({
      reviewBody: event.target.value
    });
  }

  /**
   * @param {obj} event
   * @memberof RecipeDetail
   * @returns {void}
   */
  reviewRecipe(event) {
    event.preventDefault();
    const { isAuthenticated, history, recipe } = this.props;
    checkAuth(isAuthenticated, history);
    this.props.reviewRecipe(recipe.id, { reviewBody: this.state.reviewBody });
    document.getElementById('form').reset();
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
    const offset = this.props.recipe.reviews.length;
    this.props.getRecipeReviews(this.props.recipe.id, limit, offset);
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
    if (!this.state.loading) {
      const { recipe, user } = this.props;
      const isFavorited = this.props.myFavs.includes(parseInt(this.props.recipe.id, 10));
      const isUpVoted = recipe.upvotes.includes(parseInt(this.props.user.userId, 10));
      const isDownVoted = recipe.downvotes.includes(parseInt(this.props.user.userId, 10));
      return (
        <div>
          <main style={{ marginTop: 100 }} id="body">

            <div className="container" >
              <h4 style={{ textAlign: 'center' }}>{recipe.name}</h4><br /><br />

              <div className="row">
                <div className="col-md-6">
                  <div className="box">
                    <div className="circle"><img className ="circle" src={recipe.image} /></div>
                  </div>
                  <div className="container text-center">
                    <RecipeCardActions
                      isDownVoted={isDownVoted}
                      isUpVoted={isUpVoted}
                      isFavorited={isFavorited}
                      user={user}
                      recipe={recipe}
                      toggleFavouriteRecipe={this.toggleFavouriteRecipe}
                      toggleThumbsDownRecipe={this.toggleThumbsDownRecipe}
                      toggleThumbsUpRecipe={this.toggleThumbsUpRecipe} style={{ width: '50%', position: 'relative', margin: '0 auto' }}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <h5>Description</h5>
                  {recipe.description}
                </div>
              </div>
              <br />

              <div className="row">

                <div className="col-md-6">
                  <h5>Ingredients</h5>
                  <ul style={{ fontSize: 20 }}>
                    {
                      recipe.ingredients.map((step, index) => <li key={index}>{step}</li>)
                    }
                  </ul>
                </div>

                <div className="col-md-6">
                  <h5>Steps</h5>
                  <ul style={{ fontSize: 20 }}>
                    {
                      recipe.steps.map((step, index) => <li key={index}>{step}</li>)
                    }
                  </ul>
                </div>
              </div>

              <div className="row">

                <div className="col-md-6">
                  <CreateReview history={this.props.history}
                    recipeId={this.state.recipe.id}
                    onChange={this.onChange}
                    reviewBody={this.state.reviewBody}
                    reviewRecipe={this.reviewRecipe}
                  />
                </div>
                <div className="col-md-6" />

              </div><br />

              <div>
                <h6 style={{ color: 'orange', margin: '5 0 10 0', fontSize: 16 }} className="text-center">What People Said</h6>
              </div>
              {recipe.reviews.map(review => <Review key={review.id} review={review}/>)}
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
            <EditModal recipe={recipe} editRecipe={this.props.editRecipe}/>
            <DeleteModal id={recipe.id} onDelete={this.props.onDelete}/>
          </main>
        </div>
      );
    }
    return (<p className="text-center">The recipe is loading ...</p>);
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
  getRecipe,
  toggleFavouriteRecipe,
  toggleThumbsUpRecipe,
  toggleThumbsDownRecipe,
  getRecipeReviews,
  reviewRecipe,
  editRecipe
})(RecipeDetail);

