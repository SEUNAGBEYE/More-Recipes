import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import Homepage from '../components/Hompage';
import LoginPage from '../components/auth/LoginPage';
import SignUpPage from '../components/auth/SignUpPage';
import RecipeDetail from '../components/recipes/RecipeDetail';
import UserRecipes from '../components/recipes/UserRecipes';


  const AppRouter = () => {
    return(
      <BrowserRouter>
      <div>
        <Switch>
          <Route path='/' component={Homepage} exact={true}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/signup' component={SignUpPage}/>
          <Route path='/recipe_details' component={RecipeDetail}/>
          <Route path='/my_recipes' component={UserRecipes}/>
          {/* <Route component={NotFoundPage}/> */}
      </Switch>
      </div>
      </BrowserRouter>
    )
}

export default AppRouter;
