
import React from 'react';
import { shallow } from 'enzyme';
import { Navbar, mapStateToProps } from '../../main/src/components/common/Navbar';

const state = {
  auth: {
    user: {
      userId: 1
    }
  },
  recipes: {
    recipeCategories: ['Breakfast', 'Lunch']
  }
};


const props = {
  logout: jest.fn(),
  getFavouritedRecipesIds: jest.fn(),
  searchRecipes: jest.fn(),
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

describe('# NavBar', () => {
  const wrapper = shallow(<Navbar {...props} />);
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.instance().props).toEqual(props)
    expect(wrapper).toMatchSnapshot();
    done();
  });

  it('should call logout method', (done) => {
    const logoutSpy = jest.spyOn(wrapper.instance(), 'logout');
    const logout = wrapper.find('#logout');
    expect(logout.length).toEqual(1)
    wrapper.instance().logout()
    expect(logoutSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call search method', (done) => {
    const searchSpy = jest.spyOn(wrapper.instance(), 'search');
    const search = wrapper.find('form');
    expect(search.length).toEqual(1)
    wrapper.instance().search(event);
    expect(searchSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call mapStateToProps(state)', (done) => {
    mapStateToProps(state);
    done();
  }); 
});
