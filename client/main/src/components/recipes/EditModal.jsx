import React, { Component } from 'react';
import uuid from 'uuid';
import Loader from 'react-loader';
import PropTypes from 'prop-types';
import Input from './Input';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';
import imageUpload from '../../../utils/imageUploader';
/**
 * @export
 * @class EditModal
 * @extends {Component}
 */
export default class EditModal extends Component {
  /**
  * @description - Creates an instance of EditModal.
  *
  * @method constructor
  *
  * @param {Object} props
  *
  * @returns {void} void
  * @memberof EditModal
  */
  constructor(props) {
    super(props);
    const { recipe } = this.props;
    const {
      steps, ingredients, name, description, image
    } = recipe;
    this.state = {
      name,
      description,
      image,
      ingredients,
      steps,
      errors: [],
      stepsTimes: '',
      ingredientsTimes: [],
      loaded: true,
    };
    this.onChange = this.onChange.bind(this);
    this.stepClick = this.stepClick.bind(this);
    this.ingredientClick = this.ingredientClick.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
    this.removeIngredientsInput = this.removeIngredientsInput.bind(this);
    this.removeStepsInput = this.removeStepsInput.bind(this);
  }

  /**
   * @description - Add input for steps
   *
   * @method stepClick
   *
   * @param {Object} event
   *
   * @returns {void} void
   * @memberof EditModal
   */
  stepClick(event) {
    event.preventDefault();
    this.setState({ steps: [...this.state.steps, ''] });
  }

  /**
   * @description - Add input for ingredients
   *
   * @method ingredientClick
   *
   * @param {Object} event
   *
   * @returns {void} void
   * @memberof EditModal
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
   * @param {any} event
   *
   * @returns {void} void
   * @memberof EditModal
   */
  removeIngredientsInput(event) {
    const { ingredients } = this.state;
    const { index: eventIndex } = event.target.dataset;
    const newIngredients = ingredients
      .filter((ingredient, index) => parseInt(eventIndex, 10) !== parseInt(index, 10));
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
   * @memberof EditModal
   */
  removeStepsInput(event) {
    const { steps } = this.state;
    const { index: eventIndex } = event.target.dataset;
    const newSteps = steps
      .filter((step, index) => parseInt(eventIndex, 10) !== parseInt(index, 10));
    this.setState({ steps: newSteps });
  }


  /**
   * @description - Change state value
   *
   * @param {Object} event
   *
   * @method onChange
   *
   * @returns {void} void
   * @memberof EditModal
   */
  onChange(event) {
    event.preventDefault();
    const stateKeyIndex = event.target.dataset.index;
    const { name: stateKey, value } = event.target;
    if (stateKey === 'steps' || stateKey === 'ingredients') {
      this.setState({
        [event.target.name]: this.state[stateKey].map((step, index) => {
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
   * @description - Submit recipe data
   *
   * @param {Object} event
   *
   * @method updateRecipe
   *
   * @returns {void} void
   * @memberof EditModal
   */
  async updateRecipe(event) {
    event.preventDefault();
    const { id } = event.target;
    this.setState({ loaded: false });
    const file = document.getElementById(`recipePicture${id}`).files[0];
    if (file) {
      try {
        const image = await imageUpload(file);
        this.setState({ image: image.data.secure_url }, async () => {
          setAuthorizationToken(localStorage.token);
          const response = await this.props.editRecipe(id, this.state);
          if (response.status !== 'Failure') {
            $('.modal').modal('hide');
            this.setState({ loaded: true });
          } else {
            this.setState({ errors: response.errors, loaded: true });
          }
        });
      } catch (error) {
        this.setState({ loaded: true });
      }
    } else {
      const response = await this.props.editRecipe(id, this.state);
      if (response.status !== 'Failure') {
        $('.modal').modal('hide');
        this.setState({ loaded: true });
      } else {
        this.setState({ errors: response.errors, loaded: true });
      }
    }
  }

  /**
   * @description - Renders react component
   *
   * @method render
   *
   * @returns {Jsx} Jsx
   * @memberof EditModal
   */
  render() {
    const { recipe } = this.props;
    const stepFields = this.state.steps.map((step, index) => (
      <Input key={uuid()}
        onChange={this.onChange}
        number={index + 1}
        id={uuid()}
        index={index}
        value={step}
        name={'steps'}
        removeInput={this.removeStepsInput}
      />
    ));

    const ingredientFields = this.state.ingredients.map((ingredient, index) => (
      <Input key={uuid()}
        onChange={this.onChange}
        number={index + 1}
        id={uuid()}
        index={index}
        value={ingredient}
        name={'ingredients'}
        removeInput={this.removeIngredientsInput}
      />
    ));
    const { errors } = this.state;
    return (
      <div>
        <div className="modal fade" id={`editModal${recipe.id}`}
          tabIndex="-1" role="dialog" aria-labelledby="modalLabel"
          aria-hidden="true"
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
                <form>
                  <fieldset className="form-group">
                    <label htmlFor="name" className="form-inline">Name</label>
                    <input type="text" className="form-control" id="recipeName"
                      name="name" onChange={this.onChange}
                      defaultValue={recipe.name}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <label htmlFor="recipeDescription"
                      className="form-inline"
                    >
                      Description
                    </label>
                    <textarea className="form-control" id="description"
                      name="description" cols="50" rows = "5"
                      onChange={this.onChange}
                      defaultValue={recipe.description}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <label htmlFor="image" className="form-inline">
                      Picture
                    </label>
                      The maximum file size allowed is 4mb
                    <input type="file" className="form-control"
                      id={`recipePicture${recipe.id}`} name="image"
                    />
                  </fieldset>

                  {ingredientFields}
                  <fieldset>
                    <button
                      className="btn btn-default show-input fa fa-plus"
                      id="ingredient" onClick={this.ingredientClick}
                    >
                      <strong>Ingredients</strong>
                    </button>
                  </fieldset>

                  {stepFields}
                  <fieldset>
                    <button
                      className="btn btn-default show-input fa fa-plus"id="step"
                      onClick={this.stepClick}
                    >
                      <strong>Steps</strong>
                    </button>
                  </fieldset>

                  <div className="modal-footer">
                    <Loader loaded={this.state.loaded} />
                    <button className="btn btn-secondary auth-button"
                      id={recipe.id} onClick={this.updateRecipe}
                      disabled={!this.state.loaded}
                      data-update={`update-recipe${recipe.id}`}
                    >
                    Update
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
  editRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
};

EditModal.propTypes = propTypes;

