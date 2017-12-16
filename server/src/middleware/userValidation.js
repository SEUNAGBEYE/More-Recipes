import Validator from 'validatorjs';

/**
 * @export
 * @class UserValidator
 */
export default class UserValidator {
  /**
   * Creates an instance of UserValidator.
   * @memberof UserValidator
   */
  constructor() {
    const loginRules = {
      password: 'required|alpha_dash|min:6',
      email: 'required|email',
    };
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {error} error
   * @memberof UserValidator
   */
  static signUp(req, res, next) {
    const signUpRules = {
      email: 'required|email',
      firstName: 'required|alpha_dash',
      lastName: 'required|alpha_dash',
      password: 'required|alpha_dash|min:6'

    };
    const {
      email, password, firstName, lastName
    } = req.body;

    console.log(email, password);
    const validator = new Validator({
      email, password, firstName, lastName
    }, signUpRules);

    if (validator.fails) {
      return res.status(400).send({ error: validator.errors.first('firstName') });
    }
    next();
  }
}
