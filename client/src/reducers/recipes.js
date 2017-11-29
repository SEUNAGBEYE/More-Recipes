
import isEmpty from 'lodash/isEmpty';

// const initialState = [{
//   name: '',
//   description: '',
//   picture: '',
//   ingredrent: {},
//   steps: []
// }];

const initialState = []

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return [...state, action.recipe];  
    
    // case 'GET_RECIPE':
    // console.log('staterrrrrrrrr', state)
    //   return state.find(recipe => recipe.id == action.id)
  
    case 'GET_USER_RECIPES':
      return [...state, ...action.recipes];

    case 'GET_RECIPES':
      return [...state, ...action.allRecipes];

    case 'DELETE_RECIPE':
      return state.filter(recipe => recipe.id !== action.id);
    
    case 'EDIT_RECIPE':
      return state.filter(recipe => {
        recipe.id === action.id
      });
    
    // case 'GET_USER_FAVOURITED_RECIPES_ID':
    //   return {...state, ...action.favouritedRecipesIds};

      default: return state;
  }
};