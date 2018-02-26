
import React from 'react';
import { shallow } from 'enzyme';
import { AllRecipes, mapStateToProps } from '../../main/src/components/recipes/AllRecipes';

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
  recipes: [],
  pagination: 1,
  addRecipe: (() =>new Promise((resolve, reject) => {
    recipe ? resolve(recipe) : reject('Recipe not found');
  })),
  allRecipes: jest.fn(),
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

describe('# AllRecipes', () => {
  const wrapper = shallow(
      <AllRecipes {...props} />
  );
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper).toMatchSnapshot()
    done();
  });
  it('should call onSumbmit', (done) => {
    const onSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit')
    wrapper.instance().onSubmit(recipe);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1)
    done();
  });

  it('should call mapStateToProps(state)', (done) => {
    mapStateToProps(state)
    done();
  }); 
});
