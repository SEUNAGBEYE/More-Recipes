import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';

/**
 * @export
 * @return {obj} obj
 * @param {any} user
 */
export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    user
  };
}

/**
 * @export
 * @param {any} data
 * @param {any} [history=[]]
 * @returns {obj} obj
 */
export function login(data, history = []) {
  return dispatch => axios.post('/api/v1/users/signin', data)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      const decoded = jwt.decode(token);
      toastr.success(`${decoded.firstName} ${decoded.lastName}`, 'Welcome');
      return dispatch(setCurrentUser(decoded));
    })
    .catch((error) => {
      if (error) {
        console.log(error, console.log(error.message));
        toastr.error('Invalid password or email', 'Error');
      }
    });
}

/**
 * @export
 * @returns {obj} obj
 */
export function logout() {
  return dispatch => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    toastr.success('Logout successfull');
    return dispatch(setCurrentUser({}));
  };
}
