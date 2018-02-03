import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCircle = (props) => (
  <div className="col-sm-6 col-md-4" style={{ fontWeight: 'bold', textAlign: 'center' }}>
    <Link to={props.to || `recipe/${props.recipe.id}`}>
      <div className="box">
        <div className="circle"><img className ="circle" src= {props.recipe.image} /></div>
      </div>
      <div>{ props.recipe.name }</div>
    </Link>
  </div>
);

export default RecipeCircle;
