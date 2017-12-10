import React, { Component } from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader';
import StepInput from './StepInput';
import IngredientInput from './IngredientInput';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';
import imageUpload from '../../../utils/ImageUploader';
import {editRecipe} from '../../actions/Recipes'

export default class EditModal  extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: this.props.recipe.name ||'',
			description: this.props.recipe.description ||'',
			image: '',
			ingredients: this.props.recipe.ingredients ||[],
			steps:  this.props.recipe.steps ||[],
      errors: {},
			stepsTimes: [...Array(0)],
			ingredientsTimes: [...Array(0)],
			loaded: true
		}
		this.onChange = this.onChange.bind(this);
		this.stepClick = this.stepClick.bind(this);
		this.ingredientClick = this.ingredientClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
	}
	
	stepClick(e){
		e.preventDefault();
		this.setState({steps: [...Array(this.state.steps.length + 1)]})
	}

	ingredientClick(e){
		e.preventDefault();
		this.setState({ingredientsTimes: [...this.state.ingredientsTimes, Array(this.state.ingredientsTimes.length)]})
	}

	editClick(e){
		this.setState({ingredientsTimes: [...this.state.ingredientsTimes, Array(this.state.ingredientsTimes.length)]})
	}



	onChange(e){
		e.preventDefault();
		console.log('changing', e.target.value)
		let stateKey = e.target.name
		if(Array.isArray(this.state[stateKey])){
			let value = this.state[stateKey].filter((element, index) => index == e.target.id)
			console.log('value', value);
			if(this.state[stateKey][(e.target.id)]){
				this.state[stateKey][(e.target.id)].length === 1 && e.target.value === '' ? this.state[stateKey].splice(e.target.id, 1): ''
			}

			if(!this.state[stateKey].includes(e.target.value) && e.target.value !== ''){
				if(this.state[stateKey][(e.target.id)]){
					this.setState({ [e.target.name]: this.state[stateKey]})
				}else{
					this.setState({ [e.target.name]:  [...this.state[stateKey], e.target.value] })
				}	
			}
		}else{
			this.setState({ [e.target.name]: e.target.value})
		}
	}
  
  updateRecipe(e){
		e.target.disabled=true;
		this.setState({loaded: false})
		const file = document.getElementById(`recipePicture${e.target.id}`).files[0]
		console.log('filing', file)
		if(file){
		imageUpload(file)
		.then(res => {
			console.log(res.data.secure_url)
			this.setState({image: res.data.secure_url}, () => {
				setAuthorizationToken(localStorage.token);
				this.props.editRecipe(this.props.recipe.id, this.state)
					this.setState({loaded: true})
					// e.target.disabled=false;
					$('.modal').modal('hide');
					
			})
		})
		.catch(error => {
			this.setState({loaded: true})
			e.target.disabled=false;
			console.log(error.message)
		})
	 }else{
		this.props.editRecipe(this.props.recipe.id, this.state)
			this.setState({loaded: true})
			$('.modal').modal('hide');
	 }

	}

	render(){
		return(
			
			<div>
					
					<div className="modal fade" id={`editModal${this.props.recipe.id}`} tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
									<h4 className="modal-title" id="modalLabel">Recipe</h4>
								</div>

								<div className="modal-body">
									<form>
										<fieldset className="form-group">
											<label htmlFor="name" className="form-inline">Name</label>
											<input type="text" className="form-control" id="recipeName" name="name"  onChange={this.onChange} defaultValue={this.props.recipe.name}/>
										</fieldset>

										<fieldset className="form-group">
											<label htmlFor="recipeDescription" className="form-inline">Description</label>
											<textarea className="form-control" id="description" name="description" cols="50" rows = "5" onChange={this.onChange} defaultValue={this.props.recipe.description}></textarea>
										</fieldset>

										<fieldset className="form-group">
											<label htmlFor="image" className="form-inline">Picture</label>
											<input type="file" className="form-control" id={`recipePicture${this.props.recipe.id}`} name="image"/>
										</fieldset>

										{this.state.ingredientsTimes.map((element, index) => <IngredientInput key={index} onChange={this.onChange} ingredients={index + 1} id={index} />)}
										<fieldset>
											<button className="auth-button fa fa-plus" style={{float: 'left', width: 90, height: 20, fontSize: 12, padding: 0}} id="ingredient" onClick={this.ingredientClick}><strong>Ingredients</strong></button>
										</fieldset>

										{this.state.steps.length > 0 
										? this.state.steps.map((step, index) => <StepInput key={index} onChange={this.onChange} number={index + 1} id={index} step={step}/>)
										: 
										this.state.stepsTimes.map((step, index) => <StepInput key={index} onChange={this.onChange} number={this.state.steps.length > 0 ? index + 1 + this.state.steps.length: index + 1} id={this.state.steps.length > 0 ? this.state.steps.length: index} step={step}/>)
										}
										<fieldset>
											<button className="auth-button fa fa-plus" style={{float: 'left', width: 90, height: 20, fontSize: 12, padding: 0}} id="step" onClick={this.stepClick}><strong>Steps</strong></button>
										</fieldset>

											<div className="modal-footer">
											<Loader loaded={this.state.loaded}>
											</Loader>
												<button className="btn btn-secondary auth-button" id={this.props.recipe.id} onClick={this.updateRecipe}>Update</button>
												<button type="button" className="btn btn-secondary auth-button" data-dismiss="modal">
													Cancel
												</button>
											</div>
									</form>	
								</div>
							</div>
						</div>
					</div>
			</div>
			
		)
	}
}

