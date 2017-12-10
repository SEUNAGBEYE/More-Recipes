import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import {addRecipe, getUserRecipes, deleteRecipe, editRecipe, userRecipes} from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Exclamation from './Exclamation';
import RecipeModal from './RecipeModal';



/**
 * @class UserRecipes
 */
class UserRecipes extends Component{

	constructor(props){
		super(props);
		this.state = {
			name: '',
			description: '',
			image: '',
			ingredients: [],
			steps: [],
      errors: {},
      categoryId: '',
      downvotes: [],
      upvotes:[],
      userRecipes: []
		}
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
  }
  

  componentDidMount(){
    this.props.getUserRecipes()
    .then(res => {
      this.setState({userRecipes: [...this.state.userRecipes, ...res.recipes]})
    })
  }
  
  componenDidUpdate(){
    this.props.getUserRecipes()
    .then(res => {
      this.setState({userRecipes: [...this.state.userRecipes, ...res.recipes]})
    })
    
  }

  onSubmit(data){
    this.props.addRecipe(data)
  }

  deleteRecipe(id){
    this.props.deleteRecipe(id)
    .then(res => {
      this.setState({userRecipes: this.state.userRecipes.filter( recipe => recipe.id !== id) })
    })
  }

  editRecipe(id, recipe){
    this.props.getUserRecipes()
    this.props.editRecipe(id, recipe)
    .then(res => {
      this.setState({userRecipes: [...this.state.userRecipes.filter( recipe => recipe.id === id)] })
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
              <a href="" className="auth-button" data-toggle="modal" data-target="#addModal">Add Recipe</a>
              <h4 className='container__myrecipes'>My Recipes</h4><br /><br />
              <RecipeModal addRecipe={this.onSubmit}/>
            </div>

            <div className='row'>
              {
                this.state.userRecipes.length > 0
                ?
                this.props.userRecipes.map((elem, index) => {
                return (<RecipeCard key={elem.id} user={this.props.user} recipe={elem} id={elem.id} onDelete={this.deleteRecipe} editRecipe={this.editRecipe}/>)
                })
                :
                <Exclamation>
                  <p className='text-muted'>Sorry you haven't added any recipe yet, please add to get started</p>
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
    user: state.auth.user,
    userRecipes: state.recipes.allRecipes
  };
}

export default connect(mapStateToProps, { addRecipe, getUserRecipes, deleteRecipe, editRecipe })(UserRecipes);

