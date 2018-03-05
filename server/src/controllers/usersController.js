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
  * @description - This Handles User Registration
  *
  * @static
  *
  * @param {Object} request Request Object
  * @param {Object} response Response Object
  *
  * @returns {Object} Object
  */
  static async signUp(request, response) {
    try {
      const user = await User.create({
        id: request.body.id,
        firstName: request.body.firstName || '',
        lastName: request.body.lastName || '',
        email: request.body.email || '',
        password: request.body.password || '',
        profilePicture: request.body.profilePicture
      });
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
      return response.status(201).send({ status: 'Success', data: userProfile });
    } catch (errors) {
      return response.status(400).send({
        status: 'Failure',
        message: 'Bad Request',
        errors: errors.errors.map((registrationError => ({
          message: registrationError.message
        })))
      });
    }
  }

  /**
  * @description - This Handles User Authentication
  *
  * @static
  *
  * @param {Object} request Request Object
  * @param {Object} response Response Object
  *
  * @returns {Object} Object
  */
  static async signIn(request, response) {
    let user;
    const { email, password = '' } = request.body;

    try {
      user = await User.find({
        where: {
          email
        },
        attributes: {
          exclude: ['email', 'createdAt', 'updatedAt', 'rememberToken']
        }
      });
      if (!user) {
        return response.status(404).send({
          status: 'Failure', message: 'User Not Found', data: {}
        });
      }
    } catch (error) {
      return response.status(400).send({
        status: 'Failure',
        message: 'Bad Request',
        error: error.message
      });
    }

    try {
      const bcryptResponse = await bcrypt.compare(password, user.password);
      if (bcryptResponse) {
        const { id: userId, ...data } = user.get();
        const userProfile = { userId, ...data };
        const token = jwtSigner(userProfile);
        return response.status(200).send({ status: 'Sucesss', data: { token } });
      }
      return response.status(401).send({
        status: 'Failure',
        message: 'Invalid Password or Email'
      });
    } catch (errors) {
      return response.status(400).send({
        status: 'Failure',
        message: 'Bad Request',
        errors
      });
    }
  }

  /**
   * @description - Get user favorite recipes
   *
   * @static
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} Object
   * @memberof UserController
   */
  static async getFavoriteRecipes(request, response) {
    const user = await User.findById(request.token.userId);
    // Am Getting the User Favourited Recipe Id's Here When the actionType === 'getIds'
    if (user) {
      if (request.params.actionType === 'getIds') {
        return response.status(200).send({
          status: 'Success',
          data: user.favoriteRecipe
        });
      }
      const where = {
        id: {
          $in: user.favoriteRecipe
        }
      };
      return modelPaginator(Recipe, request, response, where);
    }
    return response.status(404).send({
      status: 'Failure',
      message: 'User Not Found'
    });
  }

  /**
   * @description - Add a recipe to user favorited recipes
   *
   * @static
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} Object
   * @memberof UserController
   */
  static addFavoriteRecipe(request, response) {
    User.findById(request.token.userId)
      .then((user) => {
        Recipe.find({
          where: {
            id: request.params.id
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
              return response.status(404).send({
                status: 'Failure',
                message: 'Recipe Not Found',
              });
            } else if (user.favoriteRecipe === null) {
              user.update({
                favoriteRecipe: [recipe.id]
              })
                .then(() => response.status(200).send({
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
                  response.status(200).send({ status: 'Success', data: recipe });
                })
                .catch(error => response.status(400).send({
                  status: 'Failure',
                  message: 'Bad Request',
                  error: error.message
                }));
            }
          })
          .catch(error => response.status(400).send({
            status: 'Failure',
            message: 'Bad Request',
            error: error.message
          }));
      })
      .catch(errors => response.status(400).send({
        status: 'Failure',
        message: 'Bad Request',
        errors: errors.message
      }));
  }

  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @memberof UserController
   * @returns {Object} Object
   */
  static getRecipes(request, response) {
    const where = {
      userId: request.token.userId
    };
    modelPaginator(Recipe, request, response, where);
  }

  /**
   * @description - Get User Profile
   * @static
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} Response Object
   *
   * @memberof UserController
   */
  static async myProfile(request, response) {
    try {
      const user = await User.findById(request.token.userId, {
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt', 'rememberToken']
        }
      });
      return response.status(200).send({ status: 'Success', data: user });
    } catch (errors) {
      response.status(400).send({
        status: 'Failure',
        message: 'Bad Request',
        errors: errors.message
      });
    }
  }

  /**
   *@description - Update User Profile
   * @static
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} Object
   * @memberof UserController
   */
  static async updateProfile(request, response) {
    const user = await User.findById(request.token.userId, {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'rememberToken']
      }
    });

    if (!user) {
      return response.status(404).send({
        status: 'Failure',
        message: 'User Not Found'
      });
    }

    if (user.id === request.token.userId) {
      try {
        const updatedUser = await user.update(request.body, { fields: Object.keys(request.body) });
        const { id: userId, ...data } = updatedUser.get();
        const userProfile = { userId, ...data };
        const token = jwtSigner(userProfile);
        response.status(200).send({ status: 'Success', data: { token } });
      } catch (errors) {
        return response.status(400).send({
          status: 'Failure',
          message: 'Bad Request',
          errors: errors.message
        });
      }
      return response.status(403).send({
        status: 'Failure',
        message: 'Not Authorize'
      });
    }
  }

  /**
 * @param {Object} request
 * @param {Object} response
 * @returns {void} void
 * @memberof UserController
 */
  static forgetPassword(request, response) {
    const { email } = request.body;
    User.find({
      where: {
        email
      }
    })
      .then((user) => {
        if (!user) {
          return response.status(404).send({
            status: 'Failure',
            message: 'User Not Found'
          });
        }

        const { firstName, lastName } = user;
        const fullName = `${firstName} ${lastName}`;
        const rememberToken = uuid();
        user.update({ rememberToken });
        const { protocol, path } = request;
        const resetLink = `${protocol}://${request.get('host')}${path}/${rememberToken}`;
        const message = 'A Message has been sent to the email provided kindly read to mail to reset your password';
        mail(email, resetLink, fullName);
        return response.status(200).send({
          status: 'Success',
          message
        });
      })
      .catch(error => response.status(400).send({
        status: 'Failure',
        message: 'Bad Request',
        error: error.message
      }));
  }

  /**
   *
   *
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} Object
   * @memberof UserController
   */
  static confirmForgetPassword(request, response) {
    const { rememberToken } = request.params;
    User.find({
      where: {
        rememberToken
      }
    })
      .then((user) => {
        if (!user) {
          return response.status(404).send({
            status: 'Failure',
            message: 'User Not Found',
          });
        }
        if (user.rememberToken === rememberToken) {
          return user
            .update(request.body, { fields: Object.keys(request.body) })
            .then(() => {
              response.status(200).send({
                status: 'Success',
                message: 'Password Changed'
              });
            })
            .catch(errors => response.status(400).send({
              status: 'Failure',
              message: 'Bad Request',
              errors: errors.message
            }));
        }
        return response.status(403).send({
          status: 'Failure',
          message: 'Not Authorize'
        });
      })
      .catch(error => response.status(400).send({
        status: 'Failure',
        message: 'Bad Request',
        error: error.message
      }));
  }
}

export default UserController;

