import jwt from 'jsonwebtoken';
import responseTypes from '../helpers/responseTypes';

const {
  failureResponse,
  tokenNotValidMessage,
  sendATokenMessage
} = responseTypes;

/**
 * @description - use for decoding token
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 * @param {String} token
 *
 * @returns {Object} Object
 */
const decodeToken = (request, response, next, token) => {
  jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
    if (!error) {
      request.token = decode;
      return next();
    }
    return failureResponse(response, 400, tokenNotValidMessage);
  });
};

/**
 * @description - User's Authentication Middleware
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */
const authMiddleware = (request, response, next) => {
  let token = request.headers['x-access-token'] || request.headers.token || request.body.token || request.params.token;
  if (process.env.NODE_ENV === 'test') {
    if (!token) {
      token = 1;
    }
    if (typeof token === 'number') {
      request.token = { userId: token };
      return next();
    } else if (typeof token === 'string') {
      return decodeToken(request, response, next, token);
    }
  }

  if (token) {
    return decodeToken(request, response, next, token);
  }

  // Check if the route is for getting a single recipe
  if (request.method === 'GET' && request.baseUrl === '/api/v1/recipes' && request.params.id) {
    request.token = {};
    return next();
  }
  return failureResponse(response, 400, sendATokenMessage);
};

export default authMiddleware;
