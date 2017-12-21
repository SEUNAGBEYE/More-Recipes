
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case 'SET_CURRENT_USER':
    return {
      isAuthenticated: !isEmpty(action.user),
      user: action.user,
      userFavouritedRecipeId: !isEmpty(action.user && action.user.favoriteRecipe) ? [...action.user.favoriteRecipe.map(elem => elem.id)] : [],
      favouriteRecipes: !isEmpty(action.user && action.user.favoriteRecipe) ? [...action.user.favoriteRecipe] : []
    };
  default: return state;
  }
};

