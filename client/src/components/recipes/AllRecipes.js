import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { getFavouritedRecipesIds, makeFavouriteRecipe, addRecipe, getUserRecipes, allRecipes, favouriteRecipe, deleteRecipe, editRecipe} from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Exclamation from './Exclamation';
import RecipeModal from './RecipeModal';



/**
 * @class UserRecipes
 */
class AllRecipes extends Component{

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
      allRecipes: [],
      favouritedRecipesIds: []
		}
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.makeFavouriteRecipe = this.makeFavouriteRecipe.bind(this)
  }
  

  componentDidMount(){
    this.props.allRecipes()
    .then(res => {
      this.setState({allRecipes: [...this.state.allRecipes, ...res.allRecipes]})
    });

    // console.log('component Mounted')
    // this.props.getFavouritedRecipesIds()
    // .then(res => {
		// 	console.log('component Mounted for me', res)
    //   this.setState({favouritedRecipeId: [...res]})
    // })
  }
  
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
			console.log('alldata',res.data.favouritedRecipesId
    )
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
              <h4 className='container__myrecipes'>All Recipes</h4><br /><br />
              <RecipeModal addRecipe={this.onSubmit}/>
            </div>

            <div className='row'>
              {
                this.state.allRecipes.length > 0
                ?
                this.state.allRecipes.reverse().map((elem, index) => {
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
                  <p className='text-muted text-center'>Sorry no recipe has been added yet, please add to get started</p>
                </Exclamation>
              }
            </div>
          </div>
        </main>
        <Pagination />
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
    recipes: state.recipes,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, {getFavouritedRecipesIds, makeFavouriteRecipe, allRecipes, addRecipe, getUserRecipes, deleteRecipe, editRecipe })(AllRecipes);

