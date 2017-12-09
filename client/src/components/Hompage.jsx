import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {allRecipes, popularRecipes} from '../actions/Recipes';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import Recipe from '../actions/Recipes';
import RecipeCircle from './recipes/RecipeCircle';

import {
  cappuccino,
  breakfast,
  cookies,
  desserts,
  dinner,
  dougnuts,
  drinks,
  frozen_desserts,
  jollof_rice,
  lunch,
  noodles,
  pasta,
  pastries,
  pies,
  chips,
  pizza,
  pudding,
  roasted_chicken,
  salad,
  seun,
  banana_split
} from '../helpers/Images';
// import { stat } from 'fs';


/**
 * @class Homepage
 * @extends Component
 */
class Homepage extends Component {

  constructor(props){
    super(props)
  }


  componentDidMount(){
    this.props.popularRecipes(3)
    this.props.allRecipes(0, 3)

    // .then(res => console.log(this.props.recipes))
    
  }

  /**
   * returns {obeject} object
   * @memberOf Homepage
   */

  render(){
    return (
      <div>
        <Navbar />
        <main>
          <section className="banner">
            <div className="overlay">
              <h3 className='overlay__h3'> Welcome To Recipes. All About Reciping</h3>
            </div>	
          </section>

          <section>
            <div className="container">

              <h3 className='title' style={{ textAlign: 'center', marginTop: 40, fontSize: 32 }}><Link to='/recipes' className="title__link">Recipes</Link></h3>
              
              <div className="row">
              {
                this.props.recipes.map((recipe) => <RecipeCircle key={recipe.id} recipe={recipe} /> )
              }
              </div>

              <h3 style={{ textAlign: 'center', marginTop: 40, fontSize: 32 }}><a href="recipes.html" className="title-link">Categories</a></h3>
              
              <div className="row">

                <div className="col-sm-6 col-md-4" style={{ fontWeight: 'bold', textAlign: 'center'}}>
                  <a href="category.html">
                   
                    <div className="box">
                      <div className="circle"><img className ="circle" src={breakfast} /></div>
                    </div>
                    Breakfast
                  </a>

                </div>

                <div className="col-sm-6 col-md-4" style={{ fontWeight: 'bold', textAlign: 'center'}}>
                  <a href="category.html">
                    
                    <div className="box">
                      <div className="circle"><img className ="circle" src={lunch} /></div>
                    </div>
                    Lunch
                  </a>

                </div>

                <div className="col-sm-6 col-md-4" style={{ fontWeight: 'bold', textAlign: 'center'}}>
                  <a href="category.html">
                    
                    <div className="box">
                      <div className="circle"><img className ="circle" src={dinner} /></div>
                    </div>
                    Dinner
                  </a>

                </div>

                <div className="col-sm-6 col-md-4" style={{ fontWeight: 'bold', textAlign: 'center'}}>
                  <a href="category.html">
                    
                    <div className="box">
                      <div className="circle"><img className ="circle" src={desserts} /></div>
                    </div>
                    Desserts
                  </a> 

                </div>

                <div className="col-sm-6 col-md-4" style={{ fontWeight: 'bold', textAlign: 'center'}}>
                  <a href="category.html">
                    <div className="box">
                      <div className="circle"><img className ="circle" src={noodles} /></div>
                    </div>
                    Noodles
                  </a>

                </div>
                <div className="col-sm-6 col-md-4" style={{ fontWeight: 'bold', textAlign: 'center'}}>
                  <a href="category.html">
                    <div className="box">
                      <div className="circle"><img className ="circle" src={drinks} /></div>
                    </div>
                    Drinks
                  </a>

                </div>
              </div>

              <h3 style={{textAlign: 'center', marginTop: 40, fontSize: 32}}><a href="#" className="title-link">Popular</a></h3>

              <div className="row">
              {
                this.props.popularRecipe.map((recipe) => <RecipeCircle key={recipe.id} recipe={recipe} /> )
              }
              </div>

            </div>
          </section>
          
        </main>
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
    recipes: state.recipes.allRecipes,
    popularRecipe: state.recipes.popularRecipes
  };
}

export default connect(mapStateToProps, {allRecipes, popularRecipes})(Homepage);