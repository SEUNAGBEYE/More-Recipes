import React from 'react';

/**
 * @export
 * @param {any} props
 * @returns  {jsx} JSX
 */
export default function (props) {
  return (
    <div className="text-center exclamation-container">
      {props.children}
      <div className="fa fa-exclamation-circle center-exclamation" />
    </div>
  );
}
