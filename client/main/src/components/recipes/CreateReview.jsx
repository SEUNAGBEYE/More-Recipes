import React from 'react';

const CreateReview = (props) => (
  <form className="form-group" onSubmit={props.reviewRecipe} id="form">

    <textarea rows="5" cols="20" className="form-control" placeholder="Write reviews here" name="review" onChange={props.onChange}/>
    <button className="btn-default auth-button" style={{ margin: 10, float: 'left' }} value={props.reviewBody}> Submit</button>
  </form>
);

export default CreateReview;

