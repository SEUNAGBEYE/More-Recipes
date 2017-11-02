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

    if (sortBy) {
      const orderBy = req.query.order.toUpperCase()
      req.query.sort.toLowerCase();
      
      db.Recipe.findAll({
        order: [ 
          [sortBy, orderBy]
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
  * @returns {null} json
  */
  static addRecipe(req, res) {
    return db.Recipe.create({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      userId: req.token.userId
    })
      .then(recipe => res.status(200).json(recipe))
      .catch(error => res.status(400).json(error.message));
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

      if (recipe.userId === req.token.userId){
        return recipe
          .update(req.body, {fields: Object.keys(req.body)})
          .then(updatedRecipe => {
            return res.status(200).json(updatedRecipe);
          })
          .catch(error => {
            return res.status(400).json(error);
          })
      }else{
        return res.status(401).send('Not Authorize');
      }
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
      db.Recipe.findById(req.params.id)
      .then(recipe => {
        if(!recipe){
          return res.status(404).send({
            message: "Recipe Not Found",
          });
        } 
        return db.Review.create({
          userId: req.token.userId,
          recipeId: recipe.id,
          body: req.body.body
        })
        .then(review => res.status(200).json({message: 'success', data: review}))   
        .catch(error => res.status(200).json({message: "error", data: error}))
      })
      .catch(error => {
        return res.status(400).send(error)
      });
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
      if (recipe.userId === req.token.userId){
        return recipe
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).json(error));
      }else{
        return res.status(401).send('Not Authorize');
      }
    })
    .catch(error => res.status(400).json(error));
  }

  static upVoteRecipe(req, res) {
    
    db.Recipe.findById(req.params.id)
    .then(recipe => {
      if(!recipe){
        return res.status(404).send({
          message: "Recipe Not Found",
        });
      }
      else{

        recipe.upvotes === null ? recipe.upvotes = [] : ''
        // res.json({votes: recipe.upvotes, id: req.token.userId, token: req.token})
        !recipe.upvotes.includes(req.token.userId) ? recipe.upvotes.push(req.token.userId): res.status(200).json({message: 'success', data: 'You already Voted!!!'}) 
        recipe.update({
          upvotes: recipe.upvotes
        })
        .then(recipe => res.status(200).send(recipe))
      }
    })
    .catch(error => res.status(400).send(error))
  }

  static downVoteRecipe(req, res) {
    
    db.Recipe.findById(req.params.id)
    .then(recipe => {
      if(!recipe){
        return res.status(404).send({
          message: "Recipe Not Found",
        });
      }
      else{
        recipe.downvotes === null ? recipe.downvotes = [] : res.status(200).json({message: 'success', data: 'You Down Voted Already!!!'})
        recipe.downvotes.includes(req.token.userId) ? recipe.downvotes.push(req.token.userId): ''
        
        recipe.update({
          downvotes: recipe.downvotes
        })
        .then(recipe => res.status(200).send(recipe))
      }
    })
    .catch(error => res.status(400).send(error))
  }
}

export default RecipeController;
