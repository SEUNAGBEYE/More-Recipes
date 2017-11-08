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
        return res.status(200).json({status: 'success', data: recipes });
      })
      .catch(error => res.status(200).json({status: 'fail', error: error.message}));
      
    } else {

      db.Recipe.all()
      .then(recipes => {
        return res.status(200).json({status: 'success', data: recipes });
      })
      .catch(error => res.status(200).json({status: 'fail', error: error.message}))
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
      id: req.body.id,
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      userId: req.token.userId
    })
      .then(recipe => res.status(201).json({status: 'success', data: recipe}))
      .catch(error => res.status(400).json({status: 'fail', error: error}));
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

    if (isNaN(req.params.id) || req.params.id ==='' || req.params.id === ''){
      return res.status(400).send('Please input a valid ID')
    }


    db.Recipe.findById(req.params.id)
    .then(recipe => {
      if(!recipe){
        return res.status(404).send({
          message: "Recipe Not Found",
        });
      }
      return res.status(200).json({status: "success", data: recipe})
    })
    .catch(error => {
      return res.status(400).json({status: "error", error: error.message})
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

    if (isNaN(req.params.id) || req.params.id ==='' || req.params.id === ''){
      return res.status(400).send('Please input a valid ID')
    }

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
            return res.status(200).json({status: 'success', data: updatedRecipe});
          })
          .catch(error => {
            return res.status(400).json({status: "error", error: error.message});
          })
      }else{
        return res.status(401).send('Not Authorize');
      }
    })
    .catch(error => {
      return res.status(400).json({status: "error", error: error.message})
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

    if (isNaN(req.params.id) || req.params.id ==='' || req.params.id === ''){
      return res.status(400).send('Please input a valid ID')
    }

      db.Recipe.findById(req.params.id)
      .then(recipe => {
        if(!recipe){
          return res.status(404).json({
            message: "Recipe Not Found",
          });
        } 
        return db.Review.create({
          userId: req.token.userId,
          recipeId: recipe.id,
          body: req.body.body
        })
        .then(review => res.status(200).json({status: 'success', data: review}))   
        .catch(error => res.status(400).json({status: "error", error: error.message}))
      })
      .catch(error => {
        return res.status(400).json({status: "error", error: error.message})
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

    if (isNaN(req.params.id) || req.params.id ==='' || req.params.id === ''){
      return res.status(400).send('Please input a valid ID')
    }

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
          .then(() => res.status(204).json({status: 'success', message: 'No Content'}))
          .catch(error => res.status(400).json({status: "error", error: error.message}));
      }else{
        return res.status(401).send('Not Authorize');
      }
    })
    .catch(error => console.log(error.message));
  }

  static upVoteRecipe(req, res) {

    if (isNaN(req.params.id) || req.params.id ==='' || req.params.id === ''){
      return res.status(400).send('Please input a valid ID')
    }
    
    db.Recipe.findById(req.params.id)
    .then(recipe => {
      if(!recipe){
        return res.status(404).json({
          message: "Recipe Not Found",
        });
      }
      else{
      
        recipe.upvotes === null ? recipe.upvotes = [] : ''
        !recipe.upvotes.includes(req.token.userId) ? recipe.upvotes.push(req.token.userId): res.status(200).json({status: 'success', data: 'You already Voted!!!'}) 
        recipe.update({
          upvotes: recipe.upvotes
        })
        .then(recipe => res.status(200).json({status: "success", data: recipe}))
        .catch(error => res.status(400).json({status: "error", error: error.message}))
      }
    })
    .catch(error => res.status(400).json({status: "error", error: error.message}))
  }

  static downVoteRecipe(req, res) {
    
    if (isNaN(req.params.id) || req.params.id === '' || req.params.id === undefined){

      return res.status(400).send('Please input a valid ID')
    }

    db.Recipe.findById(req.params.id)
    .then(recipe => {
      if(!recipe){
        return res.status(404).send({
          message: "Recipe Not Found",
        });
      }
      else{
        recipe.downvotes === null ? recipe.downvotes = [] : ''
        !recipe.downvotes.includes(req.token.userId) ? recipe.downvotes.push(req.token.userId): res.status(200).json({status: 'success', data: 'You already Down Voted!!!'}) 
        
        recipe.update({
          downvotes: recipe.downvotes
        })
        .then(recipe => res.status(200).json({status: "success", data: recipe}))
      }
    })
    .catch(error => res.status(400).json({status: "error", error: error.message}))
  }
}

export default RecipeController;
