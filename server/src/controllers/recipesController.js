import model from '../models';

const {
  Recipe, Review, Category, User
} = model;


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

      Recipe.findAll({
        where: {
          upvotes: {
            $ne: []
          }
        },
        order: [
          [sortBy, orderBy]
        ],
      })
        .then(recipes => res.status(200).send({ status: 'Success', data: recipes }))
        .catch(error => res.status(400).send({ status: 'Bad Request', errors: error.message }));
    } else {
      Recipe.findAndCountAll()
        .then((recipesWithCount) => {
          Recipe.findAll({
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
    return Recipe.create({
      id: req.body.id,
      name: req.body.name || '',
      image: req.body.image || '',
      description: req.body.description || '',
      steps: req.body.steps || [],
      ingredients: req.body.ingredients || [],
      userId: req.token.userId
    })
      .then(recipe => res.status(201).send({ status: 'Success', data: recipe }))
      .catch((errors) => {
        res.status(400).send({
          status: 'Bad Request',
          errors: errors.errors.map(recipeError => ({ field: recipeError.path, description: recipeError.message }))
        });
      });
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
    Recipe.findAll({
      where: {
        id: req.params.id
      },
      include: [{
        model: Review, as: 'reviews', include: [{ model: User, as: 'user', attributes: ['firstName', 'lastName', 'profilePicture'] }], limit: 5
      }]
    })
      .then((recipe) => {
        if (recipe.length < 1) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        return res.status(200).send({ status: 'Success', data: recipe });
      });
  }


  /**
  * This Handles updating a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static updateRecipe(req, res) {
    Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        if (recipe.userId === req.token.userId) {
          return recipe
            .update(req.body, { fields: Object.keys(req.body) })
            .then(updatedRecipe => res.status(200).send({ status: 'Success', data: updatedRecipe }));
        }
        return res.status(401).send({ status: 'Not Authorize', message: 'Not Authorize' });
      });
  }

  /**
  * This Handles reviewing a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static reviewRecipe(req, res) {
    Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        return Review.create({
          userId: req.token.userId,
          recipeId: recipe.id,
          body: req.body.reviewBody
           || ''
        })
          .then((review) => {
            const { body, id } = review;
            const newReview = { id, body };
            newReview.user = req.token;
            res.status(200).send({ status: 'Success', data: newReview });
          })
          .catch((errors) => {
            const newErrors = errors.errors;
            return res.status(400).send({
              status: 'Bad Request',
              errors: newErrors
            });
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
  static getReviews(req, res) {
    const { limit, offset } = req.query;
    Review.findAll({
      where: {
        recipeId: req.params.id
      },
      limit,
      offset,
      include: [{ model: User, as: 'user', attributes: ['firstName', 'lastName', 'profilePicture'] }],
    })
      .then(reviews => res.status(200).send({ status: 'Success', data: reviews }))
      .catch(error => res.status(400).send({ status: 'Bad Request', error: error.message }));
  }

  /**
  * This Handles deletion a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static deleteRecipe(req, res) {
    Recipe.findById(req.params.id)
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
            .then(() => res.status(204).send({ status: 'Deleted', message: 'No Content' }));
        }
        return res.status(401).send({ status: 'Not Found', message: 'Not Authorize' });
      });
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} obj
   * @memberof RecipeController
   */
  static upVoteRecipe(req, res) {
    Recipe.findById(req.params.id)
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
          recipe.downvotes = recipe.downvotes.filter(id => parseInt(id, 10) !== parseInt(req.token.userId, 10));
        } else {
          recipe.upvotes = recipe.upvotes.filter(id => parseInt(id, 10) !== parseInt(req.token.userId, 10));
        }
        recipe.update({
          upvotes: recipe.upvotes,
          downvotes: recipe.downvotes
        })
          .then(recipe => res.status(200).send({ status: 'Success', data: recipe }));
      });
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} obj
   * @memberof RecipeController
   */
  static downVoteRecipe(req, res) {
    Recipe.findById(req.params.id)
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
      });
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} obj
   * @memberof RecipeController
   */
  static popularRecipe(req, res) {
    Recipe.findAll({
      where: {
        upvotes: {
          $ne: []
        }
      },
    })
      .then(popularRecipes => res.status(200).send({
        status: 'Success',
        data: popularRecipes.sort((a, b) => b.upvotes.length - a.upvotes.length).splice(0, req.query.limit ? req.query.limit : popularRecipes.length)
      }));
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

    Recipe.findAndCountAll({
      where: {
        $or: [
          {
            name: {
              $iLike: `%${search}%`
            },
          },
          {
            ingredients: {
              $contains: [`${search}`]
            }
          }
        ]
      }
    })
      .then((recipesWithCount) => {
        Recipe.findAll({
          order: [['createdAt', 'DESC']],
          offset: (recipesWithCount.count > req.query.limit) ? req.query.limit * req.query.page : 0,
          limit: req.query.limit,
          where: {
            $or: [
              {
                name: {
                  $iLike: `%${search}%`
                },
              },
              {
                ingredients: {
                  $contains: [`${search}`]
                }
              }
            ]
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
    Category.findAll()
      .then(categories => res.status(200).send({ status: 'Success', data: categories }));
  }
}

export default RecipeController;
