import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { getRecipe, toggleThumbsDownRecipe, toggleThumbsUpRecipe } from '../../actions/Recipes';

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
        userRecipes: []
      }
    };
    this.toggleThumbsDownRecipe = this.toggleThumbsDownRecipe.bind(this);
    this.toggleThumbsUpRecipe = this.toggleThumbsUpRecipe.bind(this);
  }

  /**
   * @returns {void} void
   * @memberof RecipeDetail
   */
  componentDidMount() {
    this.props.getRecipe(this.props.match.params.id)
      .then(res => {
        this.setState({
          recipe: res.recipe,
          isUpVoted: res.recipe.upvotes.includes(parseInt(this.props.user.userId, 10)),
          isDownVoted: res.recipe.downvotes.includes(parseInt(this.props.user.userId, 10))
        });
      });
  }

  /**
   * @returns {jsx} JSX
   * @param {any} event
   * @memberof RecipeCard
   */
  toggleFavouriteRecipe(event) {
    event.preventDefault();
    this.props.toggleFavouriteRecipe(parseInt(event.target.id, 10));
  }

  /**
   *@returns {void} void
   * @param {any} event
   * @memberof RecipeCard
   */
  toggleThumbsUpRecipe(event) {
    console.log('he;llloooo');
    event.preventDefault();
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
    this.props.toggleThumbsDownRecipe(event.target.id);
    this.setState({ toggleThumbsDown: !this.state.toggleThumbsDown });
  }

  /**
   * @returns {jsx} JSX
   * @memberOf RecipeDetail
   * return {object} object
   */
  render() {
    return (
      <div>
        <Navbar />
        <main style={{ marginTop: 40 }}>

          <ul className="breadcrumb" style={{ backgroundColor: '#f8f9fa', marginTop: 10 }}>
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item"><a href="category.html">Category</a></li>
            <li className="breadcrumb-item active">Dessert</li>
          </ul>

          <div className="container">
            <h4 style={{ textAlign: 'center', marginTop: 50 }}>{this.state.recipe.name || 'Pasta'}</h4><br /><br />

            <div>
              <div className="box">
                <div className="circle"><img className ="circle" src={this.state.recipe.image} /></div>
              </div>
              <div className="text-center">
                <a href="" className="fa fa-star icons" />
                <a href="" className="fa fa-star icons" />
                <a href="#" className="fa fa-star icons" />
                <a href="#" className="fa fa-star icons" />
              </div>
            </div>
            <br />
            <div className="container-fluid">
              <a href="" className="fa fa-eye icons">1000</a>
              <Link to="/"><i className={classnames("fa icons", {
                'fa-thumbs-o-down text-black': !this.state.isDownVoted,
                'fa-thumbs-down text-warning': this.state.isDownVoted
              })}
              onClick={this.toggleThumbsDownRecipe} id={this.state.recipe.id} >{this.state.recipe.downvotes ? this.state.recipe.downvotes.length : 0}</i></Link>

              <Link to="/"><i className={classnames("fa icons", {
                'fa-thumbs-o-up text-black': !this.state.isUpVoted,
                'fa-thumbs-up text-warning': this.state.isUpVoted
              })}
              onClick={this.toggleThumbsUpRecipe} id={this.state.recipe.id} >{this.state.recipe.upvotes ? this.state.recipe.upvotes.length : 0}</i></Link>
            </div>

            <div className="jumbotron" style={{ backgroundColor: '#f8f9fa' }}>
              <h5>Description</h5>
              {this.state.recipe.description}
            </div>

            <div className="jumbotron" style={{ backgroundColor: '#f8f9fa' }}>
              <h5>Ingredients</h5>
              <ul style={{ fontSize: 20 }}>
                {
                  this.state.recipe.ingredients.map((step, index) => <li key={index}>{step}</li>)
                }
              </ul>
            </div>

            <div className="jumbotron" style={{ backgroundColor: '#f8f9fa' }}>
              <h5>Steps</h5>
              <ul style={{ fontSize: 20 }}>
                {
                  this.state.recipe.steps.map((step, index) => <li key={index}>{step}</li>)
                }
              </ul>
            </div>

            <div className="row">

              <div className="col-md-6">

                <form className="form-group">

                  <textarea rows="5" cols="20" className="form-control" placeholder="Write reviews here" />
                  <button className="btn-default auth-button" style={{ margin: 10, float: 'left' }}> Submit</button>
                </form>

              </div>
              <div className="col-md-6" />

            </div><br />

            <div>
              <h6 style={{ color: 'orange', margin: '5 0 10 0', fontSize: 16 }} className="text-center">What People Said</h6>
            </div>

            <div className="row" style={{ marginBottom: 15 }}>

              <div className="" style={{ backgroundColor: '#f8f9fa', border: '1 solid #f8f9fa' }}>

                <div className="col-md-1 review" style={{ paddingTop: 10 }}>
                  <img style={{ width: 30, height: 30, borderRadius: 80 }} />
                </div>

                <div className="col-md-11 review">
                  <h5 style={{ color: 'orange', marginTop: 5 }}>Joe</h5>

                  Do you have a recipe for an eggless homemade pasta? I have a vegan daughter and would like to make some homemade pasta. I have tried a plain flour and water recipe, but did not like the texture and it cooked up too soft. Thanks Vicki DiFederico
                </div>
              </div>
            </div>

            <div className="row">

              <div className="" style={{ backgroundColor: '#f8f9fa', border: '1 solid #f8f9fa' }}>

                <div className="col-md-1 review" style={{ paddingTop: 10 }}>
                  <img style={{ width: 30, height: 30, borderRadius: 80 }} />
                </div>
                <div className="col-md-11 review">
                  <h5 style={{ color: 'orange', marginTop: 5 }}>Joe</h5>

                  Do you have a recipe for an eggless homemade pasta? I have a vegan daughter and would like to make some homemade pasta. I have tried a plain flour and water recipe, but did not like the texture and it cooked up too soft. Thanks Vicki DiFederico
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer style={{ marginTop: 50 }}/>
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
  recipe: state.recipes.allRecipes[0]
});

export default connect(mapStateToProps, { getRecipe, toggleThumbsUpRecipe, toggleThumbsDownRecipe })(RecipeDetail);

