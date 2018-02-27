
import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../main/src/components/recipes/Input';


const recipe = {
  name: 'Amala',
  image: 'This is the image'
}

const props = {
  name: 'Input One',
  value: 'Value',
  onChange: jest.fn(),
  number: 1,
  id: 1
};

describe('# CategoryButton', () => {
  const wrapper = shallow(
      <Input {...props} />
  );
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper).toMatchSnapshot();
    done();
  });

});
