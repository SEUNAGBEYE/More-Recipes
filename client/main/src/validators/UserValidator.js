/**
 * @export
 * @class UserValidator
 */
export default class UserValidator {
  /**
   * @static
   * @param {obj} event
   * @param {obj} that
   * @returns {void} void
   * @memberof UserValidator
   */
  static passwordValidator(event, that) {
    if (event.target.name === 'newPassword') {
      if (event.target.value.length < 6) {
        that.setState({ passwordError: 'Password must be greater or equal to six characters' });
      } else {
        that.setState({
          password: that.state.newPassword,
          passwordError: ''
        });
      }
    }
    if (event.target.name === 'confirmPassword') {
      if (event.target.value !== that.state.newPassword) {
        that.setState({ passwordError: 'Password does not match' });
      } else {
        that.setState({
          password: that.state.newPassword,
          passwordError: ''
        });
      }
    }
  }
}
