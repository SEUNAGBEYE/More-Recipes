
import React from 'react';
import { shallow } from 'enzyme';
import DeleteModal from '../../main/src/components/recipes/DeleteModal';

const props = {
  onDelete: jest.fn(),
  id: 1
};

const event = {
  preventDefault: jest.fn(),
  target: {
    search: {
      value: '',
    },
    id: 1
  }
}

describe('# CategoryButton', () => {
  const wrapper = shallow(
      <DeleteModal {...props} />
  );
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper).toMatchSnapshot()
    done()
  });

});
