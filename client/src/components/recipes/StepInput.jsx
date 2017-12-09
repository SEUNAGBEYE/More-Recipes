import React from 'react';

export default (props) => {
  return(
    <div>
      <fieldset>
        <label>Step {props.number}</label>
        <input className='steps form-control' onBlur={props.onChange} name='steps' id={props.id} defaultValue={props.step}/>
      </fieldset>
    </div>
  )
}