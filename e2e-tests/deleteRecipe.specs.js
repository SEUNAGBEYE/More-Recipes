const deleteRecipe = (browser, recipeId) => browser
  .click(`[data-delete-button=deleteModal${recipeId}]`)
  .pause(1000)
  .click(`[data-delete="${recipeId}"]`)
  .pause(1000)

export default deleteRecipe;
