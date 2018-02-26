import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link } from 'react-router';
import NotFoundPage from '../../main/src/components/common/NotFoundPage';

describe('# NotFoundPage', () => {
  const wrapper = shallow(<NotFoundPage />);
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    const paragraph = wrapper.find('p');
    expect(paragraph.length).toEqual(1)
    expect(wrapper).toMatchSnapshot();
    done();
  });
});
