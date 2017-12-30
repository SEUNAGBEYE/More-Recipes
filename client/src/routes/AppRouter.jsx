import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
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
import NotFoundPage from '../components/common/NotFoundPage';
import NavBar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import requireAuthentication from '../../utils/RequireAuthentication';

const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <NavBar history={history}/>
      <Switch>
        <Route path="/" component={Homepage} exact/>
        <Route path="/login" component={LoginPage} exact/>
        <Route path="/signup" component={SignUpPage} exact/>
        <Route path="/recipe/:id" component={RecipeDetail} exact/>
        <Route path="/my_recipes" component={requireAuthentication(UserRecipes)} exact/>
        <Route path="/my_favourites" component={requireAuthentication(FavouriteRecipes)} exact/>
        <Route path="/profile" component={requireAuthentication(UserProfile)}/>
        <Route path="/recipes" component={AllRecipes} exact/>
        <Route path="/search_results" component={SearchResults} exact/>
        <Route component={NotFoundPage}/>
      </Switch>
      <Footer />
    </div>
  </Router>

);

export default AppRouter;
