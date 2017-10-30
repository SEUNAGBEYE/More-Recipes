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
  static getRecipe(req, res) {

    db.Recipe.findById(req.params.id)
    .then(recipe => {
      if(!recipe){
        return res.status(404).send({
          message: "Recipe Not Found",
        });
      }
      return res.status(200).json({message: "success", data: recipe})
    })
    .catch(error => {
      return res.status(400).send(error)
    });
  }


  /**
  * This Handles updating a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static updateRecipe(req, res) {
    db.Recipe.findById(req.params.id)
    .then(recipe => {
      if(!recipe){
        return res.status(404).send({
          message: "Recipe Not Found",
        });
      }
      return recipe
        .update(req.body, {fields: Object.keys(req.body)})
        .then(updatedRecipe => {
          return res.status(200).json(updatedRecipe);
        })
        .catch(error => {
          return res.status(400).json(error);
        })
    })
    .catch(error => {
      return res.status(400).json(error)
    })
  }

  /**
  * This Handles reviewing a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static reviewRecipe(req, res) {
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
  static deleteRecipe(req, res) {
    db.Recipe.findById(req.params.id)
    .then(recipe => {
      if(!recipe){
        return res.status(404).send({
          message: "Recipe Not Found",
        });
      }

      return recipe
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(400).json(error));
  }
}

export default RecipeController;
