
import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme';
import { Homepage, mapStateToProps } from '../../main/src/components/Hompage';

const state = {
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


const props = {
  recipes: [],
  popularRecipe: [],
  popularRecipes: jest.fn(),
  allRecipes: jest.fn(),
  recipeCategories: jest.fn(),
  categories: [],
  loaded: true,
  history: {
    push: (() => {})
  },
  categories: [],
  auth: {
    isAuthenticated: true,
    user: {
      firstName: 'Seun',
      lastName: 'Agbeye'
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

describe('# Hompage', () => {
  const wrapper = shallow(
      <Homepage {...props} />
  );
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.instance().props).toEqual(props)
    expect(wrapper).toMatchSnapshot()
    done();
  });

  it('should call mapStateToProps(state)', (done) => {
    mapStateToProps(state)
    done();
  }); 
});
