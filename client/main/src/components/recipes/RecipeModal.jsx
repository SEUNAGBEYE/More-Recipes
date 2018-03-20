import React, { Component } from 'react';
import Loader from 'react-loader';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';
import imageUpload from '../../../utils/imageUploader';
import Input from './Input';

/**
 * @export
 * @class RecipeModal
 * @extends {Component}
 */
export default class RecipeModal extends Component {
  /**
   * @description - Creates an instance of RecipeModal.
   *
   * @method contructor
   *
   * @param {Object} props
   * @memberof RecipeModal
   */
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.stepClick = this.stepClick.bind(this);
    this.ingredientClick = this.ingredientClick.bind(this);
    this.removeIngredientsInput = this.removeIngredientsInput.bind(this);
    this.removeStepsInput = this.removeStepsInput.bind(this);
    this.state = RecipeModal.initialState();
  }

  /**
 * @description - Initial State
 *
 * @method initialState
 *
 * @returns {Object} state
 * @memberof RecipeModal
 */
  static initialState() {
    const state = {
      name: '',
      description: '',
      ingredients: [],
      categoryId: 1,
      steps: [],
      errors: [],
      loaded: true
    };
    return state;
  }

  /**
   * @description - Add forms to add steps
   *
   * @method stepClick
   *
   * @param {Object} event
   *
   * @returns {void} void
   * @memberof RecipeModal
   */
  stepClick(event) {
    event.preventDefault();
    this.setState({ steps: [...this.state.steps, ''] });
  }

  /**
   * @description - Add forms to add ingredients
   *
   * @method ingredientClick
   *
   * @param {Object} event
   *
   * @returns {void} void
   * @memberof RecipeModal
   */
  ingredientClick(event) {
    event.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, ''] });
  }

  /**
   * @description - Remove form to add ingredients
   *
   * @method removeIngredientsInput
   *
   * @param {Object} event
   *
   * @returns {void} void
   * @memberof RecipeModal
   */
  removeIngredientsInput(event) {
    const { ingredients } = this.state;
    const { index: eventIndex } = event.target.dataset;
    const newIngredients = ingredients
      .filter((ingredient, index) =>
        parseInt(eventIndex, 10) !== parseInt(index, 10));
    this.setState({ ingredients: newIngredients });
  }

  /**
   * @description - Remove form to add a step
   *
   * @method removeStepsInput
   *
   * @param {Object} event
   *
   * @returns {void} void
   * @memberof RecipeModal
   */
  removeStepsInput(event) {
    const { steps } = this.state;
    const { index: eventIndex } = event.target.dataset;
    const newSteps = steps
      .filter((step, index) =>
        parseInt(eventIndex, 10) !== parseInt(index, 10));
    this.setState({ steps: newSteps });
  }


  /**
   * @description - Submit a recipe
   *
   * @method onSubmit
   *
   * @param {Object} event
   *
   * @returns {void} void
   * @memberof RecipeModal
   */
  async onSubmit(event) {
    event.preventDefault();
    this.setState({ loaded: false });
    const file = document.getElementById('recipePicture').files[0];
    if (file) {
      try {
        const image = await imageUpload(file);
        this.setState({ image: image.data.secure_url }, async () => {
          setAuthorizationToken(localStorage.token);
          const response = await this.props.addRecipe(this.state);
          if (response.status !== 'Failure') {
            $('.modal').modal('hide');
            this.setState(RecipeModal.initialState());
          } else {
            this.setState({ errors: response.errors, loaded: true });
          }
        });
      } catch (error) {
        this.setState(RecipeModal.initialState());
      }
    } else {
      const response = await this.props.addRecipe(this.state);
      if (response.status !== 'Failure') {
        $('.modal').modal('hide');
        this.setState(RecipeModal.initialState());
      } else {
        this.setState({ errors: response.errors, loaded: true });
      }
    }
  }

  /**
   * @description - Change state values
   *
   * @method onChange
   *
   * @param {Object} event
   *
   * @return {void} void
   * @memberof RecipeModal
   */
  onChange(event) {
    event.preventDefault();
    const stateKeyIndex = event.target.dataset.index;
    const { name: stateKey, value } = event.target;
    if (stateKey === 'steps' || stateKey === 'ingredients') {
      this.setState({
        [stateKey]: this.state[stateKey].map((step, index) => {
          if (parseInt(index, 10) === parseInt(stateKeyIndex, 10)) {
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
   * @description - Renders react component
   *
   * @method render
   *
   * @returns {Jsx} Jsx
   * @memberof RecipeModal
   */
  render() {
    const stepFields = this.state.steps.map((step, index) => (
      <Input key={uuid()}
        onChange={this.onChange}
        number={index + 1}
        index={index}
        id={uuid()}
        value={step}
        name={'steps'}
        removeInput={this.removeStepsInput}
      />
    ));

    const ingredientFields = this.state.ingredients.map((ingredient, index) => (
      <Input key={uuid()}
        onChange={this.onChange}
        number={index + 1}
        index={index}
        id={uuid()}
        value={ingredient}
        name={'ingredients'}
        removeInput={this.removeIngredientsInput}
      />
    ));
    const { errors } = this.state;
    return (
      <div>
        <div className="modal fade" id="addModal" tabIndex="-1"
          role="dialog" aria-labelledby="modalLabel" aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="modalLabel">Recipe</h4>
              </div>

              <div className="modal-body">
                {errors.map(error => (
                  <ul key={uuid()}>
                    <li className="text-danger">{error.message}</li>
                  </ul>))
                }
                <form id="form">
                  <fieldset className="form-group">
                    <label htmlFor="recipeName" className="form-inline">
                      Name
                    </label>
                    <input type="text" className="form-control" id="recipeName"
                      name="name" onChange={this.onChange} value={this.state.name}
                      required
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <label htmlFor="recipeDescription" className="form-inline">
                      Description
                    </label>
                    <textarea className="form-control" id="recipeDescription"
                      name="description" cols="50" rows = "5"
                      onChange={this.onChange}
                      value={this.state.description} required
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <label htmlFor="image" className="form-inline">
                      The maximum file size allowed is 4mb
                      <input type="file" className="form-control"
                        id="recipePicture" name="image"
                      />
                        Click to add image
                    </label>
                  </fieldset>


                  <fieldset className="form-group">
                    <label htmlFor="category" className="form-inline">
                      Category
                    </label>
                    <select className="form-control" onChange={this.onChange}
                      name="categoryId"
                      id="categoryId"
                      required
                    >
                      {
                        this.props.recipeCategories.map(recipeCategory =>
                          (<option
                            key={recipeCategory.id}
                            value={recipeCategory.id}
                            id={`category${recipeCategory.name}`}
                          >
                            {recipeCategory.name}
                          </option>))
                      }
                    </select>

                  </fieldset>

                  {ingredientFields}
                  <fieldset>
                    <button className="btn btn-default show-input fa fa-plus"
                      id="ingredient" onClick={this.ingredientClick}>
                      <strong>Ingredients</strong>
                    </button>
                  </fieldset>

                  {stepFields}
                  <fieldset>
                    <button className="btn btn-default show-input fa fa-plus"
                      id="step" onClick={this.stepClick}>
                      <strong>Steps</strong>
                    </button>
                  </fieldset>

                  <div className="modal-footer">
                    <Loader loaded={this.state.loaded} />
                    <button className="btn btn-secondary auth-button"
                      disabled={!this.state.loaded}
                      id="submit" onClick={this.onSubmit}
                    >
                      Submit
                    </button>
                    <button type="button"
                      className="btn btn-secondary auth-button"
                      data-dismiss="modal"
                    >
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

const propTypes = {
  recipeCategories: PropTypes.array.isRequired,
  addRecipe: PropTypes.func.isRequired,
};

RecipeModal.propTypes = propTypes;

