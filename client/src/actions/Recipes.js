import axios from 'axios';


export function setRecipe(recipe){
  return {
    type: 'ADD_RECIPE',
    recipe
  }
}

export function getRecipeAction(id){
  return {
    type: 'GET_RECIPE',
    id
  }
}

export function deleteRecipeAction(id){
  return {
    type: 'DELETE_RECIPE',
    id
  }
}

export function editRecipeAction(id, recipe){
  return {
    type: 'EDIT_RECIPE',
    id,
    recipe
  }
}

export function userRecipes(recipes){
  return {
    type: 'GET_USER_RECIPES',
    recipes
  }
}

export function favouritedRecipesIdsAction(favouritedRecipesIds){
  return {
    type: 'GET_USER_FAVOURITED_RECIPES_ID',
    favouritedRecipesIds
  }
}

export function favouritedRecipesAction(favouriteRecipes){
  return {
    type: 'GET_FAVOURITED_RECIPES',
    favouriteRecipes
  }
}

export function allRecipesAction(allRecipes){
  return {
    type: 'GET_RECIPES',
    allRecipes
  }
}

export function makeFavouriteRecipeAction(userFavouritedRecipeId){
  return {
    type: 'MAKE_FAVOURITE_RECIPE',
    userFavouritedRecipeId
  }
}


export function allRecipes(){
  return (dispatch) => {
      return axios.get('/api/v1/recipes')
      .then(res => {
        let allRecipes = res.data.recipes
        return dispatch(allRecipesAction(allRecipes))
      })
    .catch(error => console.log(error));
  }
}

export function getFavouritedRecipesIds(){
    return (dispatch) => {
      return axios.get('/api/v1/users/fav-recipes/getIds')
      .then(res => {
        let favouriteRecipes = res.data.favouriteRecipes
        return dispatch(favouritedRecipesAction({favouriteRecipes}))
      })
      .catch(error => console.log(error))
    }
}

export function getFavouritedRecipes(){
  return (dispatch) => {
    return axios.get('/api/v1/users/fav-recipes')
    .then(res => {
      let favouritedRecipes = res.data.favouritedRecipes
      return dispatch(favouritedRecipesAction(favouritedRecipes))
    })
    .catch(error => console.log(error))
  }
}

export function addRecipe(data){
  return (dispatch) => {
    return axios.post('api/v1/recipes', data)
    .then(res => {
      const recipe = res.data.recipe
      toastr.success('Recipe Added', 'Success')
      return dispatch(setRecipe(recipe)) 
    })
    .catch(error => {
      if(error){
        console.log(error.response.data)
      }
    })
  }
}

export function makeFavouriteRecipe(id){

  return (dispatch) => {
    return axios.post(`api/v1/users/fav-recipes/${id}/add`)
    .then(res => {
      const recipe = res.data.favouritedRecipesIds
      toastr.success('Recipe Favourited', 'Success')
      return dispatch(makeFavouriteRecipeAction(id)) 
    })
    .catch(error => {
      if(error){
        console.log(error.response.data)
        console.log(error.response.data)
      }
    })
  }
}

export function deleteRecipe(id){
  return (dispatch) => {
    return axios.delete(`api/v1/recipes/${id}`)
    .then(res => {
      toastr.success('Recipe Deleted', 'Success')
      return dispatch(deleteRecipeAction(id)) 
    })
    .catch(error => {
      if(error){
        console.log(error.response.data)
      }
    })
  }
}

export function editRecipe(id, recipe){
  return (dispatch) => {
    console.log('id', id, 'recipeToBeUpdated', recipe)
    return axios.put(`api/v1/recipes/${id}`, recipe)
    .then(res => {
      toastr.success('Recipe Updated', 'Success')
      return dispatch(editRecipeAction(id)) 
    })
    .catch(error => {
      if(error){
        console.log(error.response.data)
      }
    })
  }
}

export function getRecipe(id){
  return (dispatch) => {
    return axios.get(`/api/v1/recipes/${id}`)
    .then(res => {
      toastr.success('Recipe Gotten', 'Success')
      return dispatch(getRecipeAction(id)) 
    })
    .catch(error => {
      if(error){
        console.log('error', error)
        console.log(error.response.data)
      }
    })
  }
}

export function getUserRecipes(){
 return (dispatch) => {
    return axios.get('api/v1/users/myrecipes')
    .then(res => {
      const recipes = res.data.recipes
      return dispatch(userRecipes(recipes))
    })
    .catch(error => {
      if(error){
        console.log(error.response.data)
      }
    })
  }
}