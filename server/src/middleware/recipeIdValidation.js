
/**
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {obj} obj
 */
function validateId(req, res, next) {
  // If id is not a number
  if (!parseInt(req.params.id, 10)) {
    return res.status(400).send({ status: 'Failure', message: 'Please input a valid ID' });
  }
  next();
}

export default validateId;
