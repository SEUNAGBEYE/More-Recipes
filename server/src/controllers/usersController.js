import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index';


/**
 * @class UserController
 */
class UserController {
  /**
  * This Handles User Registration
  * @param {obj} req request object
  * @param {obj} res response object
  * @returns {null} json
  */
  static signUp(req, res) {
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({ status: 'Bad Request', message: 'Password must be greater than 6' });
    }

    return db.User.create({
      id: req.body.id,
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      email: req.body.email,
      password: req.body.password || '',
      profilePicture: req.body.profilePicture
    })
      .then((user) => {
        const {
          firstName, lastName, email, profilePicture
        } = user;
        const userProfile = {
          firstName, lastName, email, profilePicture
        };
        res.status(201).send({ status: 'Success', data: userProfile });
      })
      .catch(errors => res.status(400).send({
        status: 'Bad Request',
        message: 'Bad Request',
        errors: errors.errors.map((registrationError => ({ field: registrationError.path, description: registrationError.message })))
      }));
  }

  /**
  * This Handles User Authentication
  * @param {obj} req request object
  * @param {obj} res response object
  * @param {obj} next next function
  * @returns {null} json
  */
  static signIn(req, res) {
    db.User.find({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (!user) {
          res.status(404).send({ status: 'Not Found', message: 'User not found', data: {} });
        }
        bcrypt.compare(req.body.password, user.password).then((response) => {
          if (response) {
            const {
              id: userId, email, firstName, lastName, favoriteRecipe, profilePicture
            } = user;
            const token = jwt.sign(
              {
                userId, email, firstName, lastName, favoriteRecipe, profilePicture
              },
              process.env.SECRET_KEY,
              { expiresIn: 86400 }
            );
            return res.status(200).send({ status: 'Sucesss', token, userId });
          }
          return res.status(401).send({ status: 'UnAuthorized', message: 'Invalid Password or Email' });
        })
          .catch(errors => res.status(400).send({
            status: 'Bad Request',
            message: 'Bad Request',
            errors: errors.errors.map((loginError => ({ field: loginError.path, description: loginError.message })))
          }));
      })
      .catch(errors => res.status(400).send({
        status: 'Bad Request',
        message: 'Bad Request',
        errors: errors.errors.map((registrationErrorr => ({ field: registrationErrorr.path, description: registrationErrorr.message })))
      }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof UserController
   * @returns {obj} ob
   */
  static getFavoriteRecipes(req, res) {
    // Am Getting the User Favourited Recipe Id's Here When the actionType === 'getIds'
    if (req.params.actionType === 'getIds') {
      return db.User.findById(req.token.userId)
        .then(user => res.status(200).send({ status: 'Success', data: user.favoriteRecipe }))
        .catch(errors => res.status(404).send({ status: 'Not Found', message: 'User Not Found', errors: errors.message }));
    }

    db.User.findById(req.token.userId)
      .then((user) => {
        db.Recipe.findAll({
          where: {
            id: {
              [db.Sequelize.Op.in]: user.favoriteRecipe
            }
          },
        })
          .then((recipes) => {
            res.status(200).send({ status: 'Success', data: recipes });
          });
      })
      .catch(errors => res.status(404).send({ status: 'Not Found', message: 'User Not Found', errors: errors.message }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof UserController
   * @returns {obj} obj
   */
  static addFavoriteRecipe(req, res) {
    db.User.findById(req.token.userId)
      .then((user) => {
        db.Recipe.findById(req.params.id)
          .then((recipe) => {
            if (!recipe) {
              return res.status(404).send({
                status: 'Not Found',
                message: 'Recipe Not Found',
              });
            } else if (user.favoriteRecipe === null) {
              user.update({
                favoriteRecipe: [recipe.id]
              })
                .then(() => res.status(200).send({ status: 'Success', data: user }))
                .catch(error => res.status(400).send({ status: 'Bad Request', message: error }));
            } else {
              if (!user.favoriteRecipe.includes(recipe.id)) {
                user.favoriteRecipe.push(recipe.id);
              } else {
                user.favoriteRecipe = user.favoriteRecipe.filter(id => id !== parseInt(recipe.id, 10));
              }

              user.update({
                favoriteRecipe: user.favoriteRecipe
              })
                .then(() => {
                  res.status(200).send({ status: 'Success', data: recipe });
                })
                .catch(errors => res.status(400).send({ status: 'Bad Request', errors: errors.message }));
            }
          })
          .catch(errors => res.status(400).send({ status: 'Bad Request', errors: errors.message }));
      })
      .catch(errors => res.status(400).send({ status: 'Bad Request', errors: errors.message }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof UserController
   * @returns {obj} obj
   */
  static getRecipes(req, res) {
    db.Recipe.findAll({
      where: {
        userId: req.token.userId
      }
    })
      .then((recipes) => {
        res.status(200).send({ status: 'Success', data: recipes });
      })
      .catch(errors => res.status(400).send({ status: 'Bad Request', errors: errors.message }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof UserController
   * @returns {obj} obj
   */
  static myProfile(req, res) {
    db.User.findById(req.token.userId)
      .then((user) => {
        const {
          firstName, lastName, email, profilePicture
        } = user;
        const userProfile = {
          firstName, lastName, email, profilePicture
        };
        res.status(200).send({ status: 'Success', data: userProfile });
      })
      .catch(errors => res.status(400).send({ status: 'Bad Request', errors: errors.message }));
  }
}

export default UserController;

