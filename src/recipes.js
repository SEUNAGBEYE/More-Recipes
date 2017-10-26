import express from 'express';
import { recipes } from '../dummyData/recipes';


const app = express();
/**
 * ghyhhyhy
 */
class Recipe {
/**
 * init c
 * @param {*} expressApp tgt
 * @param {*} recipesArg hh
 * @returns {null} null
 */
  constructor(expressApp, recipesArg) {
    this.recipes = [...recipes];
  }
  /**
 * init c
 * @param {*} req tgt
 * @param {*} res hh
 * @param {*} next jjj
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

  getRecipe(req, res, next, id = 0) {
    if (id) {
      const recipe = this.recipes[id - 1];
      return recipe;
    }
    const recipe = this.recipes[req.params.id - 1];
    if (recipe) {
      return res.status(200).json(recipe);
    }
    return res.status(404).json('Not Found');
  }

  updateRecipe(req, res, next) {
    const recipe = this.getRecipe(req, res, next, req.params.id);

    if (recipe) {
      Object.assign(recipe, req.body);
      return res.status(200).json(recipe);
      next();
    }
    return res.status(404).json('Not Found');
  }

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
