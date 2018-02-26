
import React from 'react';
import { shallow } from 'enzyme';
import { RecipeCard, mapStateToProps } from '../../main/src/components/recipes/RecipeCard';

const state = {
  auth: {
    user: {
      firstName: 'Seun',
      lastName: 'Agbeye'
    },
    isAuthenticated: true
  },
  recipes: {
    userFavouritedRecipeId: []
  }
};

const recipe = {
  name: 'Amala',
  image: 'This is the image',
  upvotes: [1,2,4],
  downvotes: [1,2,4],
  description: 'This is the decription'
}


const props = {
  isAuthenticated: state.auth.isAuthenticated,
  recipe,
  user: {
    firstName: 'Seun',
    lastName: 'Agbeye'
  },
  myFavouriteRecipes: [recipe],
  deleteRecipe: jest.fn(),
  editRecipe: jest.fn(),
  toggleThumbsUpRecipe: jest.fn(),
  toggleThumbsDownRecipe: jest.fn(),
  getFavouritedRecipesIds: jest.fn(),
  toggleFavouriteRecipe: jest.fn(),
  pagination: 1,
  history: {
    push: jest.fn(),
    location: {
      pathname: 'recipes'
    }
  }
};

const event = {
  preventDefault: jest.fn(),
  target: {
    id: 1
  }
}

describe('# RecipeCard', () => {
  const wrapper = shallow(
      <RecipeCard {...props} />
  );

  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper).toMatchSnapshot()
    done();
  });

  it('should call deleteRecipe', (done) => {
    const deleteRecipeSpy = jest.spyOn(wrapper.instance(), 'deleteRecipe')
    wrapper.instance().deleteRecipe(event);
    expect(deleteRecipeSpy).toHaveBeenCalledTimes(1)
    done();
  });

  it('should call editRecipe', (done) => {
    const editRecipeSpy = jest.spyOn(wrapper.instance(), 'editRecipe')
    wrapper.instance().editRecipe(event.target.id, recipe);
    expect(editRecipeSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call toggleThumbsUpRecipe', (done) => {
    const toggleThumbsUpRecipeSpy = jest.spyOn(wrapper.instance(), 'toggleThumbsUpRecipe')
    wrapper.instance().toggleThumbsUpRecipe(event);
    expect(toggleThumbsUpRecipeSpy).toHaveBeenCalledTimes(1)
    done();
  });

  it('should call toggleThumbsDownRecipe', (done) => {
    const toggleThumbsDownRecipeSpy = jest.spyOn(wrapper.instance(), 'toggleThumbsDownRecipe')
    wrapper.instance().toggleThumbsDownRecipe(event);
    expect(toggleThumbsDownRecipeSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call toggleFavouriteRecipe', (done) => {
    const toggleFavouriteRecipeSpy = jest.spyOn(wrapper.instance(), 'toggleFavouriteRecipe')
    wrapper.instance().toggleFavouriteRecipe(event);
    expect(toggleFavouriteRecipeSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call componentWillReceiveProps', (done) => {
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps')
    wrapper.instance().componentWillReceiveProps(props);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call mapStateToProps(state)', (done) => {
    mapStateToProps(state);
    done();
  }); 
});
