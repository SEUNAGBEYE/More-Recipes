import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description - Component displays form for creating a review
 * @param {Object} props
 *
 * @returns {jsx} JSX
 */
const CreateReview = (props) => (
  <form className="form-group" id="create-review-form"
    onSubmit={props.reviewRecipe}
  >

    <textarea rows="5" cols="20" className="form-control"
      placeholder="Write reviews here" name="reviewBody"
      id="review"
      value={props.reviewBody}
      onChange={props.onChange}
    />
    <button className="btn-default auth-button"
      style={{ margin: 10, float: 'left' }}
    >
     Submit
    </button>
  </form>
);

const propTypes = {
  reviewRecipe: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  reviewBody: PropTypes.string.isRequired,
};

CreateReview.propTypes = propTypes;

export default CreateReview;

