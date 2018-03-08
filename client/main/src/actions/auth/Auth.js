import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';
import actionTypes from '../actionTypes';

const {
  SET_CURRENT_USER,
  UPDATE_PROFILE,
} = actionTypes;

/**
 * @description - Set Current User Action
 * @export - setCurrentUserAction
 *
 * @param {Object} user
 *
 * @return {Object} Object
 */
export function setCurrentUserAction(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 * @description Update Profile Action
 * @export - updateProfileAction
 *
 * @param {Object} user
 *
 * @returns {Object} Object
 */
export function updateProfileAction(user) {
  return {
    type: UPDATE_PROFILE,
    user
  };
}

/**
 * @description - Set Current User Action Creator
 *
 * @param {Object} action
 * @param {String} actionType
 * @param {Object} response
 * @param {Object} dispatch
 *
 * @returns {void}
 */
function setCurrentUser(action, actionType, response, dispatch) {
  const { token } = response.data;
  localStorage.setItem('token', token);
  setAuthorizationToken(token);
  const decoded = jwt.decode(token);
  if (actionType === 'SET_CURRENT_USER') {
    toastr.success(`${decoded.firstName} ${decoded.lastName}`, 'Welcome');
  } else {
    toastr.success('Profile Updated', 'Success!');
  }
  dispatch(action(decoded));
}

/**
 * @description - Login Action Creator
 * @export - login
 * @param {Object} data
 * @param {Object} [history={}]
 *
 * @returns {Object} Object
 */
export function login(data, history = {}) {
  return dispatch => axios.post('/api/v1/users/signin', data)
    .then((response) => setCurrentUser(
      setCurrentUserAction,
      'SET_CURRENT_USER', response.data,
      dispatch
    ))
    .catch((error) => {
      if (error) {
        toastr.error('Invalid password or email', 'Error');
        return error.message;
      }
    });
}

/**
 * @description - Sign Up Request Action Creator
 * @export - signUpRequest
 *
 * @param {Object} data
 * @param {Object} history
 *
 * @returns {Object} Object
 */
export function signUpRequest(data, history = []) {
  return dispatch => axios.post('/api/v1/users/signup', data)
    .then(response => setCurrentUser(
      setCurrentUserAction, 'SET_CURRENT_USER',
      response.data, dispatch
    ))
    .catch(error => error.responseponse.data);
}

/**
 * @description - Update Profile Action Creator
 * @export - updateProfile
 *
 * @param {Object} data
 *
 * @returns {Object} Object
 */
export function updateProfile(data) {
  return dispatch => axios.put('/api/v1/users/profile', data)
    .then(response => setCurrentUser(
      updateProfileAction,
      'UPDATE_PROFILE',
      response.data,
      dispatch
    ))
    .catch(error => error.responseponse.data);
}

/**
 * @description - Forgot Password
 * @export - forgotPassword
 *
 * @param {Object} data
 *
 * @returns {Object} Object
 */
export function forgotPassword(data) {
  return dispatch => axios
    .post('/api/v1/users/forgot-password', data)
    .then(response => response.data);
}

/**
 * @export - confirmForgotPassword
 *
 * @param {Object} data
 * @param {String} rememberToken
 *
 * @returns {Object} Object
 */
export function confirmForgotPassword(data, rememberToken) {
  return dispatch => axios
    .put(`/api/v1/users/forgot-password/${rememberToken}`, data)
    .then(response => response.data);
}

/**
 * @description - Logout Function
 * @export - logout
 *
 * @returns {Object} Object
 */
export function logout() {
  return dispatch => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    toastr.success('Logout successfull');
    return dispatch(setCurrentUserAction({}));
  };
}
