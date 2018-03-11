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
 * @description - Add Recipe Action
 * @export - addRecipeAction
 *
 * @param {Object} recipe
 *
 * @return {Object} Object
 */
export function addRecipeAction(recipe) {
  return {
    type: ADD_RECIPE,
    recipe
  };
}

/**
 * @description - Get Recipe Action
 * @export - getRecipeAction
 *
 * @param {Object} data
 *
 * @returns {Object} Object
 */
export function getRecipeAction(data) {
  return {
    type: GET_RECIPE,
    recipe: data.data,
    pagination: data.pagination
  };
}

/**
 * @description - Delete Recipe Action
 * @export - deleteRecipeAction
 *
 * @param {Number} id
 *
 * @returns {Object} Object
 */
export function deleteRecipeAction(id) {
  return {
    type: DELETE_RECIPE,
    id
  };
}

/**
 * @description - Edit Recipe Action
 * @export
 *
 * @param {Object} recipe
 *
 * @returns {Object} Object
 */
export function editRecipeAction(recipe) {
  return {
    type: EDIT_RECIPE,
    recipe
  };
}

/**
 * @description - Get User Recipes Action
 * @export - userRecipeAction
 *
 * @param {Object} data
 *
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
 * @description - Get User Favourited Recipes Id
 * @export - favouritedRecipesIdsAction
 *
 * @param {Array} favouritedRecipesIds
 *
 * @returns {Object} Object
 */
export function favouritedRecipesIdsAction(favouritedRecipesIds) {
  return {
    type: GET_USER_FAVOURITED_RECIPES_ID,
    favouritedRecipesIds
  };
}

/**
 * @description - Get Favourite Recipes Action
 * @export
 *
 * @param {Object} favouriteRecipes
 * @param {Number} pagination
 *
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
 * @description - Getting All Recipes Action
 * @export - allRecipesAction
 *
 * @param {Object} data
 * @param {Number} pagination
 *
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
 * @description - Get Popular Recipes Action
 * @export - popularRecipesAction
 *
 * @param {Object} popularRecipe
 *
 * @returns {Object} Object
 */
export function popularRecipesAction(popularRecipe) {
  return {
    type: GET_POPULAR_RECIPES,
    popularRecipe
  };
}

/**
 * @description - Get Recipe Categories Action
 * @export - recipeCategoriesAction
 *
 * @param {Object} data
 *
 * @returns {Object} Object
 */
export function recipeCategoriesAction(data) {
  return {
    type: RECIPE_CATEGORIES,
    recipeCategories: data.data
  };
}

/**
 * @description - Search Recipes Action
 * @export - searchRecipesAction
 *
 * @param {Object} data
 *
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
 * @description - Toggle Favourite Recipe Action
 * @export - toggleFavouriteRecipeAction
 *
 * @param {Object} favouritedRecipe
 *
 * @returns {Object} Object
 */
export function toggleFavouriteRecipeAction(favouritedRecipe) {
  return {
    type: TOGGLE_FAVOURITE_RECIPE,
    favouritedRecipe
  };
}

/**
 * @description - Toggle Thumbs Up Recipe Action
 * @export - toggleThumbsUpRecipeAction
 *
 * @param {Object} recipe
 *
 * @returns {Object} Object
 */
export function toggleThumbsUpRecipeAction(recipe) {
  return {
    type: TOGGLE_THUMBS_UP_RECIPE,
    recipe
  };
}

/**
 * @description - Toggle Thumbs Down Recipe Action
 * @export - toggleThumbsDownRecipeAction
 *
 * @param {recipe} recipe
 *
 * @returns {Object} Object
 */
export function toggleThumbsDownRecipeAction(recipe) {
  return {
    type: TOGGLE_THUMBS_DOWN_RECIPE,
    recipe
  };
}

/**
 * @description - Review Recipe Action
 * @export - reviewRecipeAction
 *
 * @param {Object} reviewBody
 *
 * @returns {Object} Object
 */
export function reviewRecipeAction(reviewBody) {
  return {
    type: REVIEW_RECIPE,
    reviewBody
  };
}

/**
 * @description - Get Recipe Review Action
 * @export - getRecipeReviewsAction
 *
 * @param {Object} data
 *
 * @returns {Object} Object
 */
export function getRecipeReviewsAction(data) {
  return {
    type: GET_RECIPE_REVIEWS,
    reviews: data.data,
    pagination: data.pagination
  };
}

/**
 * @description - All Recipe Action Creator
 * @export - allRecipes
 *
 * @param {Number} page
 * @param {limit} limit
 *
 * @returns {Object} Object
 */
export function allRecipes(page = 1, limit = 2, sortBy = undefined, orderBy = undefined) {
  return dispatch => axios.get(`/api/v1/recipes?sort=${sortBy}&order=${orderBy}&limit=${limit}&page=${page}`)
    .then((response) => {
      const { data, pagination } = response.data;
      return dispatch(allRecipesAction(data, pagination));
    })
    .catch(error => error);
}

/**
 * @description - Popular Recipe Action Creator
 * @export - popularRecipes
 *
 * @param {Number} limit
 *
 * @returns {Object} Object
 */
export function popularRecipes(limit) {
  return dispatch => axios.get(`api/v1/recipes/popular?limit=${limit}`)
    .then(response => dispatch(popularRecipesAction(response.data.data)))
    .catch(error => error);
}

/**
 * @description - Recipe Categories Action Creator
 * @export - recipeCategories
 *
 * @returns {Object} Object
 */
export function recipeCategories() {
  return dispatch => axios.get('/api/v1/recipes/categories')
    .then(response => dispatch(recipeCategoriesAction(response.data)));
}

/**
 * @description - Search Recipes Action Creator
 * @export - searchRecipes
 *
 * @param {String} search
 * @param {Number} page
 * @param {Number} limit
 *
 * @returns {Object} Object
 */
export function searchRecipes(search, page = 1, limit = 8) {
  return dispatch => axios.get(`api/v1/recipes/search_results?search=${search}&limit=${limit}&page=${page}`)
    .then((response) => {
      const { data } = response;
      dispatch(searchRecipesAction(data));
    });
}

/**
 * @description - Get Favourited Recipes Id's Action Creator
 * @export - getFavouritedRecipesIds
 *
 * @returns {Object} Object
 */
export function getFavouritedRecipesIds() {
  return dispatch => axios.get('/api/v1/users/fav-recipes/getIds')
    .then((response) => {
      const { data } = response.data;
      return dispatch(favouritedRecipesIdsAction(data));
    })
    .catch(error => error);
}

/**
 * @description - Get Favourited Recipes Action Creator
 * @export - getFavouritedRecipes
 *
 * @param {Number} page
 *
 * @returns {Object} Object
 */
export function getFavouritedRecipes(page = 1) {
  return dispatch => axios.get(`/api/v1/users/fav-recipes?limit=8&page=${page}`)
    .then((response) => {
      const { data, pagination } = response.data;
      return dispatch(favouritedRecipesAction(data, pagination));
    })
    .catch(error => error);
}

/**
 * @description - Add Recipe Action Creator
 * @export - addRecipe
 *
 * @param {Object} data
 *
 * @returns {Object} Object
 */
export function addRecipe(data) {
  return dispatch => axios.post('api/v1/recipes', data)
    .then((response) => {
      toastr.success('Recipe Added', 'Success');
      return dispatch(addRecipeAction(response.data.data));
    });
}

/**
 * @description - Toggle Favourited Recipe Action Creator
 * @export - toggleFavouriteRecipe
 *
 * @param {Number} id
 *
 * @returns {Object} Object
 */
export function toggleFavouriteRecipe(id) {
  return dispatch => axios.post(`/api/v1/users/fav-recipes/${id}/add`)
    .then((response) => {
      const { data } = response.data;
      return dispatch(toggleFavouriteRecipeAction(data));
    })
    .catch(error => error);
}

/**
 * @description - Toggle Thumbs Down Action Creator
 * @export - toggleThumbsDownRecipe
 *
 * @param {Number} id
 *
 * @returns {Object} Object
 */
export function toggleThumbsDownRecipe(id) {
  return dispatch => axios.put(`/api/v1/recipes/${id}/downvotes`)
    .then((response) => {
      const { data } = response.data;
      dispatch(toggleThumbsDownRecipeAction(data));
    })
    .catch(error => error);
}

/**
 * @description - Toggle Thumbs Up Action Creator
 * @export - toggleThumbsUpRecipe
 *
 * @param {Number} id
 *
 * @returns {Object} Object
 */
export function toggleThumbsUpRecipe(id) {
  return dispatch => axios.put(`/api/v1/recipes/${id}/upvotes`)
    .then(response => dispatch(toggleThumbsUpRecipeAction(response.data.data)))
    .catch(error => error);
}

/**
 * @description - Delete Recipe Action Creator
 * @export - deleteRecipe
 *
 * @param {Number} id
 *
 * @returns {Object} Object
 */
export function deleteRecipe(id) {
  return dispatch => axios.delete(`/api/v1/recipes/${id}`)
    .then(() => {
      toastr.success('Recipe Deleted', 'Success');
      return dispatch(deleteRecipeAction(id));
    })
    .catch(error => error);
}

/**
 * @description - Edit Recipe Action Creator
 * @export - editRecipe
 *
 * @param {Number} id,
 * @param {Object} data
 *
 * @returns {Object} Object
 */
export function editRecipe(id, data) {
  return dispatch => axios.put(`/api/v1/recipes/${id}`, data)
    .then((response) => {
      toastr.success('Recipe Updated', 'Success');
      return dispatch(editRecipeAction(response.data.data));
    })
    .catch((error) => {
      if (error) {
        return error.response;
      }
    });
}

/**
 * @description - Get Recipe Action Creator
 * @export - getRecipe
 *
 * @param {Number} id
 *
 * @returns {Object} Object
 */
export function getRecipe(id) {
  return dispatch => axios.get(`/api/v1/recipes/${id}`)
    .then(response => dispatch(getRecipeAction(response.data)))
    .catch(error => error);
}

/**
 * @description - Review Recipe Action Creator
 * @export - reviewRecipe
 *
 * @param {Number} id
 * @param {Object} data
 *
 * @returns {Object} Object
 */
export function reviewRecipe(id, data) {
  return dispatch => axios.post(`/api/v1/recipes/${id}/reviews`, data)
    .then((response) => {
      dispatch(reviewRecipeAction(response.data.data));
      toastr.success('Review Added');
    })
    .catch(error => error);
}

/**
 * @description - Get Recipe Reviews Action Creator
 * @export - getRecipeReviews
 *
 * @param {Number} id
 * @param {Number} limit
 * @param {Number} page
 *
 * @returns {Object} Object
 */
export function getRecipeReviews(id, limit, page) {
  return dispatch => axios
    .get(`/api/v1/recipes/${id}/reviews?limit=${limit}&page=${page}`)
    .then(response => dispatch(getRecipeReviewsAction(response.data)))
    .catch(error => error);
}

/**
 * @description - Get User Recipes Action Creator
 * @export - getUserRecipes
 * @param {Number} [page=1]
 * @param {Number} [limit=8]
 *
 * @returns {Object} Object
 */
export function getUserRecipes(page = 1, limit = 8) {
  return dispatch => axios.get(`api/v1/users/myrecipes?page=${page}&limit=${limit}`)
    .then((response) => {
      const { data } = response;
      return dispatch(userRecipesAction(data));
    })
    .catch(error => error);
}

