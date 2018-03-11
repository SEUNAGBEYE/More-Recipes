const searchRecipe = (browser, query) => browser
  .setValue('input[name=search]', query)
  .pause(1000)
  .submitForm('#search-form')
  .pause(3000)

export default searchRecipe;
