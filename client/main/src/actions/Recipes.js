import axios from 'axios';

/**
 * @param {*} recipe
 * @return {obj} object
 */
export function setRecipe(recipe) {
  return {
    type: 'ADD_RECIPE',
    recipe
  };
}

/**
 * @export
 * @param {any} recipe
 * @returns {obj} obj
 */
export function getRecipeAction(recipe) {
  return {
    type: 'GET_RECIPE',
    id: recipe.id,
    recipe
  };
}

/**
 * @export
 * @param {any} id
 * @returns {obj} obj
 */
export function deleteRecipeAction(id) {
  return {
    type: 'DELETE_RECIPE',
    id
  };
}

/**
 * @export
 * @param {any} recipe
 * @returns {obj} obj
 */
export function editRecipeAction(recipe) {
  return {
    type: 'EDIT_RECIPE',
    id: recipe.id,
    recipe
  };
}

/**
 * @export
 * @param {any} recipes
 * @returns {obj} obj
 */
export function userRecipes(recipes) {
  return {
    type: 'GET_USER_RECIPES',
    recipes
  };
}

/**
 * @export
 * @param {any} favouritedRecipesIds
 * @returns {obj} obj
 */
export function favouritedRecipesIdsAction(favouritedRecipesIds) {
  return {
    type: 'GET_USER_FAVOURITED_RECIPES_ID',
    favouritedRecipesIds
  };
}

/**
 * @export
 * @param {any} favouriteRecipes
 * @param {any} pagination
 * @returns {obj} obj
 */
export function favouritedRecipesAction(favouriteRecipes, pagination) {
  return {
    type: 'GET_FAVOURITED_RECIPES',
    favouriteRecipes,
    pagination
  };
}

/**
 * @export
 * @param {any} allRecipes
 * @param {any} pagination
 * @returns {obj} obj
 */
export function allRecipesAction(allRecipes, pagination) {
  return {
    type: 'GET_RECIPES',
    allRecipes,
    pagination
  };
}

/**
 * @export
 * @param {any} popularRecipe
 * @returns {obj} obj
 */
export function popularRecipesAction(popularRecipe) {
  return {
    type: 'GET_POPULAR_RECIPES',
    popularRecipe
  };
}

/**
 * @export
 * @param {any} recipeCategories
 * @returns {obj} obj
 */
export function recipeCategoriesAction(recipeCategories) {
  return {
    type: 'RECIPE_CATEGORIES',
    recipeCategories
  };
}

/**
 * @export
 * @param {any} data
 * @returns {obj} obj
 */
export function searchRecipesAction(data) {
  return {
    type: 'SEARCH_RECIPES',
    recipes: data.data,
    pagination: data.pagination
  };
}

/**
 * @export
 * @param {any} favouritedRecipe
 * @returns {obj} obj
 */
export function toggleFavouriteRecipeAction(favouritedRecipe) {
  return {
    type: 'TOGGLE_FAVOURITE_RECIPE',
    favouritedRecipe
  };
}

/**
 * @export
 * @param {recipe} recipe
 * @returns {obj} obj
 */
export function toggleThumbsUpRecipeAction(recipe) {
  return {
    type: 'TOGGLE_THUMBS_UP_RECIPE',
    recipe
  };
}

/**
 * @export
 * @param {recipe} recipe
 * @returns {obj} obj
 */
export function toggleThumbsDownRecipeAction(recipe) {
  return {
    type: 'TOGGLE_THUMBS_DOWN_RECIPE',
    recipe
  };
}

/**
 * @export
 * @param {any} reviewBody
 * @returns {obj} obj
 */
export function reviewRecipeAction(reviewBody) {
  return {
    type: 'REVIEW_RECIPE',
    reviewBody
  };
}

/**
 * @export
 * @param {any} reviews
 * @returns {obj} obj
 */
export function getRecipeReviewsAction(reviews) {
  return {
    type: 'GET_RECIPE_REVIEWS',
    reviews
  };
}

/**
 * @export
 * @param {any} page
 * @param {any} limit
 * @returns {obj} obj
 */
export function allRecipes(page = 1, limit = 8) {
  return dispatch => axios.get(`/api/v1/recipes?limit=${limit}&page=${page}`)
    .then((res) => {
      const { data: allRecipes, pagination } = res.data;
      return dispatch(allRecipesAction(allRecipes, pagination));
    })
    .catch(error => console.log(error));
}

/**
 * @export
 * @param {limit} limit
 * @returns {obj} obj
 */
export function popularRecipes(limit) {
  return dispatch => axios.get(`api/v1/recipes/popular?limit=${limit}`)
    .then(res => dispatch(popularRecipesAction(res.data.data)))
    .catch(error => console.log(error));
}

/**
 * @export
 * @returns {obj} obj
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
 * @returns {obj} obj
 */
export function searchRecipes(search, page = 0, limit = 8) {
  return dispatch => axios.get(`api/v1/recipes/search_results?search=${search}&limit=${limit}&page=${page}`)
    .then((res) => {
      const { data } = res;
      dispatch(searchRecipesAction(data));
    });
}

/**
 * @export
 * @returns {obj} obj
 */
export function getFavouritedRecipesIds() {
  return dispatch => axios.get('/api/v1/users/fav-recipes/getIds')
    .then((res) => {
      const { data } = res.data;
      return dispatch(favouritedRecipesIdsAction(data));
    })
    .catch(error => console.log(error));
}

/**
 * @export
 * @param {any} page
 * @returns {obj} obj
 */
export function getFavouritedRecipes(page) {
  return dispatch => axios.get(`/api/v1/users/fav-recipes?limit=8&page=${page}`)
    .then((res) => {
      const { data, pagination } = res.data;
      return dispatch(favouritedRecipesAction(data, pagination));
    })
    .catch(error => console.log(error.message));
}

/**
 * @export
 * @param {any} data
 * @returns {obj} obj
 */
export function addRecipe(data) {
  return dispatch => axios.post('api/v1/recipes', data)
    .then((res) => {
      toastr.success('Recipe Added', 'Success');
      return dispatch(setRecipe(res.data.data));
    });
}

/**
 * @export
 * @param {any} id
 * @returns {obj} obj
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
 * @returns {obj} obj
 */
export function toggleThumbsDownRecipe(id) {
  return dispatch => axios.put(`/api/v1/recipes/${id}/downvotes`)
    .then(res => dispatch(toggleThumbsDownRecipeAction(res.data.data)))
    .catch(error => console.log(error));
}

/**
 * @export
 * @param {id} id
 * @returns {obj} obj
 */
export function toggleThumbsUpRecipe(id) {
  return dispatch => axios.put(`/api/v1/recipes/${id}/upvotes`)
    .then(res => dispatch(toggleThumbsUpRecipeAction(res.data.data)))
    .catch(error => console.log(error));
}

/**
 * @export
 * @param {any} id
 * @returns {obj} obj
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
 * @param {any} id,
 * @param {any} recipe
 * @returns {obj} obj
 */
export function editRecipe(id, recipe) {
  return dispatch => axios.put(`/api/v1/recipes/${id}`, recipe)
    .then((res) => {
      toastr.success('Recipe Updated', 'Success');
      return dispatch(editRecipeAction(res.data.data));
    })
    .catch((error) => {
      if (error) {
        console.log(error);
        // console.log(error.response.data);
      }
    });
}

/**
 * @export
 * @param {any} id
 * @returns {obj} obj
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
 * @param {any} id
 * @param {any} data
 * @returns {obj} obj
 */
export function reviewRecipe(id, data) {
  return dispatch => axios.post(`/api/v1/recipes/${id}/reviews`, data)
    .then((res) => {
      dispatch(reviewRecipeAction(res.data.data));
      toastr.success('Review Added');
    })
    .catch((error) => {
      console.log('error', error);
    });
}

/**
 * @export
 * @param {any} id
 * @param {any} limit
 * @param {any} offset
 * @returns {obj} obj
 */
export function getRecipeReviews(id, limit, offset) {
  return dispatch => axios.get(`/api/v1/recipes/${id}/reviews?limit=${limit}&offset=${offset}`)
    .then((res) => {
      dispatch(getRecipeReviewsAction(res.data.data));
    })
    .catch((error) => {
      console.log('error', error);
    });
}

/**
 * @export
 * @returns {obj} obj
 */
export function getUserRecipes() {
  return dispatch => axios.get('api/v1/users/myrecipes')
    .then((res) => {
      const { data } = res.data;
      return dispatch(userRecipes(data));
    })
    .catch((error) => {
      if (error) {
        console.log(error.response.data);
      }
    });
}

