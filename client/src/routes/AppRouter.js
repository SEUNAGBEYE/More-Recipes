import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import Homepage from '../components/Hompage';
import LoginPage from '../components/auth/LoginPage';
import SignUpPage from '../components/auth/SignUpPage';


  const AppRouter = () => {
    return(
      <BrowserRouter>
      <div>
        <Switch>
          <Route path='/' component={Homepage} exact={true}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/signup' component={SignUpPage}/>
          {/* <Route component={NotFoundPage}/> */}
      </Switch>
      </div>
      </BrowserRouter>
    )
}

export default AppRouter;
