
import React from 'react';
import { shallow } from 'enzyme';
import { CategoryPage, mapStateToProps } from '../../main/src/components/recipes/CategoryPage';

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
  categories: state.recipes.recipeCategories,
  recipeCategories: jest.fn(),
  isAuthenticated: !!!(state.auth.user),
  pagination: 2,
  history: {},
  match: {
    params: {
      categoryName: 'Breakfast'
    }
  }
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

describe('# CategoryPage', () => {
  const wrapper = shallow(
      <CategoryPage {...props} />
  );
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper).toMatchSnapshot();
    done();
  });

  it('should call mapStateToProps(state)', (done) => {
    mapStateToProps(state, props);
    done();
  }); 

});
