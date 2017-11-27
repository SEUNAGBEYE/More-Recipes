import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import Recipe from '../../actions/Recipes';
import { pasta, seun } from '../../helpers/Images';
import RecipeModal from './RecipeModal';
import DeleteModal from './DeleteModal';
import {editRecipe} from '../../actions/Recipes'
import EditModal from './EditModal';


/**
 * @class RecipeCard
 */
export default class RecipeCard extends Component{

  /**
   * @memberOf RecipeCard
   * return {object} object
   */
  render(){
    return (
				<div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 my-card">
					<Link to={`/recipe/${this.props.id}`}>
					<div className="card">
					  	<img className="card-img-top" src={pasta} alt="Card image cap" />
						<div className="container">
							<div className="card-block">
					    		<h4 className="card-title">{this.props.recipe.name}</h4>
					    		<p className="card-text">{this.props.recipe.description || "Some quick example text to build on the card title and make up the bulk of the card's content."}</p>
							    <div className="d-flex justify-content-between">
										<Link to="/" className="fa fa-eye icons">10</Link>
										<Link to="/" className="fa fa-pencil icons" data-toggle="modal" data-target={`#editModal${this.props.id}`}></Link>
										<Link to="/" className="fa fa-trash icons" data-toggle="modal" data-target={`#deleteModal${this.props.id}`}></Link>
								 </div>
							</div>
						</div>
					</div>
					<EditModal recipe={this.props.recipe} editRecipe={this.props.editRecipe} id={this.props.id}/>
					<DeleteModal id={this.props.id} onDelete={this.props.onDelete}/>
					</Link>	
        </div>
				
    )
  }
}

// const mapStateToProps = (state) => {
// 	console.log(state)
//   return {
// 		recipes: [...state]
// 	}
// };

// export default connect(mapStateToProps, {editRecipe})(RecipeCard);

