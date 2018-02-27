

import React from 'react';
import { shallow } from 'enzyme';
import RecipeCardActions from '../../main/src/components/recipes/RecipeCardActions';

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
  recipe,
  user: {
    firstName: 'Seun',
    lastName: 'Agbeye'
  },
  isDownVoted: true,
  isUpVoted: true,
  isFavorited: true,
  toggleFavouriteRecipe: jest.fn(),
  toggleThumbsDownRecipe: jest.fn(),
  toggleThumbsUpRecipe: jest.fn(),
};

const event = {
  preventDefault: jest.fn(),
  target: {
    id: 1
  }
}

describe('# RecipeCardActions', () => {
  const wrapper = shallow(
      <RecipeCardActions {...props} />
  );

  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper).toMatchSnapshot();
    done();
  });
});
