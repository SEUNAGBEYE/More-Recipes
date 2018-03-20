import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';
import model from '../models';
import mailer from '../helpers/mailer';
import jwtSigner from '../helpers/jwtSigner';
import modelPaginator from '../helpers/modelPaginator';
import responseTypes from '../helpers/responseTypes';

const {
  successResponse,
  failureResponse,
  recipeNotFoundMessage,
  userNotFoundMessage,
  invalidCredentials,
  notAuthorizeMessage,
  passwordNotMatchMessage,
  passwordChangedMessage
} = responseTypes;

const { User, Recipe, Review } = model;


/**
 * @class UserController
 */
class UserController {
  /**
  * @description - This handles users registration
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
      const { protocol } = request;
      const welcomeLink = `${protocol}://${request.get('host')}`;
      const mailData = {
        context: {
          fullName: `${firstName} ${lastName}`,
          welcomeLink
        },
        subject: 'Welome to Recipes',
        email,
        template: 'signupSuccess'
      };
      mailer(mailData);
      return successResponse(response, userProfile, 201);
    } catch (error) {
      return failureResponse(response, 400, undefined, error);
    }
  }

  /**
  * @description - This handles users authentication
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
        return failureResponse(response, 404, userNotFoundMessage);
      }
    } catch (error) {
      return failureResponse(response, 400, undefined, error);
    }

    try {
      const bcryptResponse = await bcrypt.compare(password, user.password);
      if (bcryptResponse) {
        const { id: userId, password: userPassword, ...data } = user.get();
        const userProfile = { userId, ...data };
        const token = jwtSigner(userProfile);
        return successResponse(response, { token }, 200);
      }
      return failureResponse(response, 401, invalidCredentials);
    } catch (error) {
      return failureResponse(response, 400, undefined, error);
    }
  }

  /**
   * @description - This handles getting user's favorited recipes
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

    // I'm Getting the User Favorited Recipe Id's Here When the actionType === 'getIds'
    if (user) {
      if (request.params.actionType === 'getIds') {
        const data = user.favoriteRecipe;
        return successResponse(response, data, 200);
      }
      const where = {
        id: {
          $in: user.favoriteRecipe
        }
      };
      return modelPaginator(Recipe, request, response, where);
    }
    return failureResponse(response, 404, userNotFoundMessage);
  }

  /**
   * @description - This handles adding a recipe to user's favorited recipes
   * @static
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} Object
   * @memberof UserController
   */
  static async addFavoriteRecipe(request, response) {
    try {
      const user = await User.findById(request.token.userId);
      const recipe = await Recipe.find({
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
      });
      if (!recipe) {
        return failureResponse(response, 404, recipeNotFoundMessage);
      }
      if (!user.favoriteRecipe.includes(recipe.id)) {
        user.favoriteRecipe.push(recipe.id);
      } else {
        parseInt(recipe.id, 10);
        user.favoriteRecipe = user.favoriteRecipe
          .filter(id => id !== recipe.id);
      }
      await user.update({
        favoriteRecipe: user.favoriteRecipe
      });
      return successResponse(response, recipe, 200);
    } catch (error) {
      return failureResponse(response, 500, undefined, error.message);
    }
  }

  /**
   * @description - This handles getting user's recipes
   * @static
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} Object
   * @memberof UserController
   */
  static getRecipes(request, response) {
    const where = {
      userId: request.token.userId
    };
    modelPaginator(Recipe, request, response, where);
  }

  /**
   * @description - This handles get user's profile
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} Response Object
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
   *@description - This handles updating user's profile
   * @static
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} Object
   * @memberof UserController
   */
  static async updateProfile(request, response) {
    const { oldPassword } = request.body;
    const user = await User.findById(request.token.userId, {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'rememberToken']
      }
    });

    if (!user) {
      return failureResponse(response, 404, userNotFoundMessage);
    }

    if (oldPassword || oldPassword === '') {
      const bcryptResponse = await bcrypt.compare(oldPassword, user.password);
      if (!bcryptResponse) {
        return failureResponse(response, 400, passwordNotMatchMessage);
      }
    }

    if (user.id === request.token.userId) {
      try {
        const updatedUser = await user
          .update(request.body, { fields: Object.keys(request.body) });
        // clone everything in the user object except password and id
        const { id: userId, password, ...data } = updatedUser.get();
        const userProfile = { userId, ...data };
        const token = jwtSigner(userProfile);
        response.status(200).send({ status: 'Success', data: { token } });
      } catch (errors) {
        return failureResponse(response, 400, undefined, [errors]);
      }
    }
    return failureResponse(response, 400, notAuthorizeMessage);
  }

  /**
 * @description - This handles requesting to reset password when forgotten
 * @static
 *
 * @param {Object} request
 * @param {Object} response
 *
 * @returns {Object} Object
 * @memberof UserController
 */
  static async forgetPassword(request, response) {
    const { email } = request.body;
    const user = await User.find({
      where: {
        email
      }
    });
    if (!user) {
      return failureResponse(response, 404, userNotFoundMessage);
    }

    const { firstName, lastName } = user;
    const fullName = `${firstName} ${lastName}`;
    const rememberToken = uuid();
    await user.update({ rememberToken });
    const { protocol, path } = request;
    const resetLink = `${protocol}://${request.get('host')}${path}/${rememberToken}`;
    const message = 'A Message has been sent to the email provided kindly read to mail to reset your password';
    const mailData = {
      email,
      subject: 'Forgot Password',
      template: 'resetPassword',
      context: {
        fullName,
        resetLink
      }
    };

    mailer(mailData);
    return successResponse(response, {}, 200, undefined, message);
  }

  /**
   * @description - This handles confirming password when forgotten
   * @static
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @memberof UserController
   * @returns {Object} Object
   */
  static async confirmForgetPassword(request, response) {
    const { rememberToken } = request.params;
    const user = await User.find({
      where: {
        rememberToken
      }
    });

    if (!user) {
      return failureResponse(response, 404, userNotFoundMessage);
    }
    try {
      await user
        .update(request.body, { fields: Object.keys(request.body) });
      const { protocol } = request;
      const welcomeLink = `${protocol}://${request.get('host')}`;
      const mailOptions = {
        context: {
          fullName: `${user.firstName} ${user.lastName}`,
          welcomeLink
        },
        email: user.email,
        subject: 'Password Changed',
        template: 'resetPasswordSuccessful'
      };
      mailer(mailOptions);
      return successResponse(
        response,
        {},
        200,
        undefined,
        passwordChangedMessage
      );
    } catch (error) {
      return failureResponse(response, 400, undefined, error.message);
    }
  }
}

export default UserController;

