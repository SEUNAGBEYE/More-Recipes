import express from 'express';
import { json, urlencoded } from 'body-parser';
import UserController from '../../controllers/usersController';
import passwordValidator from '../../middleware/passwordValidator';
import authMiddleware from '../../middleware/authMiddleware';
import validateId from '../../middleware/recipeIdValidation';

const userRoute = express();

userRoute.use(json()); // for parsing application/json

// for parsing application/x-www-form-urlencoded
userRoute.use(urlencoded({ extended: true }));


// User Routes Starts Here

userRoute.route('/signup')

  .get((req, res) => {
    res.send('Please Sign Up');
  })
/**
   * @swagger
   * /api/v1/users/signup:
   *   post:
   *     description: Creates New User
   *     tags:
   *      - SignUp
   *     produces:
   *       - application/json
   *     parameters:
   *          - name: email
   *            description: User email
   *            type: string
   *            in: body
   *          - name: firstName
   *            description: User firstName
   *            type: string
   *            in:  body
   *          - name: lastName
   *            description: User lastName
   *            in:  body
   *            type: string
   *          - name: password
   *            description: User password
   *            type: string
   *            in:  body
   *          - name: profilePicture
   *            description: User image
   *            type: string
   *            in:  body
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                 description: User email
   *                 type: string
   *                firstName:
   *                 description: User firstNameß
   *                 type: string
   *                lastName:
   *                 description: User lastName
   *                 in:  body
   *                 type: string
   *                password:
   *                 description: User passwordß
   *                 type: string
   *                profilePicture:
   *                 description: User image
   *                 type: string
   *     responses:
   *       201:
   *         description: User object
   *         schema:
   *           $ref: '#/definitions/User'
   */
  .post(passwordValidator, UserController.signUp);


userRoute.route('/signin')
  .get((req, res) => {
    res.send('Please Sign In');
  })
/**
   * @swagger
   * /api/v1/users/signin:
   *   post:
   *     description: Logs In A User
   *     tags:
   *      - Login
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         type: email
   *         in: body
   *       - name: password
   *         in: body
   *         type: string
   *         schema:
   *          type: object
   *          properties:
   *            email:
   *             type: string
   *            password:
   *             type: string
   *     responses:
   *       200:
   *         description: User object
   *         schema:
   *           $ref: '#/definitions/User'
   */
  .post(UserController.signIn);

userRoute.route('/fav-recipes/:actionType?')
/**
   * @swagger
   * /api/v1/users/fav-recipes/getIds:
   *   get:
   *     description: Getting User Favourited Recipes Id's
   *     tags:
   *      - Get Favourited Recipe Id's
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: actionType
   *         description: This is the action type of this route and it's optional
   *         in:  body
   *         required: false
   *         type: string
   *       - name: token
   *         description: This is the user access token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Array of favourited recipes id's
   *         schema:
   *           $ref: '#/definitions/Recipe'
   */

/**
   * @swagger
   * /api/v1/users/fav-recipes:
   *   get:
   *     description: Getting User Favourited Recipes Id's
   *     tags:
   *      - Get Favourited Recipes
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: This is the user access token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Array of favourited recipes id's
   *         schema:
   *           $ref: '#/definitions/Recipe'
   */
  .get(authMiddleware, UserController.getFavoriteRecipes);

userRoute.route('/fav-recipes/:id/add')
/**
   * @swagger
   * /api/v1/users/fav-recipes/{id}/add:
   *   post:
   *     description: Toggling User Favourited Recipes
   *     tags:
   *      - Toggling User Favourited Recipes
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Recipe id
   *         in:  path
   *         required: true
   *         type: integer
   *       - name: token
   *         decription: User access token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Recipe object
   *         schema:
   *           $ref: '#/definitions/Recipe'
   */
  .post(authMiddleware, validateId, UserController.addFavoriteRecipe);


userRoute.route('/myrecipes')
  /**
   * @swagger
   * /api/v1/users/myrecipes:
   *   get:
   *     description: Getting User Recipes
   *     tags:
   *      - User Recipes
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: User access token
   *         in:  header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Array of user recipe objects
   *         schema:
   *           $ref: '#/definitions/Recipe'
   */
  .get(authMiddleware, UserController.getRecipes);

userRoute.route('/profile')
  /**
   * @swagger
   * /api/v1/users/profile:
   *   get:
   *     description: Getting User Profile
   *     tags:
   *      - User Profile
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: User access token
   *         in:  header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Array of user recipe objects
   *         schema:
   *           $ref: '#/definitions/User'
   */
  .get(authMiddleware, UserController.myProfile)
/**
   * @swagger
   * /api/v1/users/profile:
   *   put:
   *     description: Update User Profile
   *     tags:
   *      - Update User Profile
   *     produces:
   *       - application/json
   *     parameters:
   *          - name: email
   *            description: User email
   *            type: string
   *            in: body
   *          - name: firstName
   *            description: User firstName
   *            type: string
   *            in:  body
   *          - name: lastName
   *            description: User lastName
   *            in:  body
   *            type: string
   *          - name: password
   *            description: User password
   *            type: string
   *            in:  body
   *          - name: profilePicture
   *            description: User image
   *            type: string
   *            in:  body
   *            schema:
   *              type: object
   *              properties:
   *                firstName:
   *                 description: User firstName
   *                 type: string
   *                lastName:
   *                 description: User lastName
   *                 in:  body
   *                 type: string
   *                aboutMe:
   *                 description: User info
   *                 in:  body
   *                 type: string
   *                password:
   *                 description: User password
   *                 type: string
   *                facebookUrl:
   *                 description: User facebook url
   *                 type: string
   *                twitterUrl:
   *                 description: User twitter url
   *                 type: string
   *                linkedInUrl:
   *                 description: User linkedIn url
   *                 type: string
   *                profilePicture:
   *                 description: User image
   *                 type: string
   *     responses:
   *       200:
   *         description: User object
   *         schema:
   *           $ref: '#/definitions/User'
   */
  .put(authMiddleware, UserController.updateProfile);

userRoute.route('/forgot-password/:rememberToken?')
  /**
   * @swagger
   * /api/v1/users/forgot-password:
   *   post:
   *     description: Forgot Password
   *     tags:
   *      - Forgot Password
   *     produces:
   *       - application/json
   *     parameters:
   *          - name: email
   *            description: User email
   *            type: email
   *            in: body
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                 description: User email
   *                 type: email
   *     responses:
   *       200:
   *         description: User object
   *         schema:
   *           $ref: '#/definitions/User'
   */
  .post(UserController.forgetPassword)
/**
   * @swagger
   * /api/v1/users/forgot-password/{rememberToken}:
   *   put:
   *     description: Forgot Password
   *     tags:
   *      - Forgot Password
   *     produces:
   *       - application/json
   *     parameters:
   *          - name: rememberToken
   *            description: Remember Token
   *            required: true
   *            type: string
   *            in: path
   *          - name: password
   *            description: User Password
   *            type: password
   *            in: body
   *            schema:
   *              type: object
   *              properties:
   *                password:
   *                 description: User Password
   *                 type: password
   *     responses:
   *       200:
   *         description: User object
   *         schema:
   *           $ref: '#/definitions/User'
   */
  .put(UserController.confirmForgetPassword);

// User Model
/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - id
 *       - email
 *       - firstName
 *       - lastName
 *       - password
 *       - image
 *     properties:
 *       id:
 *         type: integer
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       rememberToken:
 *         type: string
 *       aboutMe:
 *         type: string
 *       facebookUrl:
 *         type: string
 *       twitterUrl:
 *         type: string
 *       linkedInUrl:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       email:
 *         type: string
 *         format: email
 *       profilePicture:
 *          type: string
 */

export default userRoute;
