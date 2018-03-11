const createRecipe = (browser, recipe = {}) => browser
  .click('#user-drop-down')
  .click('#my-recipes')
  .waitForElementVisible('#userRecipesBody', 5000)
  .pause(1000)
  .click('#addRecipe')
  .waitForElementVisible('#addModal', 5000)
  .pause(1000)
  .setValue('#recipeName', recipe.name)
  .pause(1000)
  .setValue('#recipeDescription', recipe.description)
  .pause(1000)
  .click('#ingredient')
  .pause(1000)
  .setValue('[data-name="ingredients-0"]', 'Sugar')
  .pause(1000)
  .click('#ingredient')
  .pause(1000)
  .setValue('[data-name="ingredients-1"]', 'Water')
  .pause(1000)
  .click('#step')
  .pause(1000)
  .setValue('[data-name="steps-0"]', 'one')
  .pause(1000)
  .click('#step')
  .pause(1000)
  .setValue('[data-name="steps-1"]', 'two')
  .pause(1000)
  .click('#categoryId')
  .pause(1000)
  .click(`#${recipe.category}`)
  .pause(1000)
  .click('#submit')
  .pause(2000)

export default createRecipe;
