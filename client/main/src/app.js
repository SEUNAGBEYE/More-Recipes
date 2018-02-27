import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import jwt from 'jsonwebtoken';
import { store } from './store/configureStore';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { setCurrentUserAction } from './actions/auth/Auth';
import '../../public/assets/bootstrap-4/css/bootstrap.min.css';
import '../../public/assets/scss/style.scss';
import AppRouter from './routes/AppRouter';


if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  store.dispatch(setCurrentUserAction(jwt.decode(localStorage.token)));
}

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);


ReactDOM.render(jsx, document.getElementById('app'));

