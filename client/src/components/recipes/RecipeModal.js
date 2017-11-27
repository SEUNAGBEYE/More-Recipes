import React, { Component } from 'react';
import {connect} from 'react-redux';
import StepInput from './StepInput';
import IngredientInput from './IngredientInput';
import {editRecipe} from '../../actions/Recipes'

export default class RecipeModal  extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			description:'',
			image: 'hello image',
			ingredients: [],
			steps:  [],
      errors: {},
			stepsTimes: [...Array(0)],
			ingredientsTimes: [...Array(0)]
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.stepClick = this.stepClick.bind(this);
		this.ingredientClick = this.ingredientClick.bind(this);
		this.editClick = this.editClick.bind(this);
	}
	
	stepClick(e){
		e.preventDefault();
		this.setState({stepsTimes: [...this.state.stepsTimes, Array(this.state.stepsTimes.length)]})
	}

	ingredientClick(e){
		e.preventDefault();
		this.setState({ingredientsTimes: [...this.state.ingredientsTimes, Array(this.state.ingredientsTimes.length)]})
	}

	editClick(e){
		this.setState({ingredientsTimes: [...this.state.ingredientsTimes, Array(this.state.ingredientsTimes.length)]})
	}


	onSubmit(e){
		this.props.addRecipe(this.state)
		document.getElementById("form").reset();
	}

	onChange(e){
		e.preventDefault();
		console.log('changing', e.target.value)
		let stateKey = e.target.name
		if(Array.isArray(this.state[stateKey])){
			let value = this.state[stateKey].filter((element, index) => index == e.target.id)
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

	render(){
		return(
			<div>
					
					<div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
									<h4 className="modal-title" id="modalLabel">Recipe</h4>
								</div>

								<div className="modal-body">
									<form id='form'>
										<fieldset className="form-group">
											<label htmlFor="name" className="form-inline">Name</label>
											<input type="text" className="form-control" id="recipeName" name="name"  onChange={this.onChange} value={this.state.name}/>
										</fieldset>

										<fieldset className="form-group">
											<label htmlFor="recipeDescription" className="form-inline">Description</label>
											<textarea className="form-control" id="description" name="description" cols="50" rows = "5" onChange={this.onChange} value={this.state.description}></textarea>
										</fieldset>

										<fieldset className="form-group">
											<label htmlFor="image" className="form-inline">Picture</label>
											<input type="file" className="form-control" id="recipePicture" name="image"  onChange={this.onChange}/>
										</fieldset>

										{this.state.ingredientsTimes.map((element, index) => <IngredientInput key={index} onChange={this.onChange} ingredients={index + 1} id={index} />)}
										<fieldset>
											<button className="auth-button fa fa-plus" style={{float: 'left', width: 90, height: 20, fontSize: 12, padding: 0}} id="ingredient" onClick={this.ingredientClick}><strong>Ingredients</strong></button>
										</fieldset>

										{this.state.stepsTimes.map((element, index) => <StepInput key={index} onChange={this.onChange} number={index + 1} id={index} />)}
										<fieldset>
											<button className="auth-button fa fa-plus" style={{float: 'left', width: 90, height: 20, fontSize: 12, padding: 0}} id="step" onClick={this.stepClick}><strong>Steps</strong></button>
										</fieldset>

											<div className="modal-footer">
												<button className="btn btn-secondary auth-button" data-dismiss="modal" id='submit' onClick={this.onSubmit}>Submit</button>
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

