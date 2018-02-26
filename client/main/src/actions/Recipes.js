import axios from 'axios';
import actionTypes from './actionTypes';

const {
  GET_RECIPE,
  GET_RECIPES,
  GET_USER_RECIPES,
  GET_USER_FAVOURITED_RECIPES_ID,
  GET_FAVOURITED_RECIPES,
  GET_POPULAR_RECIPES,
  GET_RECIPE_REVIEWS,
  RECIPE_CATEGORIES,
  SEARCH_RECIPES,
  ADD_RECIPE,
  DELETE_RECIPE,
  EDIT_RECIPE,
  TOGGLE_FAVOURITE_RECIPE,
  TOGGLE_THUMBS_UP_RECIPE,
  TOGGLE_THUMBS_DOWN_RECIPE,
  REVIEW_RECIPE
} = actionTypes;

/**
 * @param {Object} recipe
 * @return {Object} Object
 */
export function addRecipeAction(recipe) {
  return {
    type: ADD_RECIPE,
    recipe
  };
}

/**
 * @export
 * @param {Object} recipe
 * @returns {Object} Object
 */
export function getRecipeAction(recipe) {
  return {
    type: GET_RECIPE,
    recipe
  };
}

/**
 * @export
 * @param {Number} id
 * @returns {Object} Object
 */
export function deleteRecipeAction(id) {
  return {
    type: DELETE_RECIPE,
    id
  };
}

/**
 * @export
 * @param {Object} recipe
 * @returns {Object} Object
 */
export function editRecipeAction(recipe) {
  return {
    type: EDIT_RECIPE,
    recipe
  };
}

/**
 * @export
 * @param {Object} data
 * @returns {Object} Object
 */
export function userRecipesAction(data) {
  return {
    type: GET_USER_RECIPES,
    recipes: data.data,
    pagination: data.pagination
  };
}

/**
 * @export
 * @param {Array} favouritedRecipesIds
 * @returns {Object} Object
 */
export function favouritedRecipesIdsAction(favouritedRecipesIds) {
  return {
    type: GET_USER_FAVOURITED_RECIPES_ID,
    favouritedRecipesIds
  };
}

/**
 * @export
 * @param {Object} favouriteRecipes
 * @param {Number} pagination
 * @returns {Object} Object
 */
export function favouritedRecipesAction(favouriteRecipes, pagination) {
  return {
    type: GET_FAVOURITED_RECIPES,
    favouriteRecipes,
    pagination
  };
}

/**
 * @export
 * @param {Object} data
 * @param {Number} pagination
 * @returns {Object} Object
 */
export function allRecipesAction(data, pagination) {
  return {
    type: GET_RECIPES,
    recipes: data,
    pagination
  };
}

/**
 * @export
 * @param {Object} popularRecipe
 * @returns {Object} Object
 */
export function popularRecipesAction(popularRecipe) {
  return {
    type: GET_POPULAR_RECIPES,
    popularRecipe
  };
}

/**
 * @export
 * @param {Object} recipeCategories
 * @returns {Object} Object
 */
export function recipeCategoriesAction(recipeCategories) {
  return {
    type: RECIPE_CATEGORIES,
    recipeCategories
  };
}

/**
 * @export
 * @param {Object} data
 * @returns {Object} Object
 */
export function searchRecipesAction(data) {
  return {
    type: SEARCH_RECIPES,
    recipes: data.data,
    pagination: data.pagination
  };
}

/**
 * @export
 * @param {Object} favouritedRecipe
 * @returns {Object} Object
 */
export function toggleFavouriteRecipeAction(favouritedRecipe) {
  return {
    type: TOGGLE_FAVOURITE_RECIPE,
    favouritedRecipe
  };
}

/**
 * @export
 * @param {recipe} recipe
 * @returns {Object} Object
 */
export function toggleThumbsUpRecipeAction(recipe) {
  return {
    type: TOGGLE_THUMBS_UP_RECIPE,
    recipe
  };
}

/**
 * @export
 * @param {recipe} recipe
 * @returns {Object} Object
 */
export function toggleThumbsDownRecipeAction(recipe) {
  return {
    type: TOGGLE_THUMBS_DOWN_RECIPE,
    recipe
  };
}

/**
 * @export
 * @param {Object} reviewBody
 * @returns {Object} Object
 */
export function reviewRecipeAction(reviewBody) {
  return {
    type: REVIEW_RECIPE,
    reviewBody
  };
}

/**
 * @export
 * @param {Object} reviews
 * @returns {Object} Object
 */
export function getRecipeReviewsAction(reviews) {
  return {
    type: GET_RECIPE_REVIEWS,
    reviews
  };
}

/**
 * @export
 * @param {Object} page
 * @param {Object} limit
 * @returns {Object} Object
 */
export function allRecipes(page = 1, limit = 2) {
  return dispatch => axios.get(`/api/v1/recipes?limit=${limit}&page=${page}`)
    .then((res) => {
      const { data, pagination } = res.data;
      return dispatch(allRecipesAction(data, pagination));
    })
    .catch(error => error);
}

/**
 * @export
 * @param {limit} limit
 * @returns {Object} Object
 */
export function popularRecipes(limit) {
  return dispatch => axios.get(`api/v1/recipes/popular?limit=${limit}`)
    .then(res => dispatch(popularRecipesAction(res.data.data)))
    .catch(error => error);
}

/**
 * @export
 * @returns {Object} Object
 */
export function recipeCategories() {
  return dispatch => axios.get('/api/v1/recipes/categories')
    .then(res => dispatch(recipeCategoriesAction(res.data.data)));
}

/**
 * @export
 * @param {search} search
 * @param {page} page
 * @param {limit} limit
 * @returns {Object} Object
 */
export function searchRecipes(search, page = 1, limit = 8) {
  return dispatch => axios.get(`api/v1/recipes/search_results?search=${search}&limit=${limit}&page=${page}`)
    .then((res) => {
      const { data } = res;
      dispatch(searchRecipesAction(data));
    });
}

/**
 * @export
 * @returns {Object} Object
 */
export function getFavouritedRecipesIds() {
  return dispatch => axios.get('/api/v1/users/fav-recipes/getIds')
    .then((res) => {
      const { data } = res.data;
      return dispatch(favouritedRecipesIdsAction(data));
    })
    .catch(error => error);
}

/**
 * @export
 * @param {Object} page
 * @returns {Object} Object
 */
export function getFavouritedRecipes(page = 1) {
  return dispatch => axios.get(`/api/v1/users/fav-recipes?limit=8&page=${page}`)
    .then((res) => {
      const { data, pagination } = res.data;
      return dispatch(favouritedRecipesAction(data, pagination));
    })
    .catch(error => error);
}

/**
 * @export
 * @param {Object} data
 * @returns {Object} Object
 */
export function addRecipe(data) {
  return dispatch => axios.post('api/v1/recipes', data)
    .then((res) => {
      toastr.success('Recipe Added', 'Success');
      return dispatch(addRecipeAction(res.data.data));
    });
}

/**
 * @export
 * @param {Object} id
 * @returns {Object} Object
 */
export function toggleFavouriteRecipe(id) {
  return dispatch => axios.post(`/api/v1/users/fav-recipes/${id}/add`)
    .then((res) => {
      const { data } = res.data;
      return dispatch(toggleFavouriteRecipeAction(data));
    })
    .catch((error) => {
      if (error) {
        console.log(error.response);
        console.log(error);
      }
    });
}

/**
 * @export
 * @param {id} id
 * @returns {Object} Object
 */
export function toggleThumbsDownRecipe(id) {
  return dispatch => axios.put(`/api/v1/recipes/${id}/downvotes`)
    .then(res => dispatch(toggleThumbsDownRecipeAction(res.data.data)))
    .catch(error => console.log(error));
}

/**
 * @export
 * @param {id} id
 * @returns {Object} Object
 */
export function toggleThumbsUpRecipe(id) {
  return dispatch => axios.put(`/api/v1/recipes/${id}/upvotes`)
    .then(res => dispatch(toggleThumbsUpRecipeAction(res.data.data)))
    .catch(error => console.log(error));
}

/**
 * @export
 * @param {Object} id
 * @returns {Object} Object
 */
export function deleteRecipe(id) {
  return dispatch => axios.delete(`api/v1/recipes/${id}`)
    .then((res) => {
      toastr.success('Recipe Deleted', 'Success');
      return dispatch(deleteRecipeAction(id));
    })
    .catch((error) => {
      if (error) {
        console.log(error);
      }
    });
}

/**
 * @export
 * @param {Object} id,
 * @param {Object} data
 * @returns {Object} Object
 */
export function editRecipe(id, data) {
  return dispatch => axios.put(`/api/v1/recipes/${id}`, data)
    .then((res) => {
      toastr.success('Recipe Updated', 'Success');
      return dispatch(editRecipeAction(res.data.data));
    })
    .catch((error) => {
      if (error) {
        return error.response;
      }
    });
}

/**
 * @export
 * @param {Object} id
 * @returns {Object} Object
 */
export function getRecipe(id) {
  return dispatch => axios.get(`/api/v1/recipes/${id}`)
    .then((res) => {
      dispatch(getRecipeAction(res.data.data));
    })
    .catch((error) => {
      if (error) {
        console.log('error', error);
        // console.log(error.response.data);
      }
    });
}

/**
 *
 *
 * @export
 * @param {Object} id
 * @param {Object} data
 * @returns {Object} Object
 */
export function reviewRecipe(id, data) {
  return dispatch => axios.post(`/api/v1/recipes/${id}/reviews`, data)
    .then((res) => {
      dispatch(reviewRecipeAction(res.data.data));
      toastr.success('Review Added');
    })
    .catch(error => error);
}

/**
 * @export
 * @param {Object} id
 * @param {Object} limit
 * @param {Object} offset
 * @returns {Object} Object
 */
export function getRecipeReviews(id, limit, offset) {
  return dispatch => axios.get(`/api/v1/recipes/${id}/reviews?limit=${limit}&offset=${offset}`)
    .then((res) => {
      dispatch(getRecipeReviewsAction(res.data.data));
    })
    .catch(error => error);
}

/**
 *
 *
 * @export
 * @param {number} [page=1]
 * @param {number} [limit=8]
 *
 * @returns {Object} Object
 */
export function getUserRecipes(page = 1, limit = 8) {
  return dispatch => axios.get(`api/v1/users/myrecipes?page=${page}&limit=${limit}`)
    .then((res) => {
      const { data } = res;
      return dispatch(userRecipesAction(data));
    })
    .catch((error) => {
      if (error) {
        console.log(error.response.data);
      }
    });
}

