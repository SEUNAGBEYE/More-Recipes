import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { getFavouritedRecipes, getFavouritedRecipesIds, makeFavouriteRecipe, addRecipe, getUserRecipes, allRecipes, favouriteRecipe, deleteRecipe, editRecipe} from '../../actions/Recipes';
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
    this.makeFavouriteRecipe = this.makeFavouriteRecipe.bind(this)
    this.paginateRecipes = this.paginateRecipes.bind(this)
  }
  

  // componentDidMount(){
  //   this.props.getFavouritedRecipes()
  //   .then(res => {
  //     console.log(res)
  //     this.setState({favouritedRecipes: [...this.state.favouritedRecipes, ...res.favouriteRecipes]})
  //   })
  // }

    componentDidMount(){
      this.paginateRecipes(0)
    }
  
    paginateRecipes(page){
      this.props.getFavouritedRecipes(page)
      .then(res => {
        console.log('component Mounted for me', res)
        this.setState({favouritedRecipes: [...res.favouriteRecipes]})
      })
    }

    

    // console.log('component Mounted')
    // this.props.getFavouritedRecipesIds()
    // .then(res => {
		// 	console.log('component Mounted for me', res)
    //   this.setState({favouritedRecipeId: [...res]})
    // })
  // }
  
  // componenDidUpdate(){
  //   getFavouritedRecipesIds()
  //   .then(res => {
	// 		console.log('component updated', res)
  //     this.setState({favouritedRecipesIds: [...res]})
  //   })
  // }

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

	makeFavouriteRecipe(id){
		makeFavouriteRecipe(id)
		.then(res => {
			console.log('alldata',res.data.favouritedRecipesId)
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
                <a className="dropdown-item" href="recipes.html">Dessert</a>
                <a className="dropdown-item" href="my_recipes.html">Pasta</a>
                <a className="dropdown-item" href="favourite_recipe.html">Fries</a>
                <a className="dropdown-item" href="#">Chinese</a>
                <a className="dropdown-item" href="index.html">Africa</a>
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
                this.state.favouritedRecipes.reverse().map((elem, index) => {
                return (<RecipeCard key={index} 
                user={this.props.user}
                recipe={elem}
                id={elem.id} 
                onDelete={this.deleteRecipe} 
                editRecipe={this.editRecipe} 
                makeFavouriteRecipe={this.makeFavouriteRecipe}
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
  };
}

export default connect(mapStateToProps, { getFavouritedRecipes, getFavouritedRecipesIds, makeFavouriteRecipe, allRecipes, addRecipe, getUserRecipes, deleteRecipe, editRecipe })(FavoruriteRecipes);

