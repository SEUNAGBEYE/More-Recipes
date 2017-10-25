import { recipes, categories } from "../dummyData/recipes";
const express = require('express');
const app = express();

class Recipe{
	constructor(express, recipes){
		// this.name = name;
		// this.image = image;
		// this.owner_id = owner_id;
		// this.description = description;
		this.recipes = recipes;

		console.log('jo')
	}

	all(req, res, next){
		return res.status(200).json(this.recipes);
	}
}

let recipe = new Recipe(app, recipes)

export { recipe };