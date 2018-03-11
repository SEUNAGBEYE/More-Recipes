import model from '../models';
import convertToSentenceCase from '../helpers/convertToSentenceCase';
import responseTypes from '../helpers/responseTypes';

const { failureResponse, recipeExistMessage } = responseTypes;

const { Recipe } = model;

/**
 * @description - Unique Recipe Validation
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */
const uniqueRecipeValidation = async (request, response, next) => {
  const { token, body: { name } } = request;

  const recipeName = convertToSentenceCase(name);
  
  const recipe = await Recipe.find({
    where: {
      userId: token.userId,
      name: recipeName,
    }
  });

  if (recipe) {
    if (request.method === 'PUT' && recipe.name === recipeName && recipe.id !== Number(request.params.id)) {
      const error = [{ message: recipeExistMessage }];
      return failureResponse(response, 400, undefined, error);
    } else if (request.method === 'POST' && recipe.name === recipeName) {
      const error = [{ message: recipeExistMessage }];
      return failureResponse(response, 400, undefined, error);
    }
    return next();
  }
  next();
};

export default uniqueRecipeValidation;
