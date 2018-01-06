import React, { Component } from 'react';
import Loader from 'react-loader';
import Input from './Input';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';
import imageUpload from '../../../utils/ImageUploader';

/**
 * @export
 * @class EditModal
 * @extends {Component}
 */
export default class EditModal extends Component {
  /**
  * Creates an instance of EditModal.
  * @param {any} props
  * @memberof EditModal
  */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      image: '',
      ingredients: [],
      steps: [],
      errors: {},
      stepsTimes: '',
      ingredientsTimes: [],
      loaded: true,
    };
    this.onChange = this.onChange.bind(this);
    this.stepClick = this.stepClick.bind(this);
    this.ingredientClick = this.ingredientClick.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
  }

  /**
   *
   * @returns {void} void
   * @memberof EditModal
   */
  componentDidMount() {
    this.setState({
      name: this.props.recipe.name,
      description: this.props.recipe.description,
      image: this.props.recipe.image,
      ingredients: this.props.recipe.ingredients,
      steps: this.props.recipe.steps
    });
  }

  /**
   *
   * @returns {void} void
   * @param {any} nextProps
   * @memberof EditModal
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.recipe.name,
      description: nextProps.recipe.description,
      image: nextProps.recipe.image,
      ingredients: nextProps.recipe.ingredients,
      steps: nextProps.recipe.steps
    });
  }

  /**
	 * @param {any} event
	 * @memberof EditModal
	 * @returns {void} void
	 */
  stepClick(event) {
    event.preventDefault();
    this.setState({ steps: [...this.state.steps, ''] });
  }

  /**
	 * @param {any} event
	 *  @returns {void} void
	 * @memberof EditModal
	 */
  ingredientClick(event) {
    event.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, ''] });
  }


  /**
	 * @param {any} event
	 *  @returns {void} void
	 * @memberof EditModal
	 */
  onChange(event) {
    event.preventDefault();
    const { name: stateKey, id, value } = event.target;
    if (stateKey === 'steps' || stateKey === 'ingredients') {
      this.setState({
        [event.target.name]: this.state[stateKey].map((step, index) => {
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
	 * @param {any} event
	 *  @returns {void} void
	 * @memberof EditModal
	 */
  updateRecipe(event) {
    event.preventDefault();
    const { id } = event.target;
    const file = document.getElementById(`recipePicture${id}`).files[0];
    if (file) {
      if (file.size > 4000000) {
        return toastr.warning('File too Large');
      } else {
        this.setState({ loaded: false });
        imageUpload(file)
          .then(res => {
            this.setState({ image: res.data.secure_url }, () => {
              setAuthorizationToken(localStorage.token);
              this.props.editRecipe(this.props.recipe.id, this.state);
              this.setState({ loaded: true });
              $('.modal').modal('hide');
            });
          })
          .catch(error => {
            this.setState({ loaded: true });
          });
      }
	 } else {
      this.setState({ loaded: true, image: this.props.recipe.image });
      this.props.editRecipe(this.props.recipe.id, this.state);
      $('.modal').modal('hide');
	 }
  }

  /**
	 * @returns {jsx} jsx
	 * @memberof EditModal
	 */
  render() {
    const stepFields = this.props.recipe.steps.map((step, index) => (
      <Input key={index}
        onChange={this.onChange}
        number={index + 1}
        id={index}
        value={step}
        name={'steps'}
      />
    ));

    const ingredientFields = this.state.ingredients.map((ingredient, index) => (
      <Input key={index}
        onChange={this.onChange}
        number={index + 1}
        id={index}
        value={ingredient}
        name={'ingredients'}
      />
    ));

    return (

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
                    <input type="text" className="form-control" id="recipeName" name="name" onChange={this.onChange} value={this.state.name}/>
                  </fieldset>

                  <fieldset className="form-group">
                    <label htmlFor="recipeDescription" className="form-inline">Description</label>
                    <textarea className="form-control" id="description" name="description" cols="50" rows = "5" onChange={this.onChange} value={this.state.description} />
                  </fieldset>

                  <fieldset className="form-group">
                    <label htmlFor="image" className="form-inline">Picture</label>
                      The maximum file size allowed is 4mb
                    <input type="file" className="form-control" id={`recipePicture${this.props.recipe.id}`} name="image"/>
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

    );
  }
}

