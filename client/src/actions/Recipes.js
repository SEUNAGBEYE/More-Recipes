import axios from 'axios';


  export function allRecipes(){
    axios.get('/api/v1/recipes')
    .then((res) => res.data) // Transform the data into json
    .then((data) => {
      console.log(data)
      return data;
      })
    .catch(error => {
      console.log(error);
      return error;
    })
  }

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