
import isEmpty from 'lodash/isEmpty';

const initialState = {
  name: '',
  description: '',
  picture: '',
  ingredrent: {},
  steps: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return [...state, action.recipe];
    
    case 'GET_RECIPE':
      return state.filter(recipe => recipe.id == action.id)
  
    case 'GET_USER_RECIPES':
      return [...state, ...action.recipes];

    case 'DELETE_RECIPE':
      return state.filter(recipe => recipe.id !== action.id);
    
    case 'EDIT_RECIPE':
      return state.filter(recipe => {
        recipe.id === action.id
      });

      default: return state;
  }
};