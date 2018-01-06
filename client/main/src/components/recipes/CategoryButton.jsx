import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


/**
 *
 *
 * @param {any} props
 * @returns {jsx} JSX
 */
function CategoryButton(props) {
  return (
    <div className="dropdown" style={{ float: 'left' }}>
      <button className="btn btn-default dropdown-toggle auth-button"
        type="button" id="about-us" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">Category
      </button>
      <div className="dropdown-menu" aria-labelledby="about-us">
        {
          props.categories.map(category =>
            (<Link className="dropdown-item" to={`/categories/${category}`}
            >{category}</Link>))
        }
      </div>
    </div>
  );
}

/**
 * mapStateToProps
 * @param {any} state
 * @returns {object} object
 */
const mapStateToProps = (state) => ({
  categories: state.recipes.recipeCategories.map(category => category.name)
});

export default connect(mapStateToProps)(CategoryButton);