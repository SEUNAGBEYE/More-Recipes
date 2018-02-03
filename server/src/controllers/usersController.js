import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';
import model from '../models';
import mail from '../helpers/mail';
import jwtSigner from '../helpers/jwt';
import modelPaginator from '../helpers/modelPaginator';

const { User, Recipe, Review } = model;


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
      return res.status(400).send({
        status: 'Failure', message: 'Password must be greater than 6'
      });
    }

    return User.create({
      id: req.body.id,
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      email: req.body.email,
      password: req.body.password || '',
      profilePicture: req.body.profilePicture
    })
      .then((user) => {
        const {
          firstName,
          lastName,
          email,
          profilePicture,
          favoriteRecipe,
          id: userId
        } = user;
        const payload = {
          userId,
          email,
          firstName,
          lastName,
          favoriteRecipe,
          profilePicture
        };
        const token = jwtSigner(payload);
        const userProfile = {
          firstName,
          lastName,
          email,
          profilePicture,
          token,
        };
        res.status(201).send({ status: 'Success', data: userProfile });
      })
      .catch(errors => res.status(400).send({
        status: 'Failure',
        message: 'Bad Request',
        errors: errors.errors.map((registrationError => ({
          field: registrationError.path,
          description: registrationError.message
        })))
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
    const { email, password = '' } = req.body;
    User.find({
      where: {
        email
      },
      attributes: {
        exclude: ['email', 'createdAt', 'updatedAt', 'rememberToken']
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            status: 'Failure', message: 'User Not Found', data: {}
          });
        }
        bcrypt.compare(password, user.password)
          .then((response) => {
            if (response) {
              const { id: userId, ...data } = user.get();
              const userProfile = { userId, ...data };
              const token = jwtSigner(userProfile);
              return res.status(200).send({ status: 'Sucesss', data: { token } });
            }
            return res.status(401).send({
              status: 'Failure',
              message: 'Invalid Password or Email'
            });
          })
          .catch(errors => res.status(400).send({
            status: 'Failure',
            message: 'Bad Request',
            errors
          }));
      });
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
      return User.findById(req.token.userId)
        .then(user => res.status(200).send({
          status: 'Success', data: user.favoriteRecipe
        }))
        .catch(errors => res.status(404).send({
          status: 'Failure',
          message: 'User Not Found',
          errors: errors.message
        }));
    }

    User.findById(req.token.userId)
      .then((user) => {
        const where = {
          id: {
            $in: user.favoriteRecipe
          }
        };
        modelPaginator(Recipe, req, res, where);
      })
      .catch(errors => res.status(404).send({
        status: 'Failure',
        message: 'User Not Found',
        errors: errors.message
      }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof UserController
   * @returns {obj} obj
   */
  static addFavoriteRecipe(req, res) {
    User.findById(req.token.userId)
      .then((user) => {
        Recipe.find({
          where: {
            id: req.params.id
          },
          include: [{
            model: Review,
            as: 'reviews',
            include: [{
              model: User,
              as: 'user',
              attributes: ['firstName', 'lastName', 'profilePicture']
            }],
            limit: 5
          }]
        })
          .then((recipe) => {
            if (!recipe) {
              return res.status(404).send({
                status: 'Failure',
                message: 'Recipe Not Found',
              });
            } else if (user.favoriteRecipe === null) {
              user.update({
                favoriteRecipe: [recipe.id]
              })
                .then(() => res.status(200).send({
                  status: 'Success',
                  data: recipe
                }));
            } else {
              if (!user.favoriteRecipe.includes(recipe.id)) {
                user.favoriteRecipe.push(recipe.id);
              } else {
                // Refactor Me
                parseInt(recipe.id, 10);
                user.favoriteRecipe = user.favoriteRecipe
                  .filter(id => id !== recipe.id);
              }

              user.update({
                favoriteRecipe: user.favoriteRecipe
              })
                .then(() => {
                  res.status(200).send({ status: 'Success', data: recipe });
                });
            }
          });
      })
      .catch(errors => res.status(400).send({
        status: 'Failure',
        message: 'Bad Request',
        errors: errors.message
      }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof UserController
   * @returns {obj} obj
   */
  static getRecipes(req, res) {
    Recipe.findAll({
      where: {
        userId: req.token.userId
      }
    })
      .then((recipes) => {
        res.status(200).send({ status: 'Success', data: recipes });
      })
      .catch(errors => res.status(400).send({
        status: 'Failure',
        message: 'Bad Request',
        errors: errors.message
      }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof UserController
   * @returns {obj} obj
   */
  static myProfile(req, res) {
    User.findById(req.token.userId, {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'rememberToken']
      }
    })
      .then((user) => {
        res.status(200).send({ status: 'Success', data: user });
      })
      .catch(errors => res.status(400).send({
        status: 'Failure',
        message: 'Bad Request',
        errors: errors.message
      }));
  }

  /**
   *
   *
   * @static
   * @param {obj} req
   * @param {obj} res
   * @returns {obj} obj
   * @memberof UserController
   */
  static updateProfile(req, res) {
    User.findById(req.token.userId, {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'rememberToken']
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            status: 'Failure',
            message: 'User Not Found'
          });
        }
        if (user.id === req.token.userId) {
          return user
            .update(req.body, { fields: Object.keys(req.body) })
            .then((profile) => {
              const { id: userId, ...data } = profile.get();
              const userProfile = { userId, ...data };
              const token = jwtSigner(userProfile);
              res.status(200).send({ status: 'Success', data: { token } });
            })
            .catch(errors => res.status(400).send({
              status: 'Failure',
              message: 'Bad Request',
              errors: errors.message
            }));
        }
        return res.status(403).send({
          status: 'Failure',
          message: 'Not Authorize'
        });
      });
  }

  /**
 * @param {any} req
 * @param {any} res
 * @returns {void} void
 * @memberof UserController
 */
  static forgetPassword(req, res) {
    const { email } = req.body;
    User.find({
      where: {
        email
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            status: 'Failure',
            message: 'User Not Found'
          });
        }

        const { firstName, lastName } = user;
        const fullName = `${firstName} ${lastName}`;
        const rememberToken = uuid();
        user.update({ rememberToken });
        const { protocol, path } = req;
        const resetLink = `${protocol}://${req.get('host')}${path}/${rememberToken}`;
        const message = 'A Message has been sent to the email provided kindly read to mail to reset your password';
        mail(email, resetLink, fullName);
        return res.status(200).send({
          status: 'Success',
          message
        });
      });
  }

  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} obj
   * @memberof UserController
   */
  static confirmForgetPassword(req, res) {
    const { rememberToken } = req.params;
    User.find({
      where: {
        rememberToken
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            status: 'Failure',
            message: 'User Not Found',
          });
        }
        if (user.rememberToken === rememberToken) {
          return user
            .update(req.body, { fields: Object.keys(req.body) })
            .then(() => {
              res.status(200).send({
                status: 'Success',
                message: 'Password Changed'
              });
            })
            .catch(errors => res.status(400).send({
              status: 'Failure',
              message: 'Bad Request',
              errors: errors.message
            }));
        }
        return res.status(403).send({
          status: 'Failure',
          message: 'Not Authorize'
        });
      });
  }
}

export default UserController;

