import React from 'react';
import PropTypes from 'prop-types';

const sortBy = [
  {
    id: 1,
    name: 'Most Upvoted',
    sort: 'upvotes',
    order: 'desc',
  },
  {
    id: 2,
    name: 'Most Downvoted',
    sort: 'downvotes',
    order: 'desc',
  },
  {
    id: 3,
    name: 'Most Viewed',
    sort: 'views',
    order: 'desc',
  },
];

/**
 * @description - Component for selecting category to display
 * @param {Object} props
 *
 * @returns {Jsx} Jsx
 */
const SortButton = (props) => (
  <div className="dropdown" style={{ float: 'right' }}
    data-category-button="category-button"
  >
    <button className="btn btn-default dropdown-toggle auth-button"
      type="button" id="sort-button" data-toggle="dropdown"
      aria-haspopup="true" aria-expanded="false">Sort By
    </button>
    <div className="dropdown-menu" aria-labelledby="about-us">
      {
        sortBy.map(sort =>
          (<i className="dropdown-item"
            key={sort.id}
            data-sort = {sort.sort}
            data-order = {sort.order}
            onClick = {props.sortRecipes}
          >{sort.name}</i>))
      }
    </div>
  </div>
);

const propTypes = {
  sortRecipes: PropTypes.func.isRequired,
};

SortButton.propTypes = propTypes;


export default SortButton;
