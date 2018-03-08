
import React from 'react';
import { shallow, mount } from 'enzyme';
import { RecipeDetail, mapStateToProps } from '../../main/src/components/recipes/RecipeDetail';

const state = {
  auth: {
    user: {
      userId: 1,
      firstName: 'Seun',
      lastName: 'Agbeye'
    },
    isAuthenticated: true
  },
  recipes: {
    userFavouritedRecipeId: [1,2,4],
    singleRecipe: recipe
  }
};

const recipe = {
  name: 'Amala',
  image: 'This is the image',
  id: 1,
  upvotes: [],
  downvotes: [],
  ingredients: [],
  steps: [],
  reviews:[]
}

const props = {
  recipe,
  user: state.auth.user,
  myFavouriteRecipes: [],
  reviewRecipe: jest.fn(),
  toggleFavouriteRecipe: jest.fn(),
  toggleThumbsDownRecipe: jest.fn(),
  toggleThumbsUpRecipe: jest.fn(),
  editRecipe: jest.fn(),
  getRecipeReviews: jest.fn(),
  reviewBody: 'This is my review',
  getRecipe: (() =>new Promise((resolve, reject) => {
    recipe ? resolve(recipe) : reject('Recipe not found');
  })),
  deleteRecipe: (() =>new Promise((resolve, reject) => {
    recipe ? resolve(recipe) : reject('Recipe not found');
  })),
  isAuthenticated: state.auth.isAuthenticated,
  history: {
    push: (() => {})
  },
  match: {
    params: {
      id: 1
    }
  },
  user: {
    firstName: 'Seun',
    lastName: 'Agbeye'
  }
};

const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'reviewBody',
    value: 'This is my review',
    id: 1
  }
}

describe('# RecipeDetail', () => {
  const wrapper = shallow(
      <RecipeDetail {...props} />
  );

  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
    done();
  });

  it('should call onChange', (done) => {
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange')
    wrapper.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    done();
  });
  
  it('should call reviewRecipe', (done) => {
    const reviewRecipeSpy = jest.spyOn(wrapper.instance(), 'reviewRecipe')
    wrapper.instance().reviewRecipe(event);
    expect(reviewRecipeSpy).toHaveBeenCalledTimes(1);
    done();
  });
  it('should call deleteRecipe', (done) => {
    const deleteRecipeSpy = jest.spyOn(wrapper.instance(), 'deleteRecipe')
    wrapper.instance().deleteRecipe(event);
    expect(deleteRecipeSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call toggleFavouriteRecipe', (done) => {
    const toggleFavouriteRecipeSpy = jest.spyOn(wrapper.instance(), 'toggleFavouriteRecipe')
    wrapper.instance().toggleFavouriteRecipe(event);
    expect(toggleFavouriteRecipeSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call toggleThumbsUpRecipe', (done) => {
    const toggleThumbsUpRecipeSpy = jest.spyOn(wrapper.instance(), 'toggleThumbsUpRecipe')
    wrapper.instance().toggleThumbsUpRecipe(event);
    expect(toggleThumbsUpRecipeSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call toggleThumbsDownRecipe', (done) => {
    const toggleThumbsDownRecipeSpy = jest.spyOn(wrapper.instance(), 'toggleThumbsDownRecipe')
    wrapper.instance().toggleThumbsDownRecipe(event);
    expect(toggleThumbsDownRecipeSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call viewMoreReviews', (done) => {
    const viewMoreReviewsSpy = jest.spyOn(wrapper.instance(), 'viewMoreReviews')
    wrapper.instance().viewMoreReviews(event);
    expect(viewMoreReviewsSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call mapStateToProps(state)', (done) => {
    mapStateToProps(state);
    done();
  }); 
});
