import React from 'react';

export default (props) => (
  <div>
    <fieldset>
      <label> {props.name} { props.number}</label>
      <input className="steps form-control"
        onBlur={props.onChange}
        name={props.name}
        id={props.id}
        defaultValue={props.value}
        required/>
    </fieldset>
  </div>
);
