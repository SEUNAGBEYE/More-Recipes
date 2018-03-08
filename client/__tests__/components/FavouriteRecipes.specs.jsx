
import React from 'react';
import { shallow } from 'enzyme';
import { FavouriteRecipes, mapStateToProps } from '../../main/src/components/recipes/FavouriteRecipes';

const state = {
  auth: {
    user: {
      firstName: 'Seun',
      lastName: 'Agbeye'
    }
  },
  recipes: {
    recipeCategories: [{
      id: 1,
      name: 'Breakfast'
    }],
    popularRecipes: [{
      id: 1,
      name: 'Breakfast'
    }],
    allRecipes: [{
      id: 1,
      name: 'Breakfast'
    }],
  }
};

const recipe = {
  name: 'Amala',
  image: 'This is the image'
}


const props = {
  recipes: [recipe],
  getFavouritedRecipes: (() =>new Promise((resolve, reject) => {
    recipe ? resolve(recipe) : reject('Recipe not found');
  })),
  user: {
    firstName: 'Seun',
    lastName: 'Agbeye'
  },
  location: {
    search: 'recipe=Amala'
  },
  pagination: 2
};

const event = {
  preventDefault: jest.fn(),
  target: {
    search: {
      value: '',
    },
    id: ''
  }
}

describe('# FavouriteRecipes', () => {
  const wrapper = shallow(
      <FavouriteRecipes {...props} />
  );
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper).toMatchSnapshot();
    done();
  });

});
