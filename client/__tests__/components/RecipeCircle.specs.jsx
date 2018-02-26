

import React from 'react';
import { shallow } from 'enzyme';
import RecipeCircle from '../../main/src/components/recipes/RecipeCircle';

const recipe = {
  userId: 1,
  name: 'Amala',
  image: 'This is the image',
  upvotes: [1,2,4],
  downvotes: [1,2,4],
  description: 'This is the decription',
  views: [1,2]
}

const props = {
  recipe
};
  

describe('# RecipeCircle', () => {
  const wrapper = shallow(
      <RecipeCircle {...props} />
  );
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper).toMatchSnapshot();
    done();
  });
});
