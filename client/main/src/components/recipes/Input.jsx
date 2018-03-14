import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description - Input Component
 *
 * @param {Object} props
 *
 * @returns {Jsx} Jsx
 */
const Input = (props) => (
  <div>
    <fieldset>
      <label> {props.name} { props.number}</label>
      <input className="form-control"
        onBlur={props.onChange}
        name={props.name}
        id={props.id}
        data-index={props.index}
        data-name={`${props.name}-${props.index}`}
        defaultValue={props.value}
        required/>
      <span className="icons fa fa-trash" id={props.id}
        data-index={props.index}
        data-name={`${props.name}-${props.index}`}
        onClick={props.removeInput}
      />
    </fieldset>
  </div>
);

const propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  removeInput: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

Input.propTypes = propTypes;

export default Input;
