import model from '../models';
import modelPaginator from '../helpers/modelPaginator';

const {
  Recipe, Review, Category, User
} = model;

/**
 *  * This is a representation of the recipes data
 * @class RecipeController
 */
class RecipeController {
  /**
 * This handles getting all recipes
 * @param {Object} req request object
 * @param {Object} res res object
 *
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
        .then(recipes => res.status(200).send({
          status: 'Success',
          data: recipes
        }))
        .catch(error => res.status(400).send({
          status: 'Failure',
          errors: error.message
        }));
    } else {
      modelPaginator(Recipe, req, res);
    }
  }

  /**
  * This Handles adding a recipe
  * @param {Object} req request object
  * @param {Object} res res object
  *
  * @returns {null} json
  */
  static addRecipe(req, res) {
    Recipe.create({
      id: req.body.id,
      name: req.body.name || '',
      image: req.body.image,
      description: req.body.description || '',
      steps: req.body.steps || [],
      ingredients: req.body.ingredients || [],
      userId: req.token.userId,
      categoryId: req.body.categoryId
    })
      .then(recipe => res.status(201).send({ status: 'Success', data: recipe }))
      .catch((errors) => {
        if (errors) {
          res.status(400).send({
            status: 'Failure',
            message: 'Bad Request',
            errors: errors.errors.map(recipeError => ({
              field: recipeError.path,
              description: recipeError.message
            }))
          });
        }
      });
  }

  /**
  * This Handles getting a recipe
  * @param {Object} req request object
  * @param {Object} res res object
  * @param {Object} next next function
  * @param {number} id this is the id supplied by other class method when getting a single recipe
  * @returns {Object} json
  */
  static getRecipe(req, res) {
    const { userId } = req.token || false;
    Recipe.find({
      where: {
        id: req.params.id
      },
      include: [{
        model: Review,
        as: 'reviews',
        include: [{
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName', 'profilePicture']
        }],
        limit: 5
      }]
    })
      .then((recipe) => {
        if (!recipe) {
          res.status(404).send({
            status: 'Failure',
            message: 'Recipe Not Found',
          });
        }
        if (userId) {
          if (!recipe.views) {
            recipe.views = [];
          }
          if (recipe.userId === userId && !recipe.views.includes(userId)) {
            recipe.views.push(userId);
          } else if (recipe.userId !== userId) {
            recipe.views.push(userId);
          }
          recipe.update({ views: recipe.views });
        }
        res.status(200).send({ status: 'Success', data: recipe });
      });
  }


  /**
  * This Handles updating a recipe
  * @param {Object} req request object
  * @param {Object} res res object
  * @param {Object} next next function
  * @returns {null} json
  */
  static updateRecipe(req, res) {
    Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            status: 'Failure',
            message: 'Recipe Not Found',
          });
        }
        if (recipe.userId === req.token.userId) {
          return recipe
            .update(req.body, { fields: Object.keys(req.body) })
            .then(updatedRecipe => res.status(200).send({
              status: 'Success', data: updatedRecipe
            }));
        }
        return res.status(403).send({
          status: 'Failure',
          message: 'Not Authorize'
        });
      });
  }

  /**
  * This Handles reviewing a recipe
  * @param {Object} req request object
  * @param {Object} res res object
  * @param {Object} next next function
  * @returns {null} json
  */
  static reviewRecipe(req, res) {
    Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            status: 'Failure',
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
              status: 'Failure',
              errors: newErrors
            });
          });
      });
  }

  /**
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Object
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
      include: [{
        model: User,
        as: 'user',
        attributes: ['firstName', 'lastName', 'profilePicture']
      }],
    })
      .then(reviews => res.status(200).send({
        status: 'Success',
        data: reviews
      }))
      .catch(error => res.status(400).send({
        status: 'Failure',
        error: error.message
      }));
  }

  /**
  * This Handles deletion a recipe
  * @param {Object} req request object
  * @param {Object} res res object
  * @param {Object} next next function
  * @returns {null} json
  */
  static deleteRecipe(req, res) {
    Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            status: 'Failure',
            message: 'Recipe Not Found',
          });
        }

        if (recipe.userId === req.token.userId) {
          return recipe
            .destroy()
            .then(() => res.status(204).send({
              status: 'Succuess',
              message: 'No Content'
            }));
        }
        return res.status(403).send({
          status: 'Failure',
          message: 'Not Authorize'
        });
      });
  }

  /**
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Object
   * @memberof RecipeController
   */
  static upVoteRecipe(req, res) {
    Recipe.find({
      where: {
        id: req.params.id
      },
      include: [{
        model: Review,
        as: 'reviews',
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['firstName', 'lastName', 'profilePicture']
          }],
        limit: 5
      }]
    })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            status: 'Failure',
            message: 'Recipe Not Found',
          });
        }

        if (recipe.upvotes === null) {
          recipe.upvotes = [];
        }

        if (!recipe.upvotes.includes(req.token.userId)) {
          recipe.upvotes.push(req.token.userId);
          recipe.downvotes = recipe.downvotes
            .filter(id => parseInt(id, 10) !== parseInt(req.token.userId, 10));
        } else {
          recipe.upvotes = recipe.upvotes
            .filter(id => parseInt(id, 10) !== parseInt(req.token.userId, 10));
        }
        recipe.update({
          upvotes: recipe.upvotes,
          downvotes: recipe.downvotes
        })
          .then(recipe => res.status(200).send({
            status: 'Success', data: recipe
          }));
      });
  }

  /**
   * @static
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} Object
   * @memberof RecipeController
   */
  static downVoteRecipe(req, res) {
    Recipe.find({
      where: {
        id: req.params.id
      },
      include: [{
        model: Review,
        as: 'reviews',
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['firstName', 'lastName', 'profilePicture']
          }],
        limit: 5
      }]
    })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            status: 'Failure',
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
          recipe.downvotes = recipe.downvotes
            .filter(id => id !== req.token.userId);
        }

        recipe.update({
          downvotes: recipe.downvotes,
          upvotes: recipe.upvotes
        })
          .then(recipe => res.status(200).send({
            status: 'Success', data: recipe
          }));
      });
  }

  /**
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Object
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
        data: popularRecipes.sort((a, b) => b.upvotes.length - a.upvotes.length)
          .splice(0, req.query.limit ? req.query.limit : popularRecipes.length)
      }));
  }

  /**
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} objk
   * @memberof RecipeController
   */
  static searchRecipes(req, res) {
    const { search } = req.query;
    const where = {
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
    };
    modelPaginator(Recipe, req, res, where);
  }

  /**
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Object
   * @memberof RecipeController
   */
  static getCategories(req, res) {
    Category.findAll({
      include: ['recipes']
    })
      .then(categories => res.status(200).send({
        status: 'Success',
        data: categories
      }));
  }

  /**
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Object
   * @memberof RecipeController
   */
  static getCategory(req, res) {
    Category.findAll({
      where: {
        id: req.params.id
      },
      include: ['recipes']
    })
      .then(category => res.status(200).send({
        status: 'Success',
        data: category
      }))
      .catch(error => res.status(400).send({
        status: 'Failure',
        error: error.message
      }));
  }
}

export default RecipeController;
