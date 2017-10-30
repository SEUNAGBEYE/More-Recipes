import express from 'express';
import { json, urlencoded } from 'body-parser';
import Recipe from '../controllers/recipesController';

const recipeRoute = express();


recipeRoute.use(json()); // for parsing application/json
recipeRoute.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

recipeRoute.route('/')
  .get(Recipe.allRecipe)
  .post(Recipe.addRecipe)
  .put(Recipe.updateRecipe)
  .delete(Recipe.deleteRecipe);

export { recipeRoute };
