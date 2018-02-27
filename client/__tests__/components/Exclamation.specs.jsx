
import React from 'react';
import { shallow } from 'enzyme';
import Exclamation from '../../main/src/components/recipes/Exclamation';

describe('# Exclamation', () => {
  const wrapper = shallow(<Exclamation/>);
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper).toMatchSnapshot();
    done();
  });
});
