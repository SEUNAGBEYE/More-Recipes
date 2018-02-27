
import React from 'react';
import { shallow } from 'enzyme';
import { CategoriesButton as CategoryButton, mapStateToProps } from '../../main/src/components/recipes/CategoryButton';

const state = {
  recipes: {
    recipeCategories: [{
      id: 1,
      name: 'Breakfast'
    }]
  }
};

const recipe = {
  name: 'Amala',
  image: 'This is the image'
}

const props = {
  categories: [],
};

describe('# CategoryButton', () => {
  const wrapper = shallow(
      <CategoryButton {...props} />
  );
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper).toMatchSnapshot()
    done();
  });

  it('should call mapStateToProps(state)', (done) => {
    mapStateToProps(state)
    done();
  }); 
});
