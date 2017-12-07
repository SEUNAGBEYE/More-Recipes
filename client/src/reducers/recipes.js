
import isEmpty from 'lodash/isEmpty';

// const initialState = [{
//   name: '',
//   description: '',
//   picture: '',
//   ingredrent: {},
//   steps: []
// }];

const initialState = {
  allRecipes: [],
  recipesCount: '',
  userFavouritedRecipeId: [],
  favouriteRecipes: [],
  // favouritedRecipesCount: '',
  // userRecipes: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case 'ADD_RECIPE':
    return [...state, action.recipe];

  case 'GET_RECIPE':
    console.log('staterrrrrrrrr', state);
    return state.allRecipe.find(recipe => recipe.id === action.id);

  case 'GET_USER_RECIPES':
    return {
      ...state,
      ...{
        allRecipes:
        action.recipes
      }
    };

  case 'GET_RECIPES':
    const { allRecipes, recipesCount } = action;
    return { ...state, ...{ allRecipes, recipesCount } };

  case 'DELETE_RECIPE':
    return state.allRecipe.filter(recipe => recipe.id !== action.id);


  case 'EDIT_RECIPE':
    console.log('editting', action.recipe);

    const allRecipe = state.allRecipes.filter(recipe => recipe.id != action.recipe.id);
    console.log('recipes', state.allRecipes);
    return { ...state, ...{ allRecipes: [...allRecipe, action.recipe] } };

    // case 'GET_USER_FAVOURITED_RECIPES_ID':
    //   return {...state, ...action.favouritedRecipesIds};

  case 'TOGGLE_FAVOURITE_RECIPE':
    console.log('got here too', action.favouritedRecipe, action.favouritedRecipe.id);
    // state.userFavouritedRecipeId.filter(id => {
    //   console.log(id !=action.favouritedRecipe.id, id , action.favoriteRecipe.id)})
    return {
      ...state,
      ...{
        favouriteRecipes: !state.userFavouritedRecipeId.includes(action.favouritedRecipe.id)
          ? [...state.favouriteRecipes, action.favouritedRecipe]
          : state.favouriteRecipes.filter(recipe => recipe.id != action.favouritedRecipe.id),

        userFavouritedRecipeId: !state.userFavouritedRecipeId.includes(action.favouritedRecipe.id)
          ? state.userFavouritedRecipeId.concat(action.favouritedRecipe.id)
          : state.userFavouritedRecipeId.filter(id => id !== action.favouritedRecipe.id)
      }
    };

  case 'GET_FAVOURITED_RECIPES':
    // const { favouriteRecipes, favouritedRecipesCount } = action;
    return {
      ...state,
      favouriteRecipes: [...action.favouriteRecipes],
      recipesCount: action.favouritedRecipesCount
    };

  case 'GET_USER_FAVOURITED_RECIPES_ID':
    const { favouritedRecipesIds: userFavouritedRecipeId } = action;
    return { ...state, ...{ userFavouritedRecipeId: action.favouritedRecipesIds } };

  default: return state;
  }
};
