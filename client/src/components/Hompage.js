import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import Recipe from '../actions/Recipes';

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


/**
 * @class Homepage
 * @extends Component
 */
export default class Homepage extends Component {

  componentDidMount(){
    Recipe.allRecipes();
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

              <h3 className='title' style={{ textAlign: 'center', marginTop: 40, fontSize: 32 }}><Link to="/my_recipes" className="title__link">Recipes</Link></h3>
              
              <div className="row">

                <div className="col-sm-6 col-md-4" style={{fontWeight: 'bold', textAlign: 'center'}}>
                  <Link to="recipe_details">
                  
                    <div className="box">
                      <div className="circle"><img className ="circle" src= {pasta} /></div>
                    </div>
                    Pasta
                  </Link>

                </div>

                <div className="col-sm-6 col-md-4" style={{fontWeight: 'bold', textAlign: 'center'}}>
                  <Link to="my_recipes">
                  
                    <div className="box">
                      <div className="circle"><img className ="circle" src={ banana_split } /></div>
                    </div>
                    Banana Split
                  </Link>

                </div>

                <div className="col-sm-6 col-md-4" style={{fontWeight: 'bold', textAlign: 'center'}}>
                  <a href="recipe_detail.html">
                    
                    <div className="box">
                      <div className="circle"><img className ="circle" src={salad} /></div>
                    </div>
                    Creme Salad
                  </a>

                </div>

                <div className="col-sm-6 col-md-4" style={{fontWeight: 'bold', textAlign: 'center'}}>
                  <a href="category.html">
                  
                    <div className="box">
                      <div className="circle"><img className ="circle" src={jollof_rice} /></div>
                    </div>
                    Jollof Rice
                  </a>

                </div>

                <div className="col-sm-6 col-md-4" style={{fontWeight: 'bold', textAlign: 'center'}}>
                  <a href="category.html">
                    
                    <div className="box">
                      <div className="circle"><img className ="circle" src={roasted_chicken} /></div>
                    </div>
                    Roasted chicken
                  </a>

                </div>
                <div className="col-sm-6 col-md-4" style={{fontWeight: 'bold', textAlign: 'center'}}>
                  <a href="category.html">
                    <div className="box">
                      <div className="circle"><img className ="circle" src={chips} /></div>
                    </div>
                    Madrelle Chips
                  </a>

                </div>
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

                <div className="col-sm-6 col-md-4" style={{ fontWeight: 'bold', textAlign: 'center'}}>
                  <a href="recipe_detail.html">
                    
                    <div className="box">
                      <div className="circle"><img className ="circle" src={jollof_rice} /></div>
                    </div>
                    Jollof Rice
                  </a>

                </div>


                <div className="col-sm-6 col-md-4" style={{ fontWeight: 'bold', textAlign: 'center'}}>
                  <a href="recipe_detail.html">
                    
                    <div className="box">
                      <div className="circle"><img className ="circle" src={cappuccino} /></div>
                    </div>
                    Cappuccino
                  </a>

                </div>

                <div className="col-sm-6 col-md-4" style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 20}}>
                  <a href="recipe_detail.html">
                    
                    <div className="box">
                      <div className="circle"><img className ="circle" src={pizza} /></div>
                    </div>
                    Margherita Pizza
                  </a>

                </div>
              </div>

            </div>
          </section>
          
        </main>
      <Footer />
      </div>
    )
  }
}