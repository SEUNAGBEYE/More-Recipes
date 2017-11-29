import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import Recipe from '../../actions/Recipes';
import { pasta, seun } from '../../helpers/Images';
import RecipeModal from './RecipeModal';
import DeleteModal from './DeleteModal';
import {editRecipe} from '../../actions/Recipes'
import EditModal from './EditModal';
import { getFavouritedRecipesIds, makeFavouriteRecipe } from '../../actions/Recipes';


/**
 * @class RecipeCard
 */
class RecipeCard extends Component{

	constructor(props){
		super(props)
		this.makeFavouriteRecipe = this.makeFavouriteRecipe.bind(this);
		this.thumbsdownRecipe = this.thumbsdownRecipe.bind(this);
		this.thumbsUpRecipe = this.thumbsUpRecipe.bind(this);

		this.state = {
			toggleHeart: true,
			toggleThumbsUp: true,
			toggleThumbsDown: true,
			favouritedRecipeId: this.props.userFavouritedRecipeId || this.props.user.favoriteRecipe
		}

	}

	makeFavouriteRecipe(event){
		event.preventDefault();
		this.props.makeFavouriteRecipe(event.target.id)
	}

	// componenDidMount(){
	// 	console.log('component Mounted')
  //   getFavouritedRecipesIds()
  //   .then(res => {
	// 		console.log('component Mounted for me', res)
  //     this.setState({favouritedRecipeId: [...res]})
  //   })
  // }
		
  // componentWillReceiveProps(nextProps){
	// 	if(this.props != nextProps){
	// 		console.log('componentWillReceiveProps Afterprops', this.props.favouritedRecipesIds)
	// 		this.setState({favouritedRecipesIds: [...this.props.favouritedRecipesIds]})
	// 	}
	// }



  // componenDidUpdate(){
  //   getFavouritedRecipesIds()
  //   .then(res => {
	// 		console.log('mounted', res)
  //     this.setState({favouritedRecipesIds: [...res]})
  //   })
  // }

	thumbsUpRecipe(event){
		event.preventDefault();
		console.log('event', event)
		this.setState({toggleThumbsUp: !this.state.toggleThumbsUp})
			// this.makeFavouriteRecipe(event.target.id)
	}

	thumbsdownRecipe(event){
		event.preventDefault();
		console.log('event', event)
		this.setState({toggleThumbsDown: !this.state.toggleThumbsDown})
			// this.makeFavouriteRecipe(event.target.id)
	}

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
				
										{ this.props.recipe.userId === this.props.user.userId
											?
											<div className="d-flex justify-content-between">
												<Link to="/" className="fa fa-eye icons">10</Link>
												<Link to="/" className="fa fa-pencil icons" data-toggle="modal" data-target={`#editModal${this.props.id}`}></Link>
												<Link to="/" className="fa fa-trash icons" data-toggle="modal" data-target={`#deleteModal${this.props.id}`}></Link>
											</div>
											:
											<div className="d-flex justify-content-between">
						
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

												{!this.state.favouritedRecipeId.includes(this.props.recipe.id) ?
												<Link to="/"><i className="fa fa-heart-o icons" onClick={this.makeFavouriteRecipe} id={this.props.recipe.id} style={{color:'black'}}></i></Link>
												:
												<Link to="/"><i className="fa fa-heart icons" onClick={this.makeFavouriteRecipe} id={this.props.recipe.id}></i></Link> 
												}
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
		favouritedRecipesIds: state.auth.user.favouritedRecipesIds || []
  };
}

export default connect(mapStateToProps, { makeFavouriteRecipe})(RecipeCard)


