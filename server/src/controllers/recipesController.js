import db from '../models/index';


/**
 * This is a representation of the recipes data
 */
class RecipeController {
  /**
 * This handles getting all recipes
 * @param {obj} req request object
 * @param {obj} res res object
 * @param {obj} next next function
 * @returns {null} json
 */
  static allRecipe(req, res) {
    const sortBy = req.query.sort;

    if (sortBy) {
      const orderBy = req.query.order.toUpperCase();
      req.query.sort.toLowerCase();

      db.Recipe.findAll({
        where: {
          upvotes: {
            [db.sequelize.Op.ne]: []
          }
        },
        order: [
          [sortBy, orderBy]
        ],
      })
        .then(recipes => res.status(200).send({ status: 'Success', data: recipes }))
        .catch(error => res.status(400).send({ status: 'Bad Request', errors: error.message }));
    } else {
      db.Recipe.findAndCountAll()
        .then((recipesWithCount) => {
          db.Recipe.findAll({
            order: [['createdAt', 'DESC']],
            offset: (recipesWithCount.count > req.query.limit) ? (req.query.limit * (req.query.page - 1)) : 0,
            limit: req.query.limit
          })
            .then((recipes) => {
              //  This is for the remainder of the resume if the count is not even
              const remainder = recipesWithCount.count % req.query.limit === 0 ? 0 : 1;
              const page = Math.floor(recipesWithCount.count / req.query.limit) + remainder;
              res.status(200).send({ status: 'Success', data: recipes, pagination: page });
            })
            .catch(error => res.status(400).send({ status: 'Bad Request', error: error.message }));
        });
    }
  }

  /**
  * This Handles adding a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @returns {null} json
  */
  static addRecipe(req, res) {
    return db.Recipe.create({
      id: req.body.id,
      name: req.body.name || '',
      image: req.body.image || '',
      description: req.body.description || '',
      steps: req.body.steps || [],
      ingredients: req.body.ingredients || [],
      userId: req.token.userId
    })
      .then(recipe => res.status(201).send({ status: 'Success', data: recipe }))
      .catch(errors => res.status(400).send({
        status: 'Bad Request',
        errors: errors.errors.map(recipeError => ({ field: recipeError.path, description: recipeError.message }))
      }));
  }

  /**
  * This Handles getting a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @param {number} id this is the id supplied by other class method when getting a single recipe
  * @returns {obj} json
  */
  static getRecipe(req, res) {
    db.Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }

        return res.status(200).send({ status: 'Success', data: recipe });
      })
      .catch(error => res.status(400).send({ status: 'Bad Request', error: error.message }));
  }


  /**
  * This Handles updating a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static updateRecipe(req, res) {
    db.Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        if (recipe.userId === req.token.userId) {
          return recipe
            .update(req.body, { fields: Object.keys(req.body) })
            .then(updatedRecipe => res.status(200).send({ status: 'Success', data: updatedRecipe }))
            .catch(errors => res.status(400).send({
              status: 'Bad Request',
              errors: errors.errors.map(recipeError => ({ description: recipeError.message }))
            }));
        }
        return res.status(401).send({ status: 'Not Authorize', message: 'Not Authorize' });
      })
      .catch(errors => res.status(400).send({
        status: 'Bad Request',
        errors: errors.errors.map(recipeError => ({ description: recipeError.message }))
      }));
  }

  /**
  * This Handles reviewing a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static reviewRecipe(req, res) {
    db.Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        return db.Review.create({
          userId: req.token.userId,
          recipeId: recipe.id,
          body: req.body.body || ''
        })
          .then(review => res.status(200).send({ status: 'Success', data: review }))
          .catch(errors => res.status(400).send({
            status: 'Bad Request',
            errors: errors.errors.map(reviewError => ({ description: reviewError.message }))
          }));
      })
      .catch(errors => res.status(400).send({
        status: 'Bad Request',
        errors: errors.errors.map(reviewError => ({ description: reviewError.message }))
      }));
  }

  /**
  * This Handles deletion a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static deleteRecipe(req, res) {
    db.Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            status: 'Not Found',
            message: 'Recipe Not Found',
          });
        }

        if (recipe.userId === req.token.userId) {
          return recipe
            .destroy()
            .then(() => res.status(204).send({ status: 'Deleted', message: 'No Content' }))
            .catch(error => res.status(400).send({ status: 'Bad Request', error: error.message }));
        }
        return res.status(401).send({ status: 'Not Found', message: 'Not Authorize' });
      })
      .catch(error => res.status(400).send({ status: 'Bad Request', error: error.message }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} obj
   * @memberof RecipeController
   */
  static upVoteRecipe(req, res) {
    db.Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            status: 'Not Found',
            message: 'Recipe Not Found',
          });
        }

        if (recipe.upvotes === null) {
          recipe.upvotes = [];
        }

        if (!recipe.upvotes.includes(req.token.userId)) {
          recipe.upvotes.push(req.token.userId);
          recipe.downvotes = recipe.downvotes.filter(id => id != req.token.userId);
        } else {
          recipe.upvotes = recipe.upvotes.filter(id => id != req.token.userId);
        }
        recipe.update({
          upvotes: recipe.upvotes,
          downvotes: recipe.downvotes
        })
          .then(recipe => res.status(200).send({ status: 'Success', data: recipe }))
          .catch(error => res.status(400).send({ status: 'Bad Request', error: error.message }));
      })
      .catch(error => res.status(400).send({ status: 'Bad Request', error: error.message }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} obj
   * @memberof RecipeController
   */
  static downVoteRecipe(req, res) {
    db.Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            status: 'Not Found',
            message: 'Recipe Not Found',
          });
        }
        if (recipe.downvotes === null) {
          recipe.downvotes = [];
        }

        if (!recipe.downvotes.includes(req.token.userId)) {
          recipe.downvotes.push(req.token.userId);
          recipe.upvotes = recipe.upvotes.filter(id => id !== req.token.userId);
        } else {
          recipe.downvotes = recipe.downvotes.filter(id => id !== req.token.userId);
        }

        recipe.update({
          downvotes: recipe.downvotes,
          upvotes: recipe.upvotes
        })
          .then(recipe => res.status(200).send({ status: 'Success', data: recipe }));
      })
      .catch(error => res.status(400).send({ status: 'Bad Request', error: error.message }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} obj
   * @memberof RecipeController
   */
  static popularRecipe(req, res) {
    db.Recipe.findAll({
      where: {
        upvotes: {
          [db.sequelize.Op.ne]: []
        }
      },
    })
      .then(popularRecipes => res.status(200).send({
        status: 'Success',
        data: popularRecipes.sort((a, b) => b.upvotes.length - a.upvotes.length).splice(0, req.query.limit ? req.query.limit : popularRecipes.length)
      }))
      .catch(error => res.status(400).send({ status: 'Bad Request', error: error.message }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} objk
   * @memberof RecipeController
   */
  static searchRecipes(req, res) {
    const { search } = req.query;

    db.Recipe.findAndCountAll({
      where: {
        name: {
          [db.sequelize.Op.iLike]: `%${search}%`
        }
      }
    })
      .then((recipesWithCount) => {
        db.Recipe.findAll({
          order: [['createdAt', 'DESC']],
          offset: (recipesWithCount.count > req.query.limit) ? req.query.limit * req.query.page : 0,
          limit: req.query.limit,
          where: {
            name: {
              [db.sequelize.Op.iLike]: `%${search}%`
            }
          }
        })
          .then((recipes) => {
            const remainder = recipesWithCount.count % req.query.limit === 0 ? 0 : 1;
            const page = Math.floor(recipesWithCount.count / req.query.limit) + remainder;
            res.status(200).send({ status: 'Success', data: recipes, pagination: page });
          });
      });
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} obj
   * @memberof RecipeController
   */
  static getCategories(req, res) {
    db.Category.findAll()
      .then(categories => res.status(200).send({ status: 'Success', data: categories }))
      .catch(error => res.status(400).send({ status: 'Bad Request', error }));
  }
}

export default RecipeController;
