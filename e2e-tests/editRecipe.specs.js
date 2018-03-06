import path from 'path';

const imagePath = '/Users/seunagbeye/andela-projects/More-Recipes/client/public/assets/img/pasta1.jpeg';

const editRecipe = browser => browser
  .waitForElementVisible('[data-recipe-card-id="recipe1"]', 5000)
  .click('#editModal1Button')
  .pause(3000)
  .waitForElementVisible('#editModal1', 5000)
  .pause(1000)
  .setValue('#recipePicture1', path.resolve(imagePath))
  .click('[data-update=update-recipe1')
  .pause(17000)

export default editRecipe;
