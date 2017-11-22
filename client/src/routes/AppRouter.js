import React from 'react';
import { Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Homepage from '../components/Hompage';
import LoginPage from '../components/auth/LoginPage';
import SignUpPage from '../components/auth/SignUpPage';
import RecipeDetail from '../components/recipes/RecipeDetail';
import UserRecipes from '../components/recipes/UserRecipes';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const history = createHistory();

const AppRouter = () => {
  return(
    <Router history={history}>
      <Switch>
        <Route path='/' component={Homepage} exact={true}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/signup' component={SignUpPage}/>
        <Route path='/recipe_details' component={RecipeDetail}/>
        <Route path='/my_recipes' component={UserRecipes}/>
        {/* <Route component={NotFoundPage}/> */}
    </Switch>
    </Router>
  )
}

export default AppRouter;
