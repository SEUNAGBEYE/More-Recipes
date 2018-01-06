
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reviewRecipe } from '../../actions/Recipes';
import checkAuth from '../../../utils/CheckAuth';


/**
 *
 *
 * @class ReviewRecipe
 * @extends {Component}
 */
class CreateReview extends Component {
  /**
   * Creates an instance of ReviewRecipe.
   * @param {any} props
   * @memberof CreateReview
   */
  constructor(props) {
    super(props);
    this.state = {
      reviewBody: ''
    };

    this.onChange = this.onChange.bind(this);
    this.reviewRecipe = this.reviewRecipe.bind(this);
  }

  /**
   * @param {any} event
   * @memberof CreateReview
   * @returns {void}
   */
  reviewRecipe(event) {
    event.preventDefault();
    checkAuth(this.props.isAuthenticated, this.props.history);
    this.props.reviewRecipe(this.props.recipeId, { reviewBody: this.state.reviewBody });
    document.getElementById('form').reset();
  }

  /**
   *
   * @param {any} event
   * @memberof CreateReview
   * @returns {void}
   */
  onChange(event) {
    checkAuth(this.props.isAuthenticated, this.props.history);
    this.setState({
      reviewBody: event.target.value
    });
  }

  /**
   *
   *
   * @memberof CreateReview
   * @returns {jsx} JSX
   */
  render() {
    return (
      <form className="form-group" onSubmit={this.reviewRecipe} id="form">

        <textarea rows="5" cols="20" className="form-control" placeholder="Write reviews here" name="review" onChange={this.onChange}/>
        <button className="btn-default auth-button" style={{ margin: 10, float: 'left' }} value={this.reviewBody}> Submit</button>
      </form>
    );
  }
}

/**
 * mapStateToProps
 * @param {any} state
 * @param {any} props
 * @return {object} object
 */
const mapStateToProps = (state, props) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { reviewRecipe })(CreateReview);
