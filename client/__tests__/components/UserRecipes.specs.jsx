
import React from 'react';
import { shallow } from 'enzyme';
import { UserRecipes, mapStateToProps } from '../../main/src/components/recipes/UserRecipes';

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
  userRecipes: [recipe],
  categories: state.recipes.recipeCategories,
  recipesCount: 1,
  addRecipe: (() =>new Promise((resolve, reject) => {
    recipe ? resolve(recipe) : reject('Recipe not found');
  })),
  getUserRecipes: (() =>new Promise((resolve, reject) => {
    recipe ? resolve(recipe) : reject('Recipe not found');
  })),
  recipeCategories: jest.fn(),
  categories: [],
  history: {
    push: (() => {})
  },
  categories: [],
  user: {
    firstName: 'Seun',
    lastName: 'Agbeye'
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

describe('# UserRecipes', () => {
  const wrapper = shallow(
      <UserRecipes {...props} />
  );
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper).toMatchSnapshot();
    done();
  });

  // it('should call mapStateToProps(state)', () => {
  //   mapStateToProps(state)
  // }); 
});
