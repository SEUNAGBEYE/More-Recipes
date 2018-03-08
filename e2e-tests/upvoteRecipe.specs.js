const upvoteRecipe = (browser, recipeId) => browser
  .click(`[data-upvote-icon=upvote-icon-${recipeId}]`)
  .pause(1000)

export default upvoteRecipe;
