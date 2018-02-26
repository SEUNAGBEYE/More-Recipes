import React from 'react';
import PropTypes from 'prop-types';

const Review = (props) => (
  <div className="row" style={{ marginBottom: 15 }}>
    <div className="" style={{
      backgroundColor: '#f8f9fa',
      border: '1 solid #f8f9fa',
      width: '100vw'
    }}
    >
      <div className="col-md-1 review" style={{ paddingTop: 10 }}>
        <img style={{ width: 30, height: 30, borderRadius: 80 }}
          src={props.review.user.profilePicture}/>
      </div>
      <div className="col-md-11 review">
        <h5 style={{ color: 'orange', marginTop: 5 }}>{
          props.review.user.firstName}
        </h5>
        {props.review.body}
      </div>
    </div>
  </div>
);

const propTypes = {
  review: PropTypes.object.isRequired
};

Review.propTypes = propTypes;
export default Review;
