import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';

import { addRecipe,
  editRecipe,
  getRecipe,
  deleteRecipe,
  allRecipes,
  getUserRecipes,
  getFavouritedRecipes,
  getFavouritedRecipesIds,
  getRecipeReviews,
  reviewRecipe,
  toggleFavouriteRecipe,
  toggleThumbsDownRecipe,
  toggleThumbsUpRecipe,
  searchRecipes,
  popularRecipes,
  recipeCategories
} from '../../main/src/actions/Recipes';
import { recipeResponse,
} from '../__mocks__/actions/recipe';

import actionTypes from '../../main/src/actions/actionTypes';

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

const mockStore = configureMockStore([thunk]);

describe('Recipes', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());


  describe('Create Recipe', () => {
    it(`should dispatch ${ADD_RECIPE} when a recipe is succussfully created`, () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipeResponse
        });
      });

      const expectedAction = [
        {
          type: ADD_RECIPE,
          recipe: recipeResponse.data
        }
      ];
      const store = mockStore({ });
      return store.dispatch(addRecipe({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('Edit Recipe', () => {
    it(`should dispatch ${EDIT_RECIPE} when a recipe is succussfully edited`, () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipeResponse
        });
      });

      const expectedAction = [
        {
          type: EDIT_RECIPE,
          recipe: recipeResponse.data
        }
      ];
      const store = mockStore({ });
      return store.dispatch(editRecipe({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('Get Recipe', () => {
    it(`should dispatch ${GET_RECIPE} when a recipe is succussfully retrieved`, () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipeResponse
        });
      });

      const expectedAction = [
        {
          type: GET_RECIPE,
          recipe: recipeResponse.data
        }
      ];
      const store = mockStore({ });
      return store.dispatch(getRecipe({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('Delete Recipe', () => {
    it(`should dispatch ${DELETE_RECIPE} when a recipe is succussfully deleted`, () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipeResponse
        });
      });

      const expectedAction = [
        {
          type: DELETE_RECIPE,
          id: recipeResponse.data.id
        }
      ];
      const store = mockStore({ });
      return store.dispatch(deleteRecipe(recipeResponse.data.id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('All Recipe', () => {
    it(`should dispatch ${GET_RECIPES} when all recipes is succussfully retrieved`, () => {
      const data = {
        data: [recipeResponse.data, recipeResponse.data],
        pagination: 2
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data
        });
      });

      const expectedAction = [
        {
          type: GET_RECIPES,
          recipes: data.data,
          pagination: data.pagination
        }
      ];


      const store = mockStore({ });
      return store.dispatch(allRecipes({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('User Recipe', () => {
    it(`should dispatch ${GET_USER_RECIPES} when user recipes is succussfully retrieved`, () => {
      const data = {
        data: [recipeResponse.data, recipeResponse.data],
        pagination: 2
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data
        });
      });

      const expectedAction = [
        {
          type: GET_USER_RECIPES,
          recipes: data.data,
          pagination: data.pagination
        }
      ];


      const store = mockStore({ });
      return store.dispatch(getUserRecipes({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('Toggle Favourited Recipes', () => {
    it(`should dispatch ${TOGGLE_FAVOURITE_RECIPE} when a user adds/removes a recipe from his/her favourite collections`, () => {
      const data = {
        data: [recipeResponse, recipeResponse]
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data
        });
      });

      const expectedAction = [
        {
          type: TOGGLE_FAVOURITE_RECIPE,
          favouritedRecipe: data.data,
        }
      ];

      const store = mockStore({ });
      return store.dispatch(toggleFavouriteRecipe({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('Review Recipes', () => {
    it(`should dispatch ${REVIEW_RECIPE} when a user succussfully review a recipe`, () => {
      const data = {
        data: 'This is my review'
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data
        });
      });

      const expectedAction = [
        {
          type: REVIEW_RECIPE,
          reviewBody: data.data,
        }
      ];

      const store = mockStore({ });
      return store.dispatch(reviewRecipe({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('ReviewRecipes', () => {
    it(`should dispatch ${GET_RECIPE_REVIEWS} when a user get all recipe reviews`, () => {
      const data = {
        data: ['This is my review', 'This is the second review']
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data
        });
      });

      const expectedAction = [
        {
          type: GET_RECIPE_REVIEWS,
          reviews: data.data,
        }
      ];

      const store = mockStore({ });
      return store.dispatch(getRecipeReviews({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('Get Popular Recipes', () => {
    it(`should dispatch ${GET_POPULAR_RECIPES} when popular recipes is succussfully retrieved`, () => {
      const data = {
        data: [recipeResponse.data, recipeResponse.data]
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data
        });
      });

      const expectedAction = [
        {
          type: GET_POPULAR_RECIPES,
          popularRecipe: data.data,
        }
      ];

      const store = mockStore({ });
      return store.dispatch(popularRecipes({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('Search Recipes', () => {
    it(`should dispatch ${SEARCH_RECIPES} when a user search for recipes`, () => {
      const data = {
        data: [recipeResponse.data, recipeResponse.data],
        pagination: 2
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data
        });
      });

      const expectedAction = [
        {
          type: SEARCH_RECIPES,
          recipes: data.data,
          pagination: data.pagination
        }
      ];

      const store = mockStore({ });
      return store.dispatch(searchRecipes({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('Recipe Categories', () => {
    it(`should dispatch ${RECIPE_CATEGORIES} when recipe categories is succussfully retrieved`, () => {
      const data = {
        data: [recipeResponse.data, recipeResponse.data],
        pagination: 2
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data
        });
      });

      const expectedAction = [
        {
          type: RECIPE_CATEGORIES,
          recipeCategories: data.data,
        }
      ];

      const store = mockStore({ });
      return store.dispatch(recipeCategories({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('Toggle Thumbs Down Recipe', () => {
    it(`should dispatch ${TOGGLE_THUMBS_DOWN_RECIPE} when a user succussfully downvotes/undownvoted a recipe`, () => {
      const { data } = recipeResponse;
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { data }
        });
      });

      const expectedAction = [
        {
          type: TOGGLE_THUMBS_DOWN_RECIPE,
          recipe: data
        }
      ];

      const store = mockStore({ });
      return store.dispatch(toggleThumbsDownRecipe({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('Toggle Thumbs Up Recipe', () => {
    it(`should dispatch ${TOGGLE_THUMBS_UP_RECIPE} when a user succussfully upvotes/unupvoted a reciped`, () => {
      const { data } = recipeResponse;
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { data }
        });
      });

      const expectedAction = [
        {
          type: TOGGLE_THUMBS_UP_RECIPE,
          recipe: data
        }
      ];

      const store = mockStore({ });
      return store.dispatch(toggleThumbsUpRecipe({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe("User Favourited Recipes ID's", () => {
    it(`should dispatch ${GET_USER_FAVOURITED_RECIPES_ID} when user favourited recipes id"s is succussfully retrieved`, () => {
      const data = {
        data: [recipeResponse.id, recipeResponse.getFavouritedRecipesIds],
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data
        });
      });

      const expectedAction = [
        {
          type: GET_USER_FAVOURITED_RECIPES_ID,
          favouritedRecipesIds: data.data
        }
      ];

      const store = mockStore({ });
      return store.dispatch(getFavouritedRecipesIds({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('User Favourited Recipes', () => {
    it(`should dispatch ${GET_FAVOURITED_RECIPES} when user favourited recipes is succussfully retrieved`, () => {
      const data = {
        data: [recipeResponse, recipeResponse],
        pagination: 2
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data
        });
      });

      const expectedAction = [
        {
          type: GET_FAVOURITED_RECIPES,
          favouriteRecipes: data.data,
          pagination: data.pagination
        }
      ];

      const store = mockStore({ });
      return store.dispatch(getFavouritedRecipes({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });
});
