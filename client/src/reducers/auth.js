
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
  userFavouritedRecipeId: [],
  favoriteRecipes: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        userFavouritedRecipeId: !isEmpty(action.user) ? [...action.user.favoriteRecipe] : []
      };
    
    case 'MAKE_FAVOURITE_RECIPE':
      console.log('got here too')

      return {...state, ...{
        userFavouritedRecipeId: !state.userFavouritedRecipeId.includes(action.userFavouritedRecipeId) 
        ? state.userFavouritedRecipeId.concat(action.userFavouritedRecipeId) 
        : state.userFavouritedRecipeId.filter(id => id !=action.userFavouritedRecipeId)
        }
      }

    case 'GET_FAVOURITED_RECIPED':
      console.log('fav here too')
      return {...state, ...{
        favouritedRecipes: [...state.favoriteRecipes, ...action.favoriteRecipes]
        }
      }
    
    case 'GET_USER_FAVOURITED_RECIPES_ID':
      return { ...state, ...favouritedRecipesIds}
      
    default: return state;
  }
};

