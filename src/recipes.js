import express from 'express';
import { recipes } from '../dummyData/recipes';

const app = express();
/**
 * This is a representation of the recipes data
 */
class Recipe {
/**
 * initialized dummy-in-memory data
 * @param {obj} expressApp expecting an express app
 * @param {obj} recipesArg expecting the dummy-data to be passed
 * @returns {null} null
 */
  constructor(expressApp, recipesArg) {
    this.recipes = [...recipesArg];
  }

  /**
 * This handles getting all recipes
 * @param {obj} req request object
 * @param {obj} res res object
 * @param {obj} next next function
 * @returns {null} json
 */
  allRecipe(req, res, next) {
    const query = req.query.sort;
    if (query) {
      req.query.sort.toLowerCase();
      const recipes = this.recipes;
      recipes.sort((a, b) => b[query] - a[query]);
      res.status(200).json(recipes);
    } else {
      return res.status(200).json(this.recipes);
    }
  }

  /**
  * This Handles adding a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  addRecipe(req, res, next) {
    const newRecipe = {
      id: this.recipes.length + 1,
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      user_id: this.recipes.length + 1
    };
    this.recipes.push(newRecipe);

    return res.status(201).json(this.recipes);
  }

  /**
  * This Handles getting a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @param {number} id this is the id supplied by other class method when getting a single recipe
  * @returns {null} json
  */
  getRecipe(req, res, next, id = 0) {
    if (id) {
      const recipe = this.recipes[id - 1];
      return recipe;
    }
    const recipe = this.recipes[req.params.id - 1];
    // console.log(recipe, 'g')
    if (recipe) {
      return res.status(200).json(recipe);
    }else{
      return res.status(404).json('Not Found');
    } 
  }


  /**
  * This Handles updating a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  updateRecipe(req, res, next) {
    const recipe = this.getRecipe(req, res, next, req.params.id);

    if (recipe) {
      Object.assign(recipe, req.body);
      return res.status(200).json(recipe);
    }
    return res.status(404).json('Not Found');
  }

  /**
  * This Handles reviewing a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  reviewRecipe(req, res, next) {
    const recipe = this.getRecipe(req, res, next, req.params.id);

    if (recipe) {
      recipe.reviews.push({ user_id: recipe.reviews.length, body: req.body.review });

      res.status(200).json(recipe);
      next();
    } else {
      return res.status(404).json('Not Found');
    }
  }

  /**
  * This Handles deletion a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  deleteRecipe(req, res, next) {
    const recipe = this.getRecipe(req, res, next, req.params.id);
    if (recipe) {
      this.recipes.splice(recipe.id - 1, 1);
      return res.status(204).json(this.recipes);
    }
    return res.status(404).json('Not Found');
  }
}

const recipe = new Recipe(app, recipes);
export { recipe };
