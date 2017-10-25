const express = require('express')
const recipeRoute = express();
import { recipe } from "../src/recipes";
import { json, urlencoded } from 'body-parser';

recipeRoute.use(json()); // for parsing application/json
recipeRoute.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

recipeRoute.route('/')

	.get((req, res, next) => {
		recipe.all(req, res, next);
	})

	.post((req, res, next) => {
		recipe.add(req, res, next);
	})

export { recipeRoute };
