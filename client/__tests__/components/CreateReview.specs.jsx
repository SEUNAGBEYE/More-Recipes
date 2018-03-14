import React from 'react';
import { shallow } from 'enzyme';
import CreateReview from '../../main/src/components/recipes/CreateReview';

const props = {
  reviewBody: 'This is my review',
  onChange: jest.fn(),
  reviewRecipe: jest.fn()
};
  

describe('# Review', () => {
  const wrapper = shallow(
      <CreateReview {...props} />
  );
  it('should render successfully', () => {
    expect(wrapper).toBeDefined();
  });
});
