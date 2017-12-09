import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import  config from '../../config/config';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import StepInput from './StepInput';
import IngredientInput from './IngredientInput';
import {editRecipe} from '../../actions/Recipes'

const { cloudinaryUploadUrl, cloudinaryUploadPreset } = config;

export default class RecipeModal  extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			description:'',
			image: '',
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
		this.imageUpload = this.imageUpload.bind(this);
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
		const file = document.getElementById('recipePicture').files[0]
		console.log(file)
		file ? this.imageUpload()
		.then(res => {
			console.log(res.data.secure_url)
			this.setState({image: res.data.secure_url}, () => {
				setAuthorizationToken(localStorage.token);
				this.props.addRecipe(this.state)
			})
		})
		.catch(error => console.log(error))
		: this.props.addRecipe(this.state)
	}

	imageUpload(){

		console.log(cloudinaryUploadUrl, cloudinaryUploadPreset)
		let newState;
		const file = document.getElementById('recipePicture').files[0]
		const imageData = new FormData();
		imageData.append('file', file)
		// imageData.append('public_id', )
		imageData.append('upload_preset', cloudinaryUploadPreset)

		// headers: { "X-Requested-With": "XMLHttpRequest" }

		delete axios.defaults.headers.common['x-access-token'];

		return axios({
			url: cloudinaryUploadUrl,
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form.urlencoded',
				"X-Requested-With": "XMLHttpRequest"
			},
			data: imageData,
			return_delete_token: 1
		})
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
											<label htmlFor="image" className="form-inline">
											<input type="file" className="form-control" id="recipePicture" name="image"/>
											Click to add image
											</label>
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

