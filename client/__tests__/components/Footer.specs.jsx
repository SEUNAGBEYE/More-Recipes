
import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../main/src/components/common/Footer';

describe('# Footer', () => {
  const wrapper = shallow(<Footer/>);
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper).toMatchSnapshot()
    done();
  });
});
