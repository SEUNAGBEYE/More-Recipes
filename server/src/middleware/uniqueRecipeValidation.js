import model from '../models';

const { Recipe } = model;

/**
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {obj} obj
 */
function uniqueRecipeValidation(req, res, next) {
  Recipe.find({
    where: {
      userId: req.token.userId,
      name: req.body.name
    }
  })
    .then((recipe) => {
      if (recipe) {
        return res.status(400).send({ status: 'Failure', errors: [{ description: 'You Already added A Recipe With This Name' }] });
      }
      next();
    });
}

export default uniqueRecipeValidation;
