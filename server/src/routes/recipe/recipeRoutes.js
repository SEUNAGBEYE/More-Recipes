import express from 'express';
import { json, urlencoded } from 'body-parser';
import RecipeController from '../../controllers/recipesController';
import authMiddleware from '../../middleware/authMiddleware';
import validateId from '../../middleware/recipeIdValidation';

const recipeRoute = express();

// for parsing application/json
recipeRoute.use(json());

// for parsing application/x-www-form-urlencoded
recipeRoute.use(urlencoded({ extended: true }));

recipeRoute.route('/')
  .get(RecipeController.allRecipe)
  .post(authMiddleware, RecipeController.addRecipe);

recipeRoute.route('/popular')
  .get(RecipeController.popularRecipe);

recipeRoute.route('/categories')
  .get(RecipeController.getCategories);

recipeRoute.route('/search_results')
  .get(RecipeController.searchRecipes);

recipeRoute.route('/:id')
  .get(validateId, RecipeController.getRecipe)
  .put(authMiddleware, validateId, RecipeController.updateRecipe)
  .delete(authMiddleware, validateId, RecipeController.deleteRecipe);

recipeRoute.route('/:id/upvotes')
  .put(authMiddleware, validateId, RecipeController.upVoteRecipe);

recipeRoute.route('/:id/downvotes')
  .put(authMiddleware, validateId, RecipeController.downVoteRecipe);

recipeRoute.route('/:id/reviews')
  .post(authMiddleware, validateId, RecipeController.reviewRecipe);
recipeRoute.route('/:id/reviews')
  .get(validateId, RecipeController.getReviews);

//  Recipe Model

/**
 * @swagger
 * definitions:
 *   Recipe:
 *     type: object
 *     required:
 *       - id
 *       - name
 *       - image
 *       - description
 *       - steps
 *       - ingredients
 *       - upvotes
 *       - downvotes
 *       - views
 *       - userId
 *       - categoryId
 *       - estimatedTime
 *       - status
 *       - createdAt
 *       - updatedAt
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       image:
 *         type: string
 *       description:
 *         type: string
 *       ingredients:
 *         type: array
 *       steps:
 *          type: array
 *       upvotes:
 *          type: array
 *       downvotes:
 *          type: array
 *       views:
 *          type: array
 *       userid:
 *          type: integer
 *       categoryId:
 *          type: integer
 *       status:
 *          type: boolean
 *       estimatedTime:
 *          type: time
 */

// RecipeCategory Model
/**
 * @swagger
 * definitions:
 *   RecipeCategory:
 *     type: object
 *     required:
 *       - id
 *       - name
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 */

// Review Model
/**
 * @swagger
 * definitions:
 *   Review:
 *     type: object
 *     required:
 *       - id
 *       - body
 *       - recipeId
 *       - userid
 *     properties:
 *       id:
 *         type: integer
 *       recipeId:
 *         type: integer
 *       userId:
 *         type: integer
 *       body:
 *         type: string
 */
export default recipeRoute;
