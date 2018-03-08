[![Build Status](https://travis-ci.org/SEUNAGBEYE/More-Recipes.svg?branch=server-developing)](https://travis-ci.org/SEUNAGBEYE/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/SEUNAGBEYE/More-Recipes/badge.svg?branch=development)](https://coveralls.io/github/SEUNAGBEYE/More-Recipes?branch=development)
[![codecov](https://codecov.io/gh/SEUNAGBEYE/More-Recipes/branch/development/graph/badge.svg)](https://codecov.io/gh/SEUNAGBEYE/More-Recipes)
[![Maintainability](https://api.codeclimate.com/v1/badges/cfa1eddd9d86ea7c5b4d/maintainability)](https://codeclimate.com/github/SEUNAGBEYE/More-Recipes/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cfa1eddd9d86ea7c5b4d/test_coverage)](https://codeclimate.com/github/SEUNAGBEYE/More-Recipes/test_coverage)

This is a project that allows users to upload, search, review, up-vote and down-vote a recipe.!!


## More-recipes
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favourited recipes on the application.


 ## Installation

- Clone or Download this project, run npm install to install or dependency

 Setup the database in the config.js file, create ```.env file``` that look exactly like the ```.env.sample file``` and you are good to start by running npm run dev-server 
 

 # Test

Test is a very essential part of all application because it ensures codes contributed to any project do not not break it

 - server side test -> ```npm run test```
 - client side test -> ```npm run client:side:test```
 - client & server side test -> ```npm run test:all```
 - e2e test -> ```npm run e2e:server && npm run e2e:test```
 


## How it works 
* User can see recipes uploaded by the users of the app,

* Users can:
	* view a recipe, 
	* Search for recipes
* Authenticated users should be able to:
    * Add a recipe
    * View or modify the recipe he/she added
    * Delete the recipe he/she addedP
    * Retrieve recipes from the app
    * Modify a recipe in the app,
    * Delete a recipe from the app
    * Retrieve favorited recipes from the app
    * Add a review for a recipe
    * Retrieve recipes with the most upvotes
    

<h3>ENDPOINTS</h3>
<hr>
<table>

  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/signup</td>
      <td>Create an account</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/signin</td>
      <td>Signin to the app</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes</td>
      <td>Create a recipe</td>
  </tr>
  <tr>
        <td>GET</td>
        <td>/api/recipes/:id</td>
        <td>Get a recipe</td>
  </tr>
  <tr>
      <td>DELETE</td>
      <td>/api/v1/recipes/:id</td>
      <td>Delete a recipe you created</td>
  </tr>
  
  <tr>
      <td>PUT</td>
      <td>/api/v1/recipes/:id</td>
      <td>Update a reecipe you created</td>
  </tr>
  
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes/:id/upvote</td>
      <td>Upvote a recipe</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/recipes/:id/reviews </td>
      <td>Post a review</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes/:id/upvote</td>
      <td>Upvote a recipe</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes/:id/downvote</td>
      <td>Downvote a recipe</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/:id/recipes</td>
      <td>Favorite a recipe</td>
  </tr>
   <tr>
      <td>GET</td>
      <td>/api/v1/users/:id/recipes</td>
      <td>Get all your users recipes</td>
  </tr>

   <tr>
      <td>GET</td>
      <td>/api/v1/users/myrecipes</td>
      <td>Get all users recipes</td>
  </tr>

  <tr>
      <td>GET</td>
      <td>/api/recipes</td>
      <td>Get all recipe</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/recipes?sort=upvotes&order=des</td>
      <td>Gets recipe with most Upvotes</td>
  </tr>
</table>
<br/>

# Technologies

* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Nodejs](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Webpack](https://webpack.js.org/)
* [Sequelize](http://docs.sequelizejs.com/)
* [Postgresql](https://www.postgresql.org/)

# Api Documentatiom
- To access the API documentation built with swagger please check recipes-v1.herokuapp.com/api-docs/

# FAQ

* Who can contribute ?

`Anyone`

## Author 
____

Seun Agbeye [SEUNAGBEYE](https://github.com/SEUNAGBEYE/)

## License 
____

This is licensed for your use, modification and distribution under the [MIT LICENSE](https://github.com/SEUNAGBEYE/More-Recipes/blob/development/LICENSE)


checkout the UI at https://seunagbeye.github.io/More-Recipes/template/

