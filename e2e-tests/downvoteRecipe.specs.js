const downvoteRecipe = (browser, recipeId) => browser
  .click(`[data-downvote-icon=downvote-icon-${recipeId}]`)
  .pause(1000)

export default downvoteRecipe;
