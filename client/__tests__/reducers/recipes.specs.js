import expect from 'expect';
import recipeReducer, { initialState,
  actionTypes
} from '../../main/src/reducers/recipes';
import {
  addRecipeAction,
  getRecipeAction,
  allRecipesAction,
  userRecipesAction,
  favouritedRecipesIdsAction,
  favouritedRecipesAction,
  popularRecipesAction,
  getRecipeReviewsAction,
  recipeCategoriesAction,
  searchRecipesAction,
  deleteRecipeAction,
  editRecipeAction,
  toggleFavouriteRecipeAction,
  toggleThumbsUpRecipeAction,
  toggleThumbsDownRecipeAction,
  reviewRecipeAction,
} from '../../main/src/actions/Recipes';
import {
  recipeObject,
  allRecipesObject,
  userRecipesObject,
  favouritedRecipesIdsObject,
  recipeReviewsObject,
  recipeCategoriesObject,
  searchResultsObject
} from '../__mocks__/reducers/recipe';

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

describe('Recipe Reducer', () => {
  it('should return initial state for unknown action types', () => {
    const state = recipeReducer(undefined);
    expect(state).toEqual(state);
  });

  it(`should handle ${ADD_RECIPE} action type`, () => {
    const action = addRecipeAction(recipeObject);
    const state = recipeReducer(initialState, action);
    expect(state.allRecipes[0]).toEqual(recipeObject);
  });

  it(`should handle ${GET_RECIPE} action type`, () => {
    const action = getRecipeAction({ data: recipeObject, pagination: 2 });
    const state = recipeReducer(initialState, action);
    expect(state.singleRecipe).toEqual(recipeObject);
  });

  it(`should handle ${GET_RECIPES} action type`, () => {
    const action = allRecipesAction(allRecipesObject, 1);
    const state = recipeReducer(initialState, action);
    expect(state.allRecipes).toEqual(allRecipesObject);
    expect(state.allRecipes).toEqual(expect.arrayContaining(allRecipesObject));
    expect(state.allRecipes).toHaveLength(2);
  });

  it(`should handle ${GET_USER_RECIPES} action type`, () => {
    const action = userRecipesAction(userRecipesObject);
    const state = recipeReducer(initialState, action);
    expect(state.allRecipes).toEqual(allRecipesObject);
    expect(state.allRecipes).toEqual(expect.arrayContaining(allRecipesObject));
    expect(state.allRecipes).toHaveLength(2);
  });

  it(`should handle ${GET_USER_FAVOURITED_RECIPES_ID} action type`, () => {
    const action = favouritedRecipesIdsAction(favouritedRecipesIdsObject);
    const state = recipeReducer(initialState, action);
    expect(state.userFavouritedRecipeId).toEqual(favouritedRecipesIdsObject);
    expect(state.userFavouritedRecipeId)
      .toEqual(expect.arrayContaining(favouritedRecipesIdsObject));
    expect(state.userFavouritedRecipeId).toHaveLength(5);
  });

  it(`should handle ${GET_FAVOURITED_RECIPES} action type`, () => {
    const action = favouritedRecipesAction(allRecipesObject);
    const state = recipeReducer(initialState, action);
    expect(state.favouriteRecipes).toEqual(allRecipesObject);
    expect(state.favouriteRecipes).toEqual(expect.arrayContaining(allRecipesObject));
    expect(state.favouriteRecipes).toHaveLength(2);
  });

  it(`should handle ${GET_POPULAR_RECIPES} action type`, () => {
    const action = popularRecipesAction(allRecipesObject);
    const state = recipeReducer(initialState, action);
    expect(state.popularRecipes).toEqual(allRecipesObject);
    expect(state.popularRecipes).toEqual(expect.arrayContaining(allRecipesObject));
    expect(state.popularRecipes).toHaveLength(2);
  });

  it(`should handle ${GET_RECIPE_REVIEWS} action type`, () => {
    const action = getRecipeReviewsAction({ data: recipeReviewsObject.reviews, pagination: 1 });
    const state = recipeReducer(initialState, action);
    expect(state.singleRecipe).toEqual(recipeReviewsObject);
    expect(state.singleRecipe.reviews)
      .toEqual(expect.arrayContaining(recipeReviewsObject.reviews));
    expect(state.singleRecipe.reviews).toHaveLength(2);
  });

  it(`should handle ${RECIPE_CATEGORIES} action type`, () => {
    const action = recipeCategoriesAction(recipeCategoriesObject);
    const state = recipeReducer(initialState, action);
    expect(state.recipeCategories).toEqual(recipeCategoriesObject);
    expect(state.recipeCategories)
      .toEqual(expect.arrayContaining(recipeCategoriesObject));
    expect(state.recipeCategories).toHaveLength(2);
  });

  it(`should handle ${SEARCH_RECIPES} action type`, () => {
    const action = searchRecipesAction(searchResultsObject);
    const state = recipeReducer(initialState, action);
    expect(state.allRecipes).toEqual(searchResultsObject.data);
    expect(state.allRecipes)
      .toEqual(expect.arrayContaining(searchResultsObject.data));
    expect(state.allRecipes).toHaveLength(2);
  });

  it(`should handle ${DELETE_RECIPE} action type`, () => {
    const action = deleteRecipeAction(1);
    const state = recipeReducer(initialState, action);
    expect(state.allRecipes).toEqual([]);
    expect(state.allRecipes).toHaveLength(0);
  });

  it(`should handle ${EDIT_RECIPE} action type`, () => {
    const action = editRecipeAction(recipeObject);
    const state = recipeReducer(initialState, action);
    expect(state.singleRecipe).toEqual(recipeObject);
  });

  it(`should handle ${TOGGLE_FAVOURITE_RECIPE} action type`, () => {
    const action = toggleFavouriteRecipeAction(recipeObject, 2);
    const state = recipeReducer(initialState, action);
    expect(state.favouriteRecipes[0]).toEqual(recipeObject);
  });

  it(`should handle ${TOGGLE_THUMBS_UP_RECIPE} action type`, () => {
    const action = toggleThumbsUpRecipeAction(recipeObject, 2);
    const state = recipeReducer(initialState, action);
    expect(state.singleRecipe).toEqual(recipeObject);
  });

  it(`should handle ${TOGGLE_THUMBS_DOWN_RECIPE} action type`, () => {
    const action = toggleThumbsDownRecipeAction(recipeObject);
    const state = recipeReducer(initialState, action);
    expect(state.singleRecipe).toEqual(recipeObject);
  });

  it(`should handle ${REVIEW_RECIPE} action type`, () => {
    const reviewBody = 'This is my review';
    const action = reviewRecipeAction(reviewBody);
    const state = recipeReducer(initialState, action);
    expect(state.singleRecipe.reviews[0]).toEqual(reviewBody);
  });
});
