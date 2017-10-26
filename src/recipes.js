import { recipes, categories } from "../dummyData/recipes";
import express from 'express';
const app = express();

class Recipe{
	constructor(express, recipes){
		this.recipes = [...recipes];
	}

	allRecipe(req, res, next){

	    let query = req.query.sort;
	    if (query){
			let query = req.query.sort.toLowerCase();
			let recipes =this.recipes;
			recipes.sort((a, b) => {
				return b[query] - a[query];
			});
	      	res.status(200).json(recipes);
	    }else{
	    	return res.status(200).json(this.recipes);
	    }
		
	}

	addRecipe(req, res, next){
		let newRecipe = {
			'id': this.recipes.length + 1 ,
			'name': req.body.name,
			'image': req.body.image,
			'description': req.body.description,
			'user_id': this.recipes.length + 1
		}
		this.recipes.push(newRecipe)

		return res.status(201).json(this.recipes);
	}

	getRecipe(req, res, next, id = 0){
		if(id){
			let recipe = this.recipes[id - 1];
			return recipe;
		}else{
			console.log(req.params.id)
			let recipe = this.recipes[req.params.id - 1];
			return res.status(200).json(recipe);
		}
	}

	updateRecipe(req, res, next){

		let recipe = this.getRecipe(req, res, next, req.params.id);

		if (recipe){

			Object.assign(recipe, req.body);
			// console.log(this.books);
			return res.status(200).json(recipe);
			next();
		}else{
			return res.status(404).json("Not Found");
		}
	}

	reviewRecipe(req, res, next){

		let recipe = this.getRecipe(req, res, next, req.params.id);

		if (recipe){
			recipe.reviews.push({'user_id': recipe.reviews.length, 'body': req.body.review});

			res.status(200).json(recipe);
			next();
		}else{
			return res.status(404).json("Not Found");
		}
	}

	deleteRecipe(req, res, next){
		let recipe = this.getRecipe(req, res, next, req.params.id);

		if(recipe){
			this.recipes.splice(recipe.id - 1, 1);
			return res.status(204).json(this.recipes);
		}else{
			return res.status(404).json("Not Found");
		}
	}

}

let recipe = new Recipe(app, recipes)
export { recipe };


