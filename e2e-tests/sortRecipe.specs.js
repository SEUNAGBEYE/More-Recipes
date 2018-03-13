const sortRecipe = (browser, sortBy) => browser
  .click('#sort-button')
  .pause(1000)
  .click(`[data-sort=${sortBy}]`)
  .pause(1000)

export default sortRecipe;
