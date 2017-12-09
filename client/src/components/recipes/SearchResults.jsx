import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { getFavouritedRecipesIds, searchRecipes, toggleFavouriteRecipe, addRecipe, getUserRecipes, allRecipes, favouriteRecipe, deleteRecipe, editRecipe} from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Exclamation from './Exclamation';
import RecipeModal from './RecipeModal';



/**
 * @class SearchResults
 * @extends {Component}
 */
class SearchResults extends Component{

	constructor(props){
		super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.toggleFavouriteRecipe = this.toggleFavouriteRecipe.bind(this)
    this.paginateRecipes = this.paginateRecipes.bind(this)

    console.log('props', this.props.location.search)
  }
  

  componentDidMount(){
    this.paginateRecipes(0)

    this.props.getFavouritedRecipesIds()
    .then(res => {
      this.setState({favouritedRecipeIds: [...res.favouritedRecipesIds]})
    })
  }

  paginateRecipes(page){
    this.props.searchRecipes(this.props.location.search, page)
    .then(res => {
      console.log('respose', res)
      this.setState({allRecipes: [...res.allRecipes]})
    });
  }
  

  onSubmit(data){
    this.props.addRecipe(data)
    .then(res => {
      this.setState({allRecipes: [...this.state.allRecipes, res.recipe]})
    })
  }

  deleteRecipe(id){
    this.props.deleteRecipe(id)
    .then(res => {
      this.setState({allRecipes: this.state.allRecipes.filter( recipe => recipe.id !== id) })
    })
  }

	toggleFavouriteRecipe(id){
		toggleFavouriteRecipe(id)
		.then(res => {
      this.setState({favouritedRecipesIds: [...res.data.favouritedRecipesId]})
    })
  }
  
  

  editRecipe(id, recipe){
    this.props.editRecipe(id, recipe)
    .then(res => {
      this.setState({allRecipes: [...this.state.allRecipes.filter( recipe => recipe.id === id)] })
    })
  }


  /**
   * @memberOf UserRecipes
   * return {object}
   */
  render(){
    return(
      <div>
        <Navbar />
        <main style={{marginTop: 40}}>

          <div className="container">
            <div className="dropdown" style={{float: 'left'}}>
              <button className="btn btn-default dropdown-toggle auth-button" type="button" id="about-us" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category
              </button>
              <div className="dropdown-menu" aria-labelledby="about-us">
                <Link className="dropdown-item" to="recipes.html">Dessert</Link>
                <Link className="dropdown-item" to="my_recipes.html">Pasta</Link>
                <Link className="dropdown-item" to="favourite_recipe.html">Fries</Link>
                <Link className="dropdown-item" to="#">Chinese</Link>
                <Link className="dropdown-item" to="index.html">Africa</Link>
              </div>
            </div>
          </div>
          
          <div className="container">
            <div style={{textAlign: 'center', marginTop: 100}}>
              <h4 className='container__myrecipes'>Search Results</h4><br /><br />
              <RecipeModal addRecipe={this.onSubmit}/>
            </div>

            <div className='row'>
              {
                this.props.recipes.length > 0
                ?
                this.props.recipes.map((elem, index) => {
                return (<RecipeCard key={elem.id} 
                user={this.props.user}
                recipe={elem}
                id={elem.id} 
                onDelete={this.deleteRecipe} 
                editRecipe={this.editRecipe} 
                toggleFavouriteRecipe={this.toggleFavouriteRecipe}
                />)
                })
                :
                <Exclamation>
                  <p className='text-muted text-center'>Sorry no results, try searching something else</p>
                </Exclamation>
              }
            </div>
          </div>
        </main>
        <Pagination recipesCount={this.props.recipesCount} recipesPagination={this.paginateRecipes}/>
        <Footer />
      </div>
    )
  }
}

/**
 * mapStateToProps
 * @param {any} state
 * @returns {object} object
 */
const mapStateToProps = (state, props) => {
  return {
    recipes: state.recipes.allRecipes,
    recipesCount: state.recipes.recipesCount,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, {getFavouritedRecipesIds, searchRecipes, toggleFavouriteRecipe, allRecipes, addRecipe, getUserRecipes, deleteRecipe, editRecipe })(SearchResults);

