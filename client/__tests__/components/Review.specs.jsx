import React from 'react';
import { shallow } from 'enzyme';
import Review from '../../main/src/components/recipes/Review';

const props = {
  review: {
    user: {
      profilePicture: 'This is my profile picture',
      firstName: 'Seun'
    },
    body: 'Ths is my review'
  }
};
  

describe('# Review', () => {
  const wrapper = shallow(
      <Review {...props} />
  );
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper).toMatchSnapshot();
    done();
  });
});
