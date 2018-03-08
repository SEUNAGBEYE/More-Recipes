const searchRecipe = (browser, query) => browser
  .setValue('input[name=search]', query)
  .submitForm('#search-form')
  .pause(3000)

export default searchRecipe;
