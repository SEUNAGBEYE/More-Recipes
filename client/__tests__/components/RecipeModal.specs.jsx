
import React from 'react';
import { shallow } from 'enzyme';
import RecipeModal from 
'../../main/src/components/recipes/RecipeModal';

const props = {
  addRecipe: jest.fn(),
  recipeCategories: [],
};

const generateEvent = (name = '') => {
    return {
      preventDefault: jest.fn(),
      target: {
        name: name,
        id: 1
      }
    }
}

describe('# RecipeModal', () => {
  const wrapper = shallow(<RecipeModal {...props} />);

  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.instance().props).toEqual(props)
    expect(wrapper).toMatchSnapshot();
    done();
  });

  it('should call stepClick method', (done) => {
    const event = generateEvent()
    const stepClickSpy = jest.spyOn(wrapper.instance(), 'stepClick');
    wrapper.instance().stepClick(event)
    expect(stepClickSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call ingredientClick method', (done) => {
    const event = generateEvent()
    const ingredientClickSpy = jest.spyOn(wrapper.instance(), 'ingredientClick');
    wrapper.instance().ingredientClick(event)
    expect(ingredientClickSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call onChange method', (done) => {
    const event = generateEvent()
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange(event)
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call onChange method', (done) => {
    const event = generateEvent('steps');
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange(event)
    expect(onChangeSpy).toHaveBeenCalledTimes(2);
    done();
  });

  it('should call onSubmit method', (done) => {
    const event = generateEvent('');
    const onSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    const file = wrapper.find('#recipePicture');
    expect(file.length).toEqual(1)
    wrapper.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    done();
  });

});
