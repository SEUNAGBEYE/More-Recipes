import express from "express";
const recipeRoute = express();
import { recipe } from "../src/recipes";
import { json, urlencoded } from 'body-parser';

recipeRoute.use(json()); // for parsing application/json
recipeRoute.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

recipeRoute.route('/')

	.get((req, res, next) => {
		recipe.allRecipe(req, res, next);
	})

	.post((req, res, next) => {
		recipe.addRecipe(req, res, next);
	})

	recipeRoute.route('/:id')

	.get((req, res, next) => {
		recipe.getRecipe(req, res, next);
	})

	.put((req, res, next) => {
		recipe.updateRecipe(req, res, next);
	})

	.post((req, res, next) => {
		recipe.reviewRecipe(req, res, next);
	})

	.delete((req, res, next) => {
		recipe.deleteRecipe(req, res, next);
	})


export { recipeRoute };
