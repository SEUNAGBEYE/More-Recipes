const favouriteRecipe = (browser, recipeId) => browser
  .click(`[data-favourite-icon=favourite-icon-${recipeId}]`)
  .pause(1000)

export default favouriteRecipe;
