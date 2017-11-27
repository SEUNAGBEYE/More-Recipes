import React from 'react';

export default (props) => {
  return(
    <div>
      <fieldset>
        <label>Ingredients {props.ingredients}</label>
        <input className='ingredients form-control' onBlur={props.onChange} name='ingredients' id={props.id}/>
      </fieldset>
    </div>
  )
}