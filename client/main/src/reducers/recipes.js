import actionTypes from '../actions/actionTypes';

const {
  GET_RECIPE,
  GET_RECIPES,
  GET_USER_RECIPES,
  GET_USER_FAVOURITED_RECIPES_ID,
  GET_FAVOURITED_RECIPES,
  GET_POPULAR_RECIPES,
  GET_RECIPE_REVIEWS,
  RECIPE_CATEGORIES,
  SEARCH_RECIPES,
  ADD_RECIPE,
  DELETE_RECIPE,
  EDIT_RECIPE,
  TOGGLE_FAVOURITE_RECIPE,
  TOGGLE_THUMBS_UP_RECIPE,
  TOGGLE_THUMBS_DOWN_RECIPE,
  REVIEW_RECIPE
} = actionTypes;

export const initialState = {
  allRecipes: [],
  singleRecipe: {
    id: '',
    name: '',
    image: '',
    categoryId: '',
    userId: '',
    upvotes: [],
    downvotes: [],
    views: [],
    description: '',
    reviews: []
  },
  pagination: '',
  userFavouritedRecipeId: [],
  favouriteRecipes: [],
  popularRecipes: [],
  recipeCategories: [],
  loaded: false
};

export default (state = initialState, action = {}) => {
  const singleRecipe = { ...state.singleRecipe };
  let allRecipes = [...state.allRecipes];
  const { recipe: recipeOnAction } = action;

  switch (action.type) {
  case ADD_RECIPE:
    return {
      ...state,
      ...{ allRecipes: [action.recipe, ...state.allRecipes] }
    };

  case GET_RECIPE:
    return {
      ...state,
      ...{
        singleRecipe: action.recipe,
        pagination: action.pagination,
        loaded: true
      }
    };

  case GET_USER_RECIPES:
    return {
      ...state,
      ...{
        allRecipes: action.recipes,
        pagination: action.pagination
      }
    };

  case GET_RECIPES:
    return {
      ...state,
      ...{
        allRecipes: action.recipes,
        pagination: action.pagination,
        loaded: true
      }
    };

  case RECIPE_CATEGORIES:
    return {
      ...state,
      ...{
        recipeCategories: action.recipeCategories,
        loaded: true
      }
    };
  case GET_POPULAR_RECIPES:
    return {
      ...state,
      ...{
        popularRecipes: [...action.popularRecipe],
        loaded: true
      }
    };

  case SEARCH_RECIPES:
    return {
      ...state,
      ...{
        allRecipes: [...action.recipes],
        pagination: action.pagination
      }
    };

  case DELETE_RECIPE:
    return {
      ...state,
      ...{
        allRecipes: state.allRecipes
          .filter(recipe => parseInt(recipe.id, 10) !== parseInt(action.id, 10))
      }
    };


  case EDIT_RECIPE:
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
        singleRecipe: { ...singleRecipe, ...recipeOnAction }
      }
    };

  case TOGGLE_FAVOURITE_RECIPE:
    return {
      ...state,
      ...{
        favouriteRecipes: !state.userFavouritedRecipeId
          .includes(action.favouritedRecipe.id) ?
          [...state.favouriteRecipes, action.favouritedRecipe] :
          state.favouriteRecipes
            .filter(recipe => recipe.id != action.favouritedRecipe.id),

        userFavouritedRecipeId: !state.userFavouritedRecipeId
          .includes(action.favouritedRecipe.id) ?
          state.userFavouritedRecipeId.concat(action.favouritedRecipe.id) :
          state.userFavouritedRecipeId
            .filter(id => id !== action.favouritedRecipe.id),
        singleRecipe: action.favouritedRecipe
      }
    };

  case TOGGLE_THUMBS_UP_RECIPE:
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

  case TOGGLE_THUMBS_DOWN_RECIPE:
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

  case GET_FAVOURITED_RECIPES:
    return {
      ...state,
      favouriteRecipes: [...action.favouriteRecipes],
      pagination: action.pagination
    };

  case GET_USER_FAVOURITED_RECIPES_ID:
    return {
      ...state,
      ...{ userFavouritedRecipeId: action.favouritedRecipesIds }
    };
  case REVIEW_RECIPE:
    singleRecipe.reviews = [action.reviewBody, ...singleRecipe.reviews];
    return {
      ...state,
      ...{ singleRecipe }
    };
  case GET_RECIPE_REVIEWS:
    singleRecipe.reviews = [...singleRecipe.reviews, ...action.reviews];
    return {
      ...state,
      ...{
        singleRecipe,
        pagination: action.pagination
      }
    };

  default: return {
    ...state,
    ...{ loaded: true }
  };
  }
};

export { actionTypes };
