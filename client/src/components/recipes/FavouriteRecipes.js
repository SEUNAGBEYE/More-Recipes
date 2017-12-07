import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { getFavouritedRecipes, getFavouritedRecipesIds, toggleFavouriteRecipe, addRecipe, getUserRecipes, allRecipes, favouriteRecipe, deleteRecipe, editRecipe} from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Exclamation from './Exclamation';
import RecipeModal from './RecipeModal';



/**
 * @class UserRecipes
 */
class FavoruriteRecipes extends Component{

	constructor(props){
		super(props);
		this.state = {
			name: '',
			description: '',
			image: 'hello image',
			ingredients: [],
			steps: [],
      errors: {},
      categoryId: '',
      downvotes: [],
      upvotes:[],
      favouritedRecipes: [],
      favouritedRecipesIds: []
		}
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.toggleFavouriteRecipe = this.toggleFavouriteRecipe.bind(this)
    this.paginateRecipes = this.paginateRecipes.bind(this)
  }
  

    componentDidMount(){
      this.paginateRecipes(0)
    }
  
    paginateRecipes(page){
      this.props.getFavouritedRecipes(page)
      .then(res => {
        this.setState({favouritedRecipes: [...res.favouriteRecipes]})
      })
      
      this.props.getFavouritedRecipesIds()

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
              <h4 className='container__myrecipes'>Favourite Recipes</h4><br /><br />
              <RecipeModal addRecipe={this.onSubmit}/>
            </div>

            <div className='row'>
              {
                this.state.favouritedRecipes.length > 0
                ?
                this.props.favouritedRecipes.map((elem, index) => {
                return (<RecipeCard key={index} 
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
                  <p className='text-muted text-center'>Sorry you have not favourited any recipe yet!</p>
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
const mapStateToProps = (state) => {
  return {
    recipesCount: state.recipes.recipesCount,
    favouritedRecipes: state.recipes.favouriteRecipes
  };
}

export default connect(mapStateToProps, { getFavouritedRecipes, getFavouritedRecipesIds, toggleFavouriteRecipe, allRecipes, addRecipe, getUserRecipes, deleteRecipe, editRecipe })(FavoruriteRecipes);

