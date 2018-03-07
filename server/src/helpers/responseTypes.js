
const responseTypes = {
  /**
   * @param {Object} response
   * @param {Number} statusCode
   * @param {String} [message=undefined]
   * @param {any} [errors=undefined]
   *
   * @returns {Object} Object
   */
  failureResponse(response, statusCode, message = undefined, errors = undefined) {
    if (errors && Array.isArray(errors.errors)) {
      errors = errors.errors.map((error => ({
        message: error.message
      })));
    }
    return response.status(statusCode)
      .send({
        status: 'Failure',
        message,
        errors
      });
  },

  /**
   * @param {Object} response
   * @param {object} data object
   * @param {Number} statusCode
   * @param {Number} [pagination=undefined]
   *
   * @returns {Object} Object
   */
  successResponse(response, data, statusCode, pagination = undefined) {
    return response.status(statusCode)
      .send({
        status: 'Success',
        data,
        pagination
      });
  },
  recipeNotFoundMessage: 'Recipe Not Found',
  userNotFoundMessage: 'User Not Found',
  notAuthorizeMessage: 'Not Authorize',
  invalidCredentials: 'Invalid Password or Email'
};


export default responseTypes;
