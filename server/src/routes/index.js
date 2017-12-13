import express from 'express';
import { json, urlencoded } from 'body-parser';
import RecipeController from '../controllers/recipesController';
import UserController from '../controllers/usersController';
import authMiddleware from '../middleware/authMiddleware';
import validateId from '../middleware/recipeIdValidation';

const recipeRoute = express();
const userRoute = express();


recipeRoute.use(json()); // for parsing application/json
recipeRoute.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

userRoute.use(json()); // for parsing application/json
userRoute.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

// User Routes Starts Here

userRoute.route('/signup')
  .get((req, res) => {
    res.send('Please Sign Up');
  })
  .post(UserController.signUp);

userRoute.route('/signin')
  .get((req, res) => {
    res.send('Please Sign In');
  })
  .post(UserController.signIn);

userRoute.route('/fav-recipes/:actionType?')
  .get(authMiddleware, UserController.getFavoriteRecipes);

userRoute.route('/fav-recipes/:id/add')
  .post(authMiddleware, validateId, UserController.addFavoriteRecipe);

userRoute.route('/myrecipes')
  .get(authMiddleware, UserController.getRecipes);

userRoute.route('/profile')
  .get(authMiddleware, UserController.myProfile);

export { recipeRoute, userRoute };
