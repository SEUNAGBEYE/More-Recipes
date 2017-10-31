import express from 'express';
import { json, urlencoded } from 'body-parser';
import RecipeController from '../controllers/recipesController';
import UserController from '../controllers/usersController';
import authMiddleware from '../middlewares/authMiddleware';


const recipeRoute = express();
const userRoute = express();


recipeRoute.use(json()); // for parsing application/json
recipeRoute.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

userRoute.use(json()); // for parsing application/json
userRoute.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

recipeRoute.route('/')
  .get(RecipeController.allRecipe)
  .post(RecipeController.addRecipe)

recipeRoute.route('/:id')
  .get(RecipeController.getRecipe)
  .put(RecipeController.updateRecipe)
  .delete(RecipeController.deleteRecipe);

userRoute.route('/signup')
  .get((req, res) => {
    res.send("Please Sign Up");
  })
  .post(UserController.signUp)

userRoute.route('/signin')
  .get((req, res) => {
    res.send("Please Sign In");
  })
  .post(UserController.signIn, authMiddleware)

export { recipeRoute, userRoute };
