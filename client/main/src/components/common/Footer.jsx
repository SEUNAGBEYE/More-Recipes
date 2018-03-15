import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description - Renders Footer Component
 *
 * @param {Object} props
 *
 * @returns {Jsx} Jsx
 */
const Footer = (props) => (
  <div>
    <footer style={props.style}>
      <div>
        <strong>&copy; Recipes</strong>
      </div>
    </footer>
  </div>
);

const propTypes = {
  style: PropTypes.object
};

Footer.propTypes = propTypes;

export default Footer;

