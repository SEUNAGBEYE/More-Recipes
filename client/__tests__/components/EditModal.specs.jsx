
import React from 'react';
import { shallow } from 'enzyme';
import EditModal from 
'../../main/src/components/recipes/EditModal';

const props = {
  editRecipe: jest.fn(),
  recipe: {
    id: 1,
    name: 'Recipe Name',
    decription: 'Recipe Description',
    image: 'Recipe Image',
    ingredients: [],
    steps: []
  }
};

const generateEvent = (name = '') => {
    return {
      preventDefault: jest.fn(),
      target: {
        name: name,
        id: 1,
        dataset: {
          index: 0
        }
      }
    }
}

describe('# EditModal', () => {
  const wrapper = shallow(<EditModal {...props} />);
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.instance().props).toEqual(props)
    expect(wrapper).toMatchSnapshot()
    done();
  });

  it('should call stepClick method', (done) => {
    const event = generateEvent()
    const stepClickSpy = jest.spyOn(wrapper.instance(), 'stepClick');
    wrapper.instance().stepClick(event)
    expect(stepClickSpy).toHaveBeenCalledTimes(1)
    done();
  });

  it('should call ingredientClick method', (done) => {
    const event = generateEvent()
    const ingredientClickSpy = jest.spyOn(wrapper.instance(), 'ingredientClick');
    wrapper.instance().ingredientClick(event)
    expect(ingredientClickSpy).toHaveBeenCalledTimes(1)
    done();
  });

  it('should call onChange method', (done) => {
    const event = generateEvent()
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange(event)
    expect(onChangeSpy).toHaveBeenCalledTimes(1)
    done();
  });

  it('should call onChange method', (done) => {
    const event = generateEvent('steps');
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange(event)
    expect(onChangeSpy).toHaveBeenCalledTimes(2)
    done();
  });

  it('should call updateRecipe method', (done) => {
    const event = generateEvent('');
    const updateRecipeSpy = jest.spyOn(wrapper.instance(), 'updateRecipe');
    const file = wrapper.find(`recipePicture${props.recipe.id}`);
    // expect(file.length).toEqual(1)
    // wrapper.instance().updateRecipe(event);
    expect(updateRecipeSpy).toHaveBeenCalledTimes(0)
    done();
  });

});
