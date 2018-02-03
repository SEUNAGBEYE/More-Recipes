
const initialState = {
  allRecipes: [],
  singleRecipe: '',
  pagination: '',
  userFavouritedRecipeId: [],
  favouriteRecipes: [],
  popularRecipes: [],
  recipeCategories: []
};

export default (state = initialState, action = {}) => {
  const singleRecipe = { ...state.singleRecipe };
  let allRecipes = [...state.allRecipes];
  const { recipe: recipeOnAction } = action;

  switch (action.type) {
  case 'ADD_RECIPE':
    return {
      ...state,
      ...{ allRecipes: [action.recipe, ...state.allRecipes] }
    };

  case 'GET_RECIPE':
    return { ...state, ...{ singleRecipe: action.recipe[0] } };

  case 'GET_USER_RECIPES':
    return {
      ...state,
      ...{
        allRecipes:
        action.recipes
      }
    };

  case 'GET_RECIPES':

    return {
      ...state,
      ...{
        allRecipes: action.allRecipes,
        pagination: action.pagination
      }
    };

  case 'RECIPE_CATEGORIES':

    return {
      ...state,
      ...{
        recipeCategories: action.recipeCategories,
      }
    };
  case 'GET_POPULAR_RECIPES':
    return {
      ...state,
      ...{
        popularRecipes: [...action.popularRecipe]
      }
    };

  case 'SEARCH_RECIPES':
    return {
      ...state,
      ...{
        allRecipes: [...action.recipes],
        pagination: action.pagination
      }
    };

  case 'DELETE_RECIPE':
    return {
      ...state,
      ...{ allRecipes: state.allRecipes.filter(recipe => recipe.id !== action.id) }
    };


  case 'EDIT_RECIPE':
    if (allRecipes.length >= 1) {
      allRecipes = allRecipes.map((recipe) => {
        if (parseInt(recipe.id, 10) === parseInt(action.recipe.id, 10)) {
          return action.recipe;
        }
        return recipe;
      });
    }

    return {
      ...state,
      ...{
        allRecipes,
        singleRecipe: { ...singleRecipe, ...{ recipeOnAction } }
      }
    };

  case 'TOGGLE_FAVOURITE_RECIPE':
    return {
      ...state,
      ...{
        favouriteRecipes: !state.userFavouritedRecipeId.includes(action.favouritedRecipe.id) ?
          [...state.favouriteRecipes, action.favouritedRecipe] :
          state.favouriteRecipes.filter(recipe => recipe.id != action.favouritedRecipe.id),

        userFavouritedRecipeId: !state.userFavouritedRecipeId.includes(action.favouritedRecipe.id) ?
          state.userFavouritedRecipeId.concat(action.favouritedRecipe.id) :
          state.userFavouritedRecipeId.filter(id => id !== action.favouritedRecipe.id),
        singleRecipe: action.favouritedRecipe
      }
    };

  case 'TOGGLE_THUMBS_UP_RECIPE':


    return {
      ...state,
      ...{
        allRecipes: [...state.allRecipes.map((recipe) => {
          if (recipe.id === action.recipe.id) {
            return action.recipe;
          }
          return recipe;
        })],
        favouriteRecipes: [...state.favouriteRecipes.map((recipe) => {
          if (recipe.id === action.recipe.id) {
            return action.recipe;
          }
          return recipe;
        })],
        singleRecipe: action.recipe
      }
    };

  case 'TOGGLE_THUMBS_DOWN_RECIPE':

    return {
      ...state,
      ...{
        allRecipes: [...state.allRecipes.map((recipe) => {
          if (recipe.id === action.recipe.id) {
            return action.recipe;
          }
          return recipe;
        })],
        favouriteRecipes: [...state.favouriteRecipes.map((recipe) => {
          if (recipe.id === action.recipe.id) {
            return action.recipe;
          }
          return recipe;
        })],
        singleRecipe: action.recipe
      }
    };

  case 'GET_FAVOURITED_RECIPES':
    return {
      ...state,
      favouriteRecipes: [...action.favouriteRecipes],
      pagination: action.pagination
    };

  case 'GET_USER_FAVOURITED_RECIPES_ID':
    return {
      ...state,
      ...{ userFavouritedRecipeId: action.favouritedRecipesIds }
    };
  case 'REVIEW_RECIPE':
    singleRecipe.reviews = [action.reviewBody, ...singleRecipe.reviews];
    return {
      ...state,
      ...{ singleRecipe: singleRecipe }
    };
  case 'GET_RECIPE_REVIEWS':
    singleRecipe.reviews = [...singleRecipe.reviews, ...action.reviews];
    return {
      ...state,
      ...{ singleRecipe: singleRecipe }
    };

  default: return state;
  }
};
