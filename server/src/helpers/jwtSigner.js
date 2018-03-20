import jwt from 'jsonwebtoken';

/**
 * @description - Jwt Signer
 *
 * @param {Object} payload
 *
 * @returns {Object} token
 */
const jwtSigner = payload => jwt.sign(payload, process.env.SECRET_KEY);

export default jwtSigner;
