import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import '../public/assets/bootstrap-4/css/bootstrap.min.css';
import '../public/assets/css/main.css';
import AppRouter from './routes/AppRouter';
        
ReactDOM.render(<AppRouter />, document.getElementById('app'));
    