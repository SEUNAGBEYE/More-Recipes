import jwt from 'jsonwebtoken';

const decodeToken = (req, res, next, token) => {
  jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
    if (!error) {
      req.token = decode;
      return next();
    }
    return res.status(400).send({
      status: 'Bad Request',
      message: 'Token Not Valid'
    });
  });
};

const authMiddleware = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.token || req.body.token || req.params.token;
  if (process.env.NODE_ENV === 'test') {
    if (!token) {
      token = 1;
    }
    if (typeof token === 'number') {
      req.token = { userId: token };
      return next();
    } else if (typeof token === 'string') {
      return decodeToken(req, res, next, token);
    }
  }

  if (token) {
    return decodeToken(req, res, next, token);
  }

  // Check if the route is for getting a single recipe
  if (req.method === 'GET' && req.baseUrl === '/api/v1/recipes' && req.params.id) {
    return next();
  }
  return res.status(400).send({
    status: 'Bad Request',
    message: 'Please send a token!'
  });
};

export default authMiddleware;
