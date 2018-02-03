import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';

/**
 * @export
 * @return {obj} obj
 * @param {obj} user
 */
export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    user
  };
}

/**
 * @export
 * @param {any} user
 * @returns {obj} obj
 */
export function updateProfileAction(user) {
  return {
    type: 'UPDATE_PROFILE',
    user
  };
}

/**
 * @param {any} action
 * @param {any} actionType
 * @param {obj} res
 * @param {obj} dispatch
 * @returns {void}
 */
function user(action, actionType, res, dispatch) {
  const { token } = res.data;
  localStorage.setItem('token', token);
  setAuthorizationToken(token);
  const decoded = jwt.decode(token);
  if (actionType === 'SET_CURRENT_USER') {
    toastr.success(`${decoded.firstName} ${decoded.lastName}`, 'Welcome');
  } else {
    toastr.success('Profile Updated', 'Success!');
  }
  return dispatch(action(decoded));
}

/**
 *
 *
 * @param {obj} data
 * @param {obj} [history={}]
 * @returns {void}
 */
function loginHelper(data, history = {}) {
  return dispatch => axios.post('/api/v1/users/signin', data)
    .then((res) => user(setCurrentUser, 'SET_CURRENT_USER', res.data, dispatch))
    .catch((error) => {
      if (error) {
        toastr.error('Invalid password or email', 'Error');
        return error.message;
      }
    });
}

/**
 *
 *
 * @export
 * @param {obj} data
 * @param {obj} history
 * @returns {obj} obj
 */
export function signUpRequest(data, history = []) {
  return dispatch => axios.post('/api/v1/users/signup', data)
    .then(res => user(setCurrentUser, 'SET_CURRENT_USER', res.data, dispatch))
    .catch(error => error.response.data.errors);
}

/**
 *
 *
 * @export
 * @param {obj} data
 * @returns {obj} obj
 */
export function updateProfile(data) {
  return dispatch => axios.put('/api/v1/users/profile', data)
    .then(res => user(updateProfileAction, 'UPDATE_PROFILE', res.data, dispatch))
    .catch(error => console.log(error.response.data));
}

/**
 * @export
 * @param {string} data
 * @returns {obj} obj
 */
export function forgotPassword(data) {
  return dispatch => axios.post('/api/v1/users/forgot-password', data);
}

/**
 * @export
 * @param {string} data
 * @param {string} rememberToken
 * @returns {obj} obj
 */
export function confirmForgotPassword(data, rememberToken) {
  return dispatch => axios.put(`/api/v1/users/forgot-password/${rememberToken}`, data);
}


/**
 * @export
 * @param {obj} data
 * @param {obj} [history=[]]
 * @returns {obj} obj
 */
export function login(data, history = []) {
  return loginHelper(data, history);
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
