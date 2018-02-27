import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => (
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

const propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

Input.propTypes = propTypes;

export default Input;
