import expect from 'expect';
import authReducer, { initialState } from '../../main/src/reducers/auth';
import actionTypes from '../../main/src/actions/actionTypes';
import { setCurrentUserAction,
  updateProfileAction
} from '../../main/src/actions/auth/Auth';
import authenticatedUserState from '../__mocks__/reducers/user';

const {
  SET_CURRENT_USER,
  UPDATE_PROFILE
} = actionTypes;

describe('Auth Reducer', () => {
  it('should return initial state for unknown action types', () => {
    const state = authReducer(undefined);
    expect(state).toEqual(initialState);
    expect(state.user).toEqual({});
    expect(state.isAuthenticated).toBeFalsy();
  });

  it(`should handle ${SET_CURRENT_USER} action type`, () => {
    const userObject = authenticatedUserState.user;
    const action = setCurrentUserAction(userObject);
    const state = authReducer(SET_CURRENT_USER, action);
    expect(state).toEqual(authenticatedUserState);
    expect(state.user).toEqual(authenticatedUserState.user);
    expect(state.favouriteRecipes)
      .toEqual(authenticatedUserState.favouriteRecipes);
    expect(state.userFavouritedRecipeId)
      .toEqual(authenticatedUserState.userFavouritedRecipeId);
    expect(state.isAuthenticated).toBeTruthy();
  });

  it(`should handle ${UPDATE_PROFILE} action type`, () => {
    const userObject = authenticatedUserState.user;
    const action = updateProfileAction(userObject);
    const state = authReducer(UPDATE_PROFILE, action);
    expect(state).toEqual(authenticatedUserState);
    expect(state.user).toEqual(authenticatedUserState.user);
    expect(state.favouriteRecipes)
      .toEqual(authenticatedUserState.favouriteRecipes);
    expect(state.userFavouritedRecipeId)
      .toEqual(authenticatedUserState.userFavouritedRecipeId);
    expect(state.isAuthenticated).toBeTruthy();
  });
});
