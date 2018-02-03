import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const RecipeCardAction = (props) => (
  <div>
    { props.recipe.userId === props.user.userId ?
      <div className="d-flex justify-content-between recipe-icons" style={props.style}>
        <i className="fa fa-eye icons">{props.recipe.views.length}</i>
        <Link to="/" className="fa fa-pencil icons" data-toggle="modal" data-target={`#editModal${props.recipe.id}`}/>
        <Link to="/" className="fa fa-trash icons" data-toggle="modal" data-target={`#deleteModal${props.recipe.id}`} />
      </div> :
      <div className="d-flex justify-content-between recipe-icons" style={props.style}>
        <i className="fa fa-eye icons">{props.recipe.views.length}</i>
        <i className={classnames("fa icons", {
          'fa-thumbs-o-down text-black': !props.isDownVoted,
          'fa-thumbs-down text-warning': props.isDownVoted
        })}
        onClick={props.toggleThumbsDownRecipe} id={props.recipe.id} >{props.recipe.downvotes ? props.recipe.downvotes.length : 0}</i>

        <i className={classnames("fa icons", {
          'fa-thumbs-o-up text-black': !props.isUpVoted,
          'fa-thumbs-up text-warning': props.isUpVoted
        })}
        onClick={props.toggleThumbsUpRecipe} id={props.recipe.id} >{props.recipe.upvotes ? props.recipe.upvotes.length : 0}</i>

        <i
          className={classnames(
            "fa icons",
            {
              "fa-heart-o text-black": !props.isFavorited,
              "fa-heart text-warning": props.isFavorited
            }
          )}
          onClick={props.toggleFavouriteRecipe}
          id={props.recipe.id} />

      </div>
    }
  </div>
);

export default RecipeCardAction;
