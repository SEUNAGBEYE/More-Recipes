import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import classnames from 'classnames'
import Recipe from '../../actions/Recipes';
import { pasta, seun } from '../../helpers/Images';
import RecipeModal from './RecipeModal';
import DeleteModal from './DeleteModal';
import {editRecipe} from '../../actions/Recipes'
import EditModal from './EditModal';
import { getFavouritedRecipesIds, toggleFavouriteRecipe } from '../../actions/Recipes';


/**
 * @class RecipeCard
 */
class RecipeCard extends Component{

	constructor(props){
		super(props)
		this.toggleFavouriteRecipe = this.toggleFavouriteRecipe.bind(this);
		this.thumbsdownRecipe = this.thumbsdownRecipe.bind(this);
		this.thumbsUpRecipe = this.thumbsUpRecipe.bind(this);

		this.state = {
			toggleHeart: true,
			toggleThumbsUp: true,
			toggleThumbsDown: true,
			favouritedRecipeIds: []
		}

	}

	toggleFavouriteRecipe(event){
		event.preventDefault();
		this.props.toggleFavouriteRecipe(parseInt(event.target.id))
	}

	thumbsUpRecipe(event){
		event.preventDefault();
		this.setState({toggleThumbsUp: !this.state.toggleThumbsUp})
			// this.makeFavouriteRecipe(event.target.id)
	}

	thumbsdownRecipe(event){
		this.setState({toggleThumbsDown: !this.state.toggleThumbsDown})
			// this.makeFavouriteRecipe(event.target.id)
	}


  /**
   * @memberOf RecipeCard
   * return {object} object
   */
  render(){
    const isFavorited = this.props.myFavs.includes(parseInt(this.props.recipe.id));
    return (
				<div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 my-card">
					<Link to={`/recipe/${this.props.id}`}>
					<div className="card recipe-card">
					  	<img className="card-img-top" src={this.props.recipe.image || pasta} alt="Card image cap" />
						<div className="container">
							<div className="card-block">
					    		<h4 className="card-title">{this.props.recipe.name.slice(0, 20)}</h4>
					    		<p className="card-text">{this.props.recipe.description.slice(0, 90) || "Some quick example text to build on the card title and make up the bulk of the card's content."}</p>
				
										{ this.props.recipe.userId === this.props.user.userId
											?
											<div className="d-flex justify-content-between recipe-icons">
												<Link to="/" className="fa fa-eye icons">10</Link>
												<Link to="/" className="fa fa-pencil icons" data-toggle="modal" data-target={`#editModal${this.props.id}`}></Link>
												<Link to="/" className="fa fa-trash icons" data-toggle="modal" data-target={`#deleteModal${this.props.id}`}></Link>
											</div>
											:
											<div className="d-flex justify-content-between recipe-icons">
						
												{ this.state.toggleThumbsDown ?
												<Link to="/"><i className="fa fa-thumbs-o-down icons" onClick={this.thumbsdownRecipe} id={this.props.recipe.id} style={{color:'black'}}>{this.props.recipe.downvotes ? this.props.recipe.downvotes.length : 0}</i></Link>
												:
												<Link to="/"><i className="fa fa-thumbs-down icons" onClick={this.thumbsdownRecipe} id={this.props.recipe.id}>{this.props.recipe.downvotes ? this.props.recipe.downvotes.length : 0}</i></Link>
												}
												
												{ this.state.toggleThumbsUp ?
												<Link to="/"><i className="fa fa-thumbs-o-up icons" onClick={this.thumbsUpRecipe} id={this.props.recipe.id} style={{color:'black'}}>{this.props.recipe.upvotes ? this.props.recipe.upvotes.length : 0}</i></Link>
												:
												<Link to="/"><i className="fa fa-thumbs-up icons" onClick={this.thumbsUpRecipe} id={this.props.recipe.id}>{this.props.recipe.upvotes ? this.props.recipe.upvotes.length : 0}</i></Link>
												}

                        <Link
                         to="/">
                         <i 
                         className={classnames("fa icons",
                         {"fa-heart-o text-black": !isFavorited, 
                          "fa-heart text-warning": isFavorited })} 
                         onClick={this.toggleFavouriteRecipe} 
                         id={this.props.recipe.id}></i></Link>
												
											</div>
										}
			
							</div>
						</div>
					</div>
					</Link>
					<EditModal recipe={this.props.recipe} editRecipe={this.props.editRecipe} id={this.props.id}/>
					<DeleteModal id={this.props.id} onDelete={this.props.onDelete}/>	
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
		user: state.auth.user,
		myFavs: state.recipes.userFavouritedRecipeId || []
  };
}

export default connect(mapStateToProps, { toggleFavouriteRecipe, getFavouritedRecipesIds})(RecipeCard)


