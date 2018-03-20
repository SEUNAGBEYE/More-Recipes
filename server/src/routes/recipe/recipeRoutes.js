import express from 'express';
import { json, urlencoded } from 'body-parser';
import RecipeController from '../../controllers/RecipeController';
import authMiddleware from '../../middleware/authMiddleware';
import validateId from '../../middleware/recipeIdValidation';
import uniqueRecipeValidation from '../../middleware/uniqueRecipeValidation';

const recipeRoute = express();

// for parsing application/json
recipeRoute.use(json());

// for parsing application/x-www-form-urlencoded
recipeRoute.use(urlencoded({ extended: true }));

recipeRoute.route('/')
/**
   * @swagger
   * /api/v1/recipes:
   *   get:
   *     description: Getting All Recipes
   *     tags:
   *      - All Recipes
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Array of all recipe objects
   *         schema:
   *           $ref: '#/definitions/Recipe'
   */
  .get(RecipeController.allRecipe)
  /**
   * @swagger
   * /api/v1/recipes:
   *   post:
   *     description: Add A New Recipe
   *     tags:
   *      - Add Recipe
   *     produces:
   *       - application/json
   *     parameters:
   *          - name: x-access-token
   *            description: Authorization token
   *            type: string
   *            in: header
   *          - name: name
   *            description: Recipe Name
   *            type: string
   *            in: body
   *          - name: image
   *            description: Recipe Image
   *            type: string
   *            in: body
   *          - name: description
   *            description: Recipe Description
   *            type: string
   *            in: body
   *          - name: categoryId
   *            description: Recipe Ingredients
   *            type: integer
   *            in: body
   *            format: int64
   *            schema:
   *              type: object
   *              properties:
   *                name:
   *                 description: Recipe Name
   *                 type: string
   *                image:
   *                 description: Recipe Image
   *                 type: string
   *                decription:
   *                 description: Recipe Description
   *                 type: string
   *                categoryId:
   *                 description: Recipe ingredients
   *                 type: integer
   *                 format: int64
   *     responses:
   *       201:
   *         description: Recipe object
   *         schema:
   *           $ref: '#/definitions/Recipe'
   */
  .post(authMiddleware, uniqueRecipeValidation, RecipeController.addRecipe);

recipeRoute.route('/popular')
  /**
   * @swagger
   * /api/v1/recipes/popular:
   *   get:
   *     description: Getting Popular Recipes
   *     tags:
   *      - Popular Recipes
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Array of popular recipe objects
   *         schema:
   *           $ref: '#/definitions/Recipe'
   */
  .get(RecipeController.popularRecipe);

recipeRoute.route('/categories')
  /**
   * @swagger
   * /api/v1/recipes/categories:
   *   get:
   *     description: Getting Recipe Categories
   *     tags:
   *      - Recipe Categories
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Array of recipe categories objects
   *         schema:
   *           $ref: '#/definitions/RecipeCategory'
   */
  .get(RecipeController.getCategories);

recipeRoute.route('/categories/:query')
/**
   * @swagger
   * /api/v1/recipes/categories/{id}:
   *   get:
   *     description: Getting A Single Recipe Category
   *     tags:
   *      - Recipe Categories
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *     responses:
   *       200:
   *         description: Array of recipe categories objects
   *         schema:
   *           $ref: '#/definitions/RecipeCategory'
   */
  .get(RecipeController.getCategory);

recipeRoute.route('/search_results')
  .get(RecipeController.searchRecipes);

recipeRoute.route('/:id')
  /**
   * @swagger
   * /api/v1/recipes/{id}:
   *   get:
   *     description: Getting A Single Recipe
   *     tags:
   *      - Single Recipe
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *     responses:
   *       200:
   *         description: Array of recipe categories objects
   *         schema:
   *           $ref: '#/definitions/RecipeCategory'
   */
  .get(validateId, authMiddleware, RecipeController.getRecipe)
  /**
   * @swagger
   * /api/v1/recipes/{id}:
   *   put:
   *     description: Edit Recipe
   *     tags:
   *      - Edit Recipe
   *     produces:
   *       - application/json
   *     parameters:
   *          - name: x-access-token
   *            description: Authorization token
   *            type: string
   *            in: header
   *          - name: id
   *            description: Recipe Id
   *            type: string
   *            in: path
   *          - name: name
   *            description: Recipe Name
   *            type: string
   *            in: body
   *          - name: image
   *            description: Recipe Image
   *            type: string
   *            in: body
   *          - name: steps
   *            description: Recipe Steps
   *            type: array
   *            in: body
   *          - name: ingredients
   *            description: Recipe Ingredient
   *            type: array
   *            in: body
   *          - name: categoryId
   *            description: Recipe Category Id
   *            type: integer
   *            in: body
   *            schema:
   *              type: object
   *              properties:
   *                name:
   *                 description: Recipe Name
   *                 type: string
   *                image:
   *                 description: Recipe Image
   *                 type: string
   *                categoryId:
   *                 description: Recipe Category Id
   *                 in: body
   *                 type: integer
   *                steps:
   *                 description: Recipe Steps
   *                 type: array
   *                ingredients:
   *                 description: Recipe Ingredients
   *                 type: array
   *     responses:
   *       201:
   *         description: Recipe object
   *         schema:
   *           $ref: '#/definitions/Recipe'
   */
  .put(authMiddleware, validateId, uniqueRecipeValidation, RecipeController.updateRecipe)
/**
   * @swagger
   * /api/v1/recipes/{id}:
   *   delete:
   *     description: Getting A Single Recipe
   *     tags:
   *      - Single Recipe
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *       - name: token
   *         in: header
   *     responses:
   *       200:
   *         description: Array of recipe categories objects
   *         schema:
   *           $ref: '#/definitions/Recipe'
   */
  .delete(authMiddleware, validateId, RecipeController.deleteRecipe);

recipeRoute.route('/:id/upvotes')
/**
   * @swagger
   * /api/v1/recipes/{id}/upvotes:
   *   put:
   *     description: Upvote A Recipe
   *     tags:
   *      - Upvote Recipe
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *       - name: token
   *         in: header
   *     responses:
   *       200:
   *         description: Array of recipe categories objects
   *         schema:
   *           $ref: '#/definitions/Recipe'
   */
  .put(authMiddleware, validateId, RecipeController.upVoteRecipe);

recipeRoute.route('/:id/downvotes')
  /**
   * @swagger
   * /api/v1/recipes/{id}/downvotes:
   *   put:
   *     description: Downvote A Recipe
   *     tags:
   *      - Downvote Recipe
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *       - name: token
   *         in: header
   *     responses:
   *       200:
   *         description: Array of recipe categories objects
   *         schema:
   *           $ref: '#/definitions/Recipe'
   */
  .put(authMiddleware, validateId, RecipeController.downVoteRecipe);

recipeRoute.route('/:id/reviews')
/**
   * @swagger
   * /api/v1/recipes/{id}/reviews:
   *   post:
   *     description: Upvote A Recipe
   *     tags:
   *      - Review Recipe
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *       - name: token
   *         in: header
   *       - name: reviewBody
   *         in: body
   *         schema:
   *          type: object
   *          properties:
   *           reviewBody:
   *            description: Recipe Name
   *            type: string
   *     responses:
   *       200:
   *         description: Array of recipe categories objects
   *         schema:
   *           $ref: '#/definitions/Review'
   */
  .post(authMiddleware, validateId, RecipeController.reviewRecipe)
  /**
   * @swagger
   * /api/v1/recipes/{id}/reviews:
   *   get:
   *     description: Getting A Single Recipe Review
   *     tags:
   *      - Recipe Review
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *     responses:
   *       201:
   *         description: Array of recipe categories objects
   *         schema:
   *           $ref: '#/definitions/Review'
   */
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
