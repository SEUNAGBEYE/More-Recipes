import React from 'react';
import PropTypes from 'prop-types';

/**
 * @export
 * @param {Object} props
 *
 * @returns  {jsx} JSX
 */
const Exclamation = (props) => (
  <div className="text-center exclamation-container">
    {props.children}
    <div className="fa fa-exclamation-circle center-exclamation" />
  </div>
);

const propTypes = {
  children: PropTypes.object
};

Exclamation.propTypes = propTypes;

export default Exclamation;
