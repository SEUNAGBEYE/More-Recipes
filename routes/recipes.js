const express = require('express')
const recipeRoute = express();

import { json, urlencoded } from 'body-parser';

const bodParser = require('body-parser')

recipeRoute.use(express.json())

import { recipe } from "../src/recipes";

recipeRoute.route('/')
	.get(json(), (req, res, next) => {
		recipe.all(req, res, next);
	})

	.post((req, res, next) => {
		recipe.add(req, res, next);
	})

export { recipeRoute };
