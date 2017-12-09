
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
  userFavouritedRecipeId: '',
  favouriteRecipes: '',
  favouritedRecipesCount: ''
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        userFavouritedRecipeId: !isEmpty(action.user && action.user.favoriteRecipe) ? [...action.user.favoriteRecipe] : []
      };
    
    case 'MAKE_FAVOURITE_RECIPE':
      console.log('got here too')

      return {...state, ...{
        userFavouritedRecipeId: !state.userFavouritedRecipeId.includes(action.userFavouritedRecipeId) 
        ? state.userFavouritedRecipeId.concat(action.userFavouritedRecipeId) 
        : state.userFavouritedRecipeId.filter(id => id !=action.userFavouritedRecipeId)
        }
      }

    case 'GET_FAVOURITED_RECIPES':
      let {favouriteRecipes, favouritedRecipesCount} = action
      console.log('fav here too', action.favouriteRecipes, action.favouritedRecipesCount)
      return {...state, ...{
        favouriteRecipes: [...state.favouriteRecipes, ...action.favouriteRecipes],
        favouritedRecipesCount: action.favouritedRecipesCount
        }
      }
    
    case 'GET_USER_FAVOURITED_RECIPES_ID':
    let { favouritedRecipesIds: userFavouritedRecipeId}  = action
      return {...state, ...{userFavouritedRecipeId}}
     
    default: return state;
  }
};

