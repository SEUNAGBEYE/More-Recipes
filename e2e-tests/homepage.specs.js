import signUpUser from './signup.specs';
import { validUser, invalidUser } from './__mocks__/users';
import validRecipe from './__mocks__/recipes';
import createRecipe from './createRecipe.specs';

export default {
  'Display homepage and ensure all element are available': (browser) => {
    browser

      .url('http://localhost:7000')
      .waitForElementVisible('body', 5000)
      .assert.title('Get Your Recipe')
      .assert.containsText('#signIn', 'Sign In')
      .assert.containsText('#signUp', 'Sign Up')
      .assert.containsText('.overlay__h3', 'Welcome To Recipes. All About Reciping')
    signUpUser(browser, validUser)
      .waitForElementVisible('body', 5000)
      .assert.title('Get Your Recipe')
      .assert.containsText('#user-drop-down', 'Seun')
      // .assert.containsText('#signUp', 'Sign Up')
      .assert.containsText('.overlay__h3', 'Welcome To Recipes. All About Reciping')
      .assert.containsText('.title__link', 'Recipes')
      .assert.containsText('#brand', 'Recipes')
      .assert.containsText('.categories', 'Categories')
    createRecipe(browser, validRecipe)
    browser.end();
  }
};
