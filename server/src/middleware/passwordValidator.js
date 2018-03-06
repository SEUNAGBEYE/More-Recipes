const passwordValidator = (request, response, next) => {
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

export default passwordValidator;
