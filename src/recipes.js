import { recipes, categories } from "../dummyData/recipes";
import express from 'express';
const app = express();

class Recipe{
	constructor(express, recipes){
		this.recipes = recipes;
	}

	allRecipe(req, res, next){
		return res.status(200).json(this.recipes);
	}

	addRecipe(req, res, next){
		let newRecipe = {
			'id': this.recipes.length + 1 ,
			'name': req.body.name,
			'image': req.body.image,
			'description': req.body.description,
			'user_id': this.recipes.length + 1
		}

		return res.status(200).json(newRecipe);
	}

	getRecipe(req, res, next, id = 0){
		// id = Number(id);
		if(id){
			let recipe = this.recipes[id - 1];
			return recipe;
		}else{
			console.log(req.params.id)
			let recipe = this.recipes[req.params.id - 1];
			console.log(recipe);
			return res.status(200).json(recipe);
		}
		

	}

	updateRecipe(req, res, next){

		let recipe = this.getRecipe(req, res, next, req.params.id);

		if (recipe){

			Object.assign(recipe, req.body);
			// console.log(this.books);
			res.status(200).json(recipe);
			next();
		}else{
			res.status(404).json("Not Found");
		}
	}

	reviewRecipe(req, res, next){

		let recipe = this.getRecipe(req, res, next, req.params.id);

		if (recipe){
			recipe.reviews.push({'user_id': recipe.reviews.length, 'body': req.body.review});

			res.status(200).json(recipe);
			next();
		}else{
			res.status(404).json("Not Found");
		}
	}

}

let recipe = new Recipe(app, recipes)

export { recipe };