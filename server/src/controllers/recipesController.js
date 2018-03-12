import model from '../models';
import mail from '../helpers/mail';
import convertToSentenceCase from '../helpers/convertToSentenceCase';
import modelPaginator from '../helpers/modelPaginator';
import responseTypes from '../helpers/responseTypes';

const {
  successResponse,
  failureResponse,
  recipeNotFoundMessage,
  notAuthorizeMessage
} = responseTypes;

const {
  Recipe, Review, Category, User
} = model;

/**
 *  * This is a representation of the recipes data
 * @class RecipeController
 */
class RecipeController {
  /**
 * @description - This handles getting all recipes
 *
 * @param {Object} request request object
 * @param {Object} response response object
 *
 * @returns {Object} Object
 */
  static async allRecipe(request, response) {
    const sortBy = request.query.sort;
    let orderBy = request.query.order;
    const { limit } = request.query;

    if (sortBy && orderBy && sortBy !== 'undefined' && (orderBy === 'asc' || orderBy === 'desc')) {
      sortBy.toLowerCase();
      orderBy = orderBy.toUpperCase();

      try {
        const where = {
          [sortBy]: {
            $ne: []
          }
        };
        const recipes = await Recipe.findAll({
          where,
          limit
        });
        let newRecipes;
        if (orderBy === 'DESC') {
          newRecipes = recipes.sort((recipeA, recipeB) => recipeA[sortBy].length - recipeB[sortBy].length);
        } else {
          newRecipes = recipes.sort((a, b) => a[sortBy].length - b[sortBy].length);
        }
        return successResponse(response, newRecipes, 200);
      } catch (errors) {
        return failureResponse(response, 400, undefined, { errors });
      }
    }
    return modelPaginator(Recipe, request, response);
  }

  /**
  * @description - This Handles adding a recipe
  *
  * @param {Object} request request object
  * @param {Object} response response object
  *
  * @returns {Object} Object
  */
  static async addRecipe(request, response) {
    try {
      const recipe = await Recipe.create({
        id: request.body.id,
        name: request.body.name || '',
        image: request.body.image,
        description: request.body.description || '',
        steps: request.body.steps || [],
        ingredients: request.body.ingredients || [],
        userId: request.token.userId,
        categoryId: request.body.categoryId
      });
      return successResponse(response, recipe, 201);
    } catch (error) {
      return failureResponse(response, 400, undefined, error);
    }
  }

  /**
  * @description - This Handles getting a recipe
  *
  * @param {Object} request request object
  * @param {Object} response response object
  * @param {Object} next next function
  * @param {Number} id this is the id supplied by other class method when getting a single recipe
  *
  * @returns {Object} Object
  */
  static async getRecipe(request, response) {
    const { userId } = request.token;
    const reviews = await Review.findAndCountAll({
      where: {
        recipeId: request.params.id
      }
    });
    const reviewsCount = Math.ceil(reviews.count / 5);

    const recipe = await Recipe.find({
      where: {
        id: request.params.id
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
    });

    if (!recipe) {
      return failureResponse(response, 404, recipeNotFoundMessage);
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
    return successResponse(response, recipe, 200, reviewsCount);
  }


  /**
  * @description -  This Handles updating a recipe
  *
  * @param {Object} request request object
  * @param {Object} response response object
  * @param {Object} next next function
  *
  * @returns {Object} Object
  */
  static async updateRecipe(request, response) {
    try {
      const recipe = await Recipe.findById(request.params.id);
      if (!recipe) {
        return failureResponse(response, 404, recipeNotFoundMessage);
      }
      if (recipe.userId === request.token.userId) {
        const updatedRecipe = await recipe
          .update(request.body, { fields: Object.keys(request.body) });
        return successResponse(response, updatedRecipe, 200);
      }
      return failureResponse(response, 403, notAuthorizeMessage);
    } catch (error) {
      return failureResponse(response, 400, undefined, error);
    }
  }

  /**
  * @description - This Handles reviewing a recipe
  *
  * @param {Object} request request object
  * @param {Object} response response object
  * @param {Object} next next function
  *
  * @returns {Object} Object
  */
  static async reviewRecipe(request, response) {
    const recipe = await Recipe.findById(request.params.id);
    if (!recipe) {
      return failureResponse(response, 404, recipeNotFoundMessage);
    }
    try {
      const review = await Review.create({
        userId: request.token.userId,
        recipeId: recipe.id,
        body: request.body.reviewBody || ''
      });
      if (recipe && review) {
        const { body, id } = review;
        const newReview = { id, body };
        newReview.user = request.token;
        const { protocol, params } = request;
        const reviewLink = `${protocol}://${request.get('host')}/recipe/${params.id}`;

        const { firstName, lastName } = request.token;

        const user = await recipe.getUser();

        const mailOptions = {
          context: {
            fullName: `${firstName} ${lastName}`,
            reviewLink,
            recipeName: recipe.name
          },
          email: user.email,
          subject: 'Someone Just Review Your Recipe',
          template: 'recipeReview'
        };
        mail(mailOptions);
        return successResponse(response, newReview, 200);
      }
    } catch (error) {
      return failureResponse(response, 400, undefined, error);
    }
  }

  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} Object
   * @memberof RecipeController
   */
  static getReviews(request, response) {
    const where = {
      recipeId: request.params.id
    };
    const include = [{
      model: User,
      as: 'user',
      attributes: ['firstName', 'lastName', 'profilePicture']
    }];
    return modelPaginator(Review, request, response, where, include);
  }

  /**
  * This Handles deletion a recipe
  * @param {Object} request request object
  * @param {Object} response response object
  * @param {Object} next next function
  *
  * @returns {null} json
  */
  static async deleteRecipe(request, response) {
    const recipe = await Recipe.findById(request.params.id);
    if (!recipe) {
      return failureResponse(response, 404, recipeNotFoundMessage);
    }

    if (recipe.userId === request.token.userId) {
      const deletedRecipe = await recipe.destroy();
      return successResponse(response, deletedRecipe, 204);
    }

    return failureResponse(response, 403, notAuthorizeMessage);
  }

  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} Object
   * @memberof RecipeController
   */
  static async upVoteRecipe(request, response) {
    const recipe = await Recipe.find({
      where: {
        id: request.params.id
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
    });
    if (!recipe) {
      return failureResponse(response, 404, recipeNotFoundMessage);
    }

    if (!recipe.upvotes.includes(request.token.userId)) {
      recipe.upvotes.push(request.token.userId);
      recipe.downvotes = recipe.downvotes
        .filter(id => parseInt(id, 10) !== parseInt(request.token.userId, 10));
    } else {
      recipe.upvotes = recipe.upvotes
        .filter(id => parseInt(id, 10) !== parseInt(request.token.userId, 10));
    }
    try {
      const updatedRecipe = await recipe.update({
        upvotes: recipe.upvotes,
        downvotes: recipe.downvotes
      });
      return successResponse(response, updatedRecipe, 200);
    } catch (error) {
      return failureResponse(response, 400, undefined, error);
    }
  }

  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} Object
   * @memberof RecipeController
   */
  static async downVoteRecipe(request, response) {
    const recipe = await Recipe.find({
      where: {
        id: request.params.id
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
    });
    if (!recipe) {
      return failureResponse(response, 404, recipeNotFoundMessage);
    }
    if (!recipe) {
      return response.status(404).send({
        status: 'Failure',
        message: 'Recipe Not Found',
      });
    }

    if (!recipe.downvotes.includes(request.token.userId)) {
      recipe.downvotes.push(request.token.userId);
      recipe.upvotes = recipe.upvotes.filter(id => id !== request.token.userId);
    } else {
      recipe.downvotes = recipe.downvotes
        .filter(id => id !== request.token.userId);
    }

    try {
      const updatedRecipe = await recipe.update({
        upvotes: recipe.upvotes,
        downvotes: recipe.downvotes
      });
      return successResponse(response, updatedRecipe, 200);
    } catch (error) {
      return failureResponse(response, 400, undefined, error);
    }
  }

  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} Object
   * @memberof RecipeController
   */
  static async popularRecipe(request, response) {
    try {
      const popularRecipes = await Recipe.findAll({
        where: {
          upvotes: {
            $ne: []
          }
        },
      });
      const data = popularRecipes.sort((a, b) => b.upvotes.length - a.upvotes.length)
        .splice(0, request.query.limit ? request.query.limit : popularRecipes.length);
      return successResponse(response, data, 200);
    } catch (error) {
      return failureResponse(response, 500, undefined, error);
    }
  }

  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} Obect
   * @memberof RecipeController
   */
  static searchRecipes(request, response) {
    let { search } = request.query;
    search = search.split(',');
    search = search.map(query => query.trim());

    const where = {
      $or: [
        {
          name: {
            $iLike: convertToSentenceCase(search[0])
          },
        },
        {
          ingredients: {
            $contains: search
          }
        }
      ]
    };
    return modelPaginator(Recipe, request, response, where);
  }

  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} Object
   * @memberof RecipeController
   */
  static async getCategories(request, response) {
    const categories = await Category.findAll({ include: ['recipes'] });
    return successResponse(response, categories, 200);
  }

  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} Object
   * @memberof RecipeController
   */
  static async getCategory(request, response) {
    const category = await Category.findAll({
      where: {
        id: request.params.id
      },
      include: ['recipes']
    });
    return successResponse(response, category, 200);
  }
}

export default RecipeController;
