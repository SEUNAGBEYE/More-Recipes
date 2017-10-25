const express = require('express')
const recipeRoute = express();

// import { recipes, categories } from "../dummyData/recipes"

import { recipe } from "../src/recipes";

recipeRoute.route('/')
	.get((req, res, next) => {
		recipe.all(req, res, next);
	});

export { recipeRoute };