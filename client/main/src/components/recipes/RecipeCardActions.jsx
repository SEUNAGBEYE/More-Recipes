import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
/**
 * @description - Component for recipe actions i.e upvote/downvotes, edit recipe, delete recipe
 *
 * @param {Object} props
 *
 * @returns {Jsx} Jsx
 */
const RecipeCardActions = (props) => (
  <div>
    { props.recipe.userId === props.user.userId ?
      <div className="d-flex justify-content-between recipe-icons"
        style={props.style}>
        <i className="fa fa-eye icons">{props.recipe.views.length}</i>
        <i className="fa fa-pencil icons" data-toggle="modal"
          data-target={`#editModal${props.recipe.id}`}
          id={`editModal${props.recipe.id}Button`}
        />
        <i className="fa fa-trash icons" data-toggle="modal"
          data-target={`#deleteModal${props.recipe.id}`}
          data-delete-button={`deleteModal${props.recipe.id}`}
        />
      </div> :
      <div className="d-flex justify-content-between recipe-icons"
        style={props.style}>
        <i className="fa fa-eye icons">{props.recipe.views.length}</i>
        <i className={classnames("fa icons", {
          'fa-thumbs-o-down text-black': !props.isDownVoted,
          'fa-thumbs-down text-warning': props.isDownVoted
        })}
        onClick={props.toggleThumbsDownRecipe}
        data-downvote-icon={`downvote-icon-${props.recipe.id}`}
        id={props.recipe.id}
        >
          {props.recipe.downvotes ? props.recipe.downvotes.length : 0}
        </i>

        <i className={classnames("fa icons", {
          'fa-thumbs-o-up text-black': !props.isUpVoted,
          'fa-thumbs-up text-warning': props.isUpVoted
        })}
        onClick={props.toggleThumbsUpRecipe} 
        id={props.recipe.id}
        data-upvote-icon={`upvote-icon-${props.recipe.id}`}
        >
          {props.recipe.upvotes ? props.recipe.upvotes.length : 0}
        </i>

        <i
          className={classnames(
            "fa icons",
            {
              "fa-heart-o text-black": !props.isFavorited,
              "fa-heart text-warning": props.isFavorited
            }
          )}
          onClick={props.toggleFavouriteRecipe}
          id={props.recipe.id}
          data-favourite-icon={`favourite-icon-${props.recipe.id}`}
        />

      </div>
    }
  </div>
);

const propTypes = {
  recipe: PropTypes.object.isRequired,
  style: PropTypes.object,
  user: PropTypes.object.isRequired,
  isFavorited: PropTypes.bool.isRequired,
  isUpVoted: PropTypes.bool.isRequired,
  isDownVoted: PropTypes.bool.isRequired,
  toggleFavouriteRecipe: PropTypes.func.isRequired,
  toggleThumbsDownRecipe: PropTypes.func.isRequired,
  toggleThumbsUpRecipe: PropTypes.func.isRequired,
};

RecipeCardActions.propTypes = propTypes;

export default RecipeCardActions;
