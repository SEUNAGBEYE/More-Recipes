
import React from 'react';
import { shallow } from 'enzyme';
import { SearchResults, mapStateToProps } from '../../main/src/components/recipes/SearchResults';

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
  searchRecipes: (() =>new Promise((resolve, reject) => {
    recipe ? resolve(recipe) : reject('Recipe not found');
  })),
  getFavouritedRecipesIds: (() =>new Promise((resolve, reject) => {
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

describe('# SearchResults', () => {
  const wrapper = shallow(
      <SearchResults {...props} />
  );
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper).toMatchSnapshot();
    done();
  });

});
