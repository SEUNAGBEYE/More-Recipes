import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';

const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  user
});

const login = (data, history = []) => dispatch => (axios.post('/api/v1/users/signin', data)
  .then((res) => {
    const token = res.data;
    localStorage.setItem('token', token);
    setAuthorizationToken(token);
    const decoded = jwt.decode(token);
    dispatch(setCurrentUser(decoded));
    toastr.success(`${decoded.firstName} ${decoded.lastName}`, 'Welcome');
    history.push('/');
  })
  .catch((error) => {
    if (error) {
      console.log(error);
      toastr.error('Invalid password or email', 'Error');
    }
  })
);

const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthorizationToken(false);
  toastr.success('Logout successfull');
  dispatch(setCurrentUser({}));
};

export { login, logout, setCurrentUser };
