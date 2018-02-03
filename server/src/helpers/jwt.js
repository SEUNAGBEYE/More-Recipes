import jwt from 'jsonwebtoken';

/**
 * @param {obj} payload
 * @param {obj} expiresIn
 * @returns {obj} token
 */
function jwtSigner(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY);
}

export default jwtSigner;
