import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
/**
 * @description - Recipe Circle Component
 *
 * @param {Object} props
 *
 * @returns {Jsx} Jsx
 */
const RecipeCircle = (props) => (
  <div className="col-sm-6 col-md-4"
    style={{ fontWeight: 'bold', textAlign: 'center' }}
  >
    <Link to={props.to || `recipe/${props.recipe.id}`}>
      <div className="box">
        <div className="circle">
          <img className ="circle" src= {props.recipe.image} />
        </div>
      </div>
      <div className="break-word">{ props.recipe.name }</div>
    </Link>
  </div>
);

const propTypes = {
  to: PropTypes.string,
  recipe: PropTypes.object.isRequired
};

RecipeCircle.propTypes = propTypes;

export default RecipeCircle;
