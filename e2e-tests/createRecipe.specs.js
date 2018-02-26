const createRecipe = (browser, recipe = {}) => browser
  .click('#user-drop-down')
  .click('#my-recipes')
  .waitForElementVisible('#userRecipesBody', 5000)
  .pause(1000)
  .click('#addRecipe')
  .waitForElementVisible('#addModal', 5000)
  .pause(1000)
  .setValue('#recipeName', recipe.name)
  .setValue('#recipeDescription', recipe.description)
  .click('#categoryId')
  .click('#categoryLunch')
  .click('#submit')
  .pause(3000)

export default createRecipe;
