import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import Recipe from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';

/**
 * @class UserRecipes
 */
export default class UserRecipes extends Component{

    state = {
      times: [...'Univelcityyy']
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
              <a href="" className="auth-button" data-toggle="modal" data-target="#editModal">Add Recipe</a>
              <h4 className='container__myrecipes'>My Recipes</h4><br /><br />
            </div>

            <div className='row'>
              {
                this.state.times.map((elem, index) => {
                return (<RecipeCard key={index}/>)
                })
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

