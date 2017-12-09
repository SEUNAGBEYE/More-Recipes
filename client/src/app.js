import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import jwt from 'jsonwebtoken';
import {store} from './store/configureStore';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { setCurrentUser } from './actions/auth/LoginRequest';
import 'normalize.css/normalize.css';
import '../public/assets/bootstrap-4/css/bootstrap.min.css';
import '../public/assets/css/main.css';
import AppRouter from './routes/AppRouter';




if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
}

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

        
ReactDOM.render(jsx, document.getElementById('app'));
    