import React, { Component } from 'react';
import Loader from 'react-loader';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';
import imageUpload from '../../../utils/ImageUploader';
import Input from './Input';

/**
 * @export
 * @class RecipeModal
 * @extends {Component}
 */
export default class RecipeModal extends Component {
  /**
	 * Creates an instance of RecipeModal.
	 * @param {any} props
	 * @memberof RecipeModal
	 */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      image: '',
      ingredients: [],
      categoryId: 1,
      steps: [],
      errors: [],
      loaded: true
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.stepClick = this.stepClick.bind(this);
    this.ingredientClick = this.ingredientClick.bind(this);
  }


  /**
	 * @returns {void} void
	 * @param {any} event
	 * @memberof RecipeModal
	 */
  stepClick(event) {
    event.preventDefault();
    this.setState({ steps: [...this.state.steps, ''] });
  }

  /**
	 *@returns {void} void
	 * @param {any} event
	 * @memberof RecipeModal
	 */
  ingredientClick(event) {
    event.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, ''] });
  }


  /**
 *
 *@returns {void} void
 * @param {any} event
 * @memberof RecipeModal
 */
  async onSubmit(event) {
    event.preventDefault();
    this.setState({ loaded: false });
    const file = document.getElementById('recipePicture').files[0];
    if (file) {
      try {
        const image = await imageUpload(file);
        this.setState({ image: image.data.secure_url }, () => {
          setAuthorizationToken(localStorage.token);
          this.props.addRecipe(this.state)
            .then(res => {
              $('.modal').modal('hide');
              document.getElementById('form').reset();
              this.setState({ loaded: true });
            })
            .catch(error => {
              this.setState({ loaded: true });
              this.setState({ errors: error.response.data.errors });
            });
        });
      } catch (error) {
        console.log('errors', error.response);
        this.setState({ loaded: true });
      }
    } else {
      this.props.addRecipe(this.state);
      document.getElementById('form').reset();
    }
  }

  /**
 *
 *@return {void} void
 * @param {any} event
 * @memberof RecipeModal
 */
  onChange(event) {
    event.preventDefault();
    const { name: stateKey, id, value } = event.target;
    if (stateKey === 'steps' || stateKey === 'ingredients') {
      this.setState({
        [stateKey]: this.state[stateKey].map((step, index) => {
          if (parseInt(index, 10) === parseInt(id, 10)) {
            step = value;
          }
          return step;
        })
      });
    } else {
      this.setState({
        [stateKey]: value
      });
    }
  }

  /**
	 * @returns {jsx} JSX
	 * @memberof RecipeModal
	 */
  render() {
    const stepFields = this.state.steps.map((step, index) => (
      <Input key={index}
        onChange={this.onChange}
        number={index + 1}
        id={index}
        step={step}
        name={'steps'}
      />
    ));

    const ingredientFields = this.state.ingredients.map((ingredient, index) => (
      <Input key={index}
        onChange={this.onChange}
        number={index + 1}
        id={index}
        ingredient={ingredient}
        name={'ingredients'}
      />
    ));
    const { errors } = this.state;
    return (
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
                {errors.map(error => (<ul><li className="text-danger">{error.description}</li></ul>))}
                <form id="form">
                  <fieldset className="form-group">
                    <label htmlFor="name" className="form-inline">Name</label>
                    <input type="text" className="form-control" id="recipeName" name="name" onChange={this.onChange} value={this.state.name} required/>
                  </fieldset>

                  <fieldset className="form-group">
                    <label htmlFor="recipeDescription" className="form-inline">Description</label>
                    <textarea className="form-control" id="description" name="description" cols="50" rows = "5" onChange={this.onChange} value={this.state.description} required/>
                  </fieldset>

                  <fieldset className="form-group">
                    <label htmlFor="image" className="form-inline">
											The maximum file size allowed is 4mb
                      <input type="file" className="form-control" id="recipePicture" name="image" required/>
											Click to add image
                    </label>
                  </fieldset>


                  <fieldset className="form-group">
                    <label htmlFor="image" className="form-inline">
											Category
                    </label>
                    <select className="form-control" onChange={this.onChange} name="categoryId" required>
                      {
                        this.props.recipeCategories.map(recipeCategory =>
                          (<option
                            key={recipeCategory.id}
                            value={recipeCategory.id}>
                            {recipeCategory.name}
                          </option>))
                      }
                    </select>

                  </fieldset>

                  {ingredientFields}
                  <fieldset>
                    <button className="auth-button fa fa-plus" style={{
                      float: 'left', width: 90, height: 20, fontSize: 12, padding: 0
                    }} id="ingredient" onClick={this.ingredientClick}><strong>Ingredients</strong></button>
                  </fieldset>

                  {stepFields}
                  <fieldset>
                    <button className="auth-button fa fa-plus" style={{
                      float: 'left', width: 90, height: 20, fontSize: 12, padding: 0
                    }} id="step" onClick={this.stepClick}><strong>Steps</strong></button>
                  </fieldset>

                  <div className="modal-footer">
                    <Loader loaded={this.state.loaded} />
                    <button className="btn btn-secondary auth-button" id="submit" onClick={this.onSubmit}>Submit</button>
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
    );
  }
}

