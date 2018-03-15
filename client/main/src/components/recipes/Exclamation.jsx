import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description - Component for displaying 404, and resource not found
 *
 * @param {Object} props
 *
 * @returns  {Jsx} Jsx
 */
const Exclamation = (props) => (
  <div className="text-center exclamation-container" style={props.style}>
    {props.children}
    <div className="fa fa-exclamation-circle center-exclamation" />
  </div>
);

const propTypes = {
  children: PropTypes.object,
  style: PropTypes.object,
};

Exclamation.propTypes = propTypes;

export default Exclamation;
