const favouriteRecipe = (browser, categoryName) => browser
  .click('[data-category-button=category-button]')
  .pause(1000)
  .click(`[data-category-link=category-link-${categoryName}]`)
  .pause(1000)

export default favouriteRecipe;
