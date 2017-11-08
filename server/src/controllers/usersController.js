import db from '../models/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController{
  /**
  * This Handles User Registration
  * @param {obj} req request object
  * @param {obj} res response object
  * @returns {null} json
  */
  static signUp(req, res) {

    if (req.body.password === undefined || req.body.password.length < 6){
      return res.status(400).send('Password must be greater than 6')
    }

      return db.User.create({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture
      })
        .then(user => res.status(201).json({message: 'success', data: user}))
        .catch(error => res.status(400).json(error.message));
  }

  /**
  * This Handles User Authentication
  * @param {obj} req request object
  * @param {obj} res response object
  * @param {obj} next next function
  * @returns {null} json
  */
  static signIn(req, res, next) {


    db.User.find({
      where: {
        email: req.body.email
      }
    }).then(user => {
       if(!user){
        res.status(404).send('User not found')
      }
      bcrypt.compare(req.body.password, user.password).then(response => {
        if (response){
          const token = jwt.sign({userId: user.id, email: user.email}, process.env.SECRET_KEY, {expiresIn: '1h'});
          return res.status(200).send(token)
        } 
        return res.status(200).send('Invalid Password or Email')
      })
      .catch(error => res.status(404).send('Password required'))
    })
    .catch(error => res.status(200).json(error.message))
    
  }

  static getFavoriteRecipes(req, res){
    db.User.findById(req.token.userId)
    .then(user => {
      db.Recipe.findAll({
        where: {
          id: {
            [db.Sequelize.Op.in]: user.favoriteRecipe
          }
        }
      })
      .then(recipes => recipes.length > 0 ? res.status(200).json({message: 'success', data: recipes}) : res.status(404).send('No favorited Recipes Yet, Please Add Some!!!')) 
      .catch(error => res.status(404).send('No favorited Recipes Yet, Please Add Some!!!'))    
    })
    .catch(error => res.status(400).send(error))
  }

  static addFavoriteRecipe(req, res){
    console.log(req.params.id, req.token.userId)
    db.User.findById(req.token.userId)
    .then(user => {
      db.Recipe.findById(req.params.id)
      .then(recipe => {
          if(!recipe){
            console.log(recipe)
            return res.status(404).send({
              message: "Recipe Not Found",
            });
          }
          else{
            if (user.favoriteRecipe === null){
              user.update({
                favoriteRecipe: [recipe.id]
              })
              .then(recipe => res.status(200).json({status:'success', data: user}))
              .catch(error => res.status(400).json({status: 'fail', message: error}));
            }else{
              !user.favoriteRecipe.includes(recipe.id) ? user.favoriteRecipe.push(recipe.id) : ''

              user.update({
                favoriteRecipe: user.favoriteRecipe               
              })
              .then(recipe => res.status(200).json({status: 'success', data: user}))
              .catch(error => res.status(400).json({status: 'fail', message: error}));
            }
          }
        })
      .catch(error => res.status(400).json({status: 'fail', message: error}))         
      })
    .catch(error => res.status(400).json({status: 'fail', message: error}));
  }

  static getRecipes(req, res){

      db.Recipe.findAll({
        where: {
          userId: req.token.userId
        }
      })
      .then(recipes => res.status(200).send(recipes))     
      .catch(error => res.status(400).send(error))
  }

  static myProfile(req, res){

    db.User.findById(req.token.userId)
    .then(user => res.status(200).json({status: 'success', data: user}))
    .catch(error=> res.status(400).json({status: 'fail', message:error.message}));
  }

}

export default UserController;

