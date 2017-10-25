import { recipes, categories } from "../dummyData/recipes";
import express from 'express';
const app = express();

class Recipe{
	constructor(express, recipes){
		this.recipes = recipes;
	}

	all(req, res, next){
		return res.status(200).json(this.recipes);
	}

	add(req, res, next){
		let newRecipe = {
			'id': this.recipes.length + 1 ,
			'name': req.body.name,
			'image': req.body.image,
			'description': req.body.description,
			'user_id': this.recipes.length + 1
		}
		
		return res.status(200).json(newRecipe);
	}
}

let recipe = new Recipe(app, recipes)

export { recipe };