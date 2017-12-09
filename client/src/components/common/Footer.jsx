import React from 'react';

const Footer = (props) => {
  return (
    <div>
      <footer style={props.style}>
        <div>
          <strong>&copy; Recipes</strong>
        </div>
      </footer>
    </div>
  );
};

export default Footer