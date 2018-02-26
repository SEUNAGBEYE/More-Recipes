import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';

import actionTypes from '../../main/src/actions/actionTypes';

import { login,
  signUpRequest,
  logout,
  updateProfile,
  forgotPassword,
  confirmForgotPassword
} from '../../main/src/actions/auth/Auth';

import { setUserResponse,
  changePasswordResponse,
  forgotPasswordResponse
} from '../__mocks__/actions/user';

const {
  SET_CURRENT_USER,
  UPDATE_PROFILE
} = actionTypes;

const mockStore = configureMockStore([thunk]);

describe('Auth', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());


  describe('SignUp', () => {
    it('should SET_CURRENT_USER when a user is succussfully signup', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: setUserResponse
        });
      });

      const expectedAction = [
        {
          type: SET_CURRENT_USER,
          user: setUserResponse.data.token
        }
      ];
      const store = mockStore({ });
      await store.dispatch(signUpRequest({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('SignIn', () => {
    it('should SET_CURRENT_USER,when a user is succussfully signin', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: setUserResponse
        });
      });

      const expectedAction = [
        {
          type: SET_CURRENT_USER,
          user: setUserResponse.data.token
        }
      ];
      const store = mockStore({ });
      await store.dispatch(login({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('SignOut', async () => {
    it('shouldSET_CURRENT_USER,when a user is succussfully signout', async () => {
      const expectedAction = [
        {
          type: SET_CURRENT_USER,
          user: {}
        }
      ];
      const store = mockStore({ });
      await store.dispatch(logout({}));
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  describe('UpdateProfile', () => {
    it('should UPDATE_PROFILE when a user is succussfully update his/her profile', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: setUserResponse
        });
      });

      const expectedAction = [
        {
          type: UPDATE_PROFILE,
          user: setUserResponse.data.token
        }
      ];
      const store = mockStore({ });
      await store.dispatch(updateProfile({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });
  describe('confirmForgotPassword', () => {
    it('should return status code 200 when a user is successfully resets his/her password', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: changePasswordResponse
        });
      });

      const store = mockStore({ });
      await store.dispatch(confirmForgotPassword({}))
        .then((res) => {
          expect(res).toEqual(changePasswordResponse);
        });
    });
  });

  describe('confirmForgotPassword', () => {
    it('should return status code 200 when a user request to resets his/her password', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: forgotPasswordResponse
        });
      });

      const store = mockStore({ });
      await store.dispatch(forgotPassword({}))
        .then((res) => {
          expect(res).toEqual(forgotPasswordResponse);
        });
    });
  });
});
