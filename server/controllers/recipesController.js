// import Recipe from '../models/index';
import db from '../models/index';


/**
 * This is a representation of the recipes data
 */
class RecipeController {
  /**
 * This handles getting all recipes
 * @param {obj} req request object
 * @param {obj} res res object
 * @param {obj} next next function
 * @returns {null} json
 */
  static allRecipe(req, res) {
    const sortBy = req.query.sort;
    const orderBy = req.query.order;
    if (sortBy) {
      req.query.sort.toLowerCase();
      
      db.Recipe.all({
        order: [
          db.sequelize.fn('max', db.sequelize.col(sortBy)), orderBy.toUpperCase(),
        ]
      })
      .then(recipes => {
        console.log(recipes.get(orderBy.toUpperCase()))
        return res.status(200).json({ message: 'success', data: recipes });
      })
      .catch(error => {
        return res.status(200).json(error);
      });
      
    } else {

      db.Recipe.all()
      .then(recipes => {
        return res.status(200).json({ message: 'success', recipes: recipes });
      })
      .catch(error => {
        return res.status(200).json(error);
      })
      
    }
  }

  /**
  * This Handles adding a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static addRecipe(req, res) {
    return db.Recipe.create({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      ownerId: req.body.ownerId
    })
      .then(recipe => res.status(200).json(recipe))
      .catch(error => res.status(400).json(error));
  }

  /**
  * This Handles getting a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @param {number} id this is the id supplied by other class method when getting a single recipe
  * @returns {null} json
  */
  static getRecipe(req, res, next, id = 0) {
    if (id) {
      const recipe = this.recipes[id - 1];
      return recipe;
    }
    const recipe = this.recipes[req.params.id - 1];

    if (recipe) {
      return res.status(200).json({ message: 'success', recipe });
    }
    return res.status(404).json({ message: 'success', recipe: 'Not Found' });
  }


  /**
  * This Handles updating a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static updateRecipe(req, res, next) {
    const recipe = this.getRecipe(req, res, next, req.params.id);

    if (recipe) {
      Object.assign(recipe, req.body);
      return res.status(200).json({ message: 'success', recipe });
    }
    return res.status(404).json({ message: 'success', recipe: 'Not Found' });
  }

  /**
  * This Handles reviewing a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static reviewRecipe(req, res, next) {
    const recipe = this.getRecipe(req, res, next, req.params.id);

    if (recipe) {
      recipe.reviews.push({ user_id: recipe.reviews.length, body: req.body.review });

      res.status(200).json({ message: 'success', recipe });
      next();
    } else {
      return res.status(404).json({ message: 'success', recipe: 'Not Found' });
    }
  }

  /**
  * This Handles deletion a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static deleteRecipe(req, res, next) {
    const recipe = this.getRecipe(req, res, next, req.params.id);
    if (recipe) {
      this.recipes.splice(recipe.id - 1, 1);
      return res.status(200).json({ message: 'success', recipe: this.recipes });
    }
    return res.status(404).json({ message: 'success', recipe: 'Not Found' });
  }
}

export default RecipeController;
