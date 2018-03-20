
/**
 * @description Validate password
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */
const passwordValidation = (request, response, next) => {
  if (!request.body.password || request.body.password.length < 6) {
    return response.status(400).send({
      status: 'Failure',
      message: 'Bad Request',
      errors: [{
        message: 'Password must be greater than 6'
      }]
    });
  }
  return next();
};

export default passwordValidation;
