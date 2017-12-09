import React from 'react';
import {  Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Homepage from '../components/Hompage';
import LoginPage from '../components/auth/LoginPage';
import SignUpPage from '../components/auth/SignUpPage';
import RecipeDetail from '../components/recipes/RecipeDetail';
import FavouriteRecipes from '../components/recipes/FavouriteRecipes';
import UserRecipes from '../components/recipes/UserRecipes';
import AllRecipes from '../components/recipes/AllRecipes';
import SearchResults from '../components/recipes/SearchResults';
import UserProfile from '../components/UserProfile';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import NotFoundPage from '../components/common/NotFoundPage';

const history = createHistory();

const AppRouter = () => {
  return(
    <Router history={history}>
      <div>
        <Switch>
          <Route path='/' component={Homepage} exact={true}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/signup' component={SignUpPage}/>
          <Route path='/recipe_details' component={RecipeDetail}/>
          <Route path='/recipe/:id' component={RecipeDetail}/>
          <Route path='/my_recipes' component={UserRecipes}/>
          <Route path='/my_favourites' component={FavouriteRecipes}/>
          <Route path='/profile' component={UserProfile}/>
          <Route path='/recipes' component={AllRecipes}/>
          <Route path='/search_results' component={SearchResults}/>
          {<Route component={NotFoundPage}/>}
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter;
