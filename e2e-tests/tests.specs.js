import signUpUser from './signup.specs';
import signInUser from './signin.specs';
import { validUser, validUserTwo, invalidUser } from './__mocks__/users';
import { validRecipe, validRecipeTwo } from './__mocks__/recipes';
import createRecipe from './createRecipe.specs';
import editRecipe from './editRecipe.specs';
import signOut from './signout.specs';
import { deleteRecipe,
  searchRecipe,
  createReview,
  favouriteRecipe,
  upvoteRecipe,
  downvoteRecipe,
  categorizeRecipe,
  updateProfile,
  changePassword
} from './testsContainer';


const clearSignInValue = browser => browser
  .clearValue('#email')
  .click('#password')
  .clearValue('#password');
const clickRecipeCard = (browser, recipeId) => browser
  .click(`[data-recipe-card-id=recipe${recipeId}`);

const baseUrl = 'http://localhost:7000';

export default {
  'Display homepage and ensure all element are available': (browser) => {
    browser
      .resizeWindow(1400, 1600)
      .url(baseUrl)
      .waitForElementVisible('body', 5000)
      .assert.title('Get Your Recipe')
      .assert.containsText('#signIn', 'Sign In')
      .assert.containsText('#signUp', 'Sign Up')
      .assert.containsText('.overlay__h3', 'Welcome To Recipes. All About Reciping')
      .assert.containsText('.title__link', 'Recipes')
      .assert.containsText('#brand', 'Recipes')
      .assert.containsText('.categories', 'Categories');
    signUpUser(browser, invalidUser);
    signUpUser(browser, validUser);
    signOut(browser);
    signInUser(browser, invalidUser);
    clearSignInValue(browser);
    signInUser(browser, validUser)
      .pause(2000)
      .url(baseUrl)
      .waitForElementVisible('body', 5000)
      .assert.title('Get Your Recipe')
      .assert.containsText('.overlay__h3', 'Welcome To Recipes. All About Reciping')
      .assert.containsText('.title__link', 'Recipes')
      .assert.containsText('#brand', 'Recipes')
      .assert.containsText('.categories', 'Categories');
    createRecipe(browser, validRecipe)
      .url(`${baseUrl}/my_recipes`);
    editRecipe(browser)
      .url(`${baseUrl}/my_recipes`);
    clickRecipeCard(browser, validRecipe.id);
    createReview(browser, validUser.reviews[0]);
    createReview(browser, validUser.reviews[1]);
    createReview(browser, validUser.reviews[2]);
    createReview(browser, validUser.reviews[3])
      .url(`${baseUrl}/recipe/1`);
    signOut(browser)
      .pause(1000)
      .click('#not-a-member')
      .pause(2000);
    signUpUser(browser, validUserTwo);
    createRecipe(browser, validRecipeTwo)
      .url(`${baseUrl}/my_recipes`);
    searchRecipe(browser, validRecipeTwo.name)
      .click('#user-drop-down')
      .pause(1000)
      .click('#all-recipes')
      .pause(1000)
    favouriteRecipe(browser, validRecipe.id)
      .pause(1000)
    downvoteRecipe(browser, validRecipe.id)
      .pause(1000)
    upvoteRecipe(browser, validRecipe.id)
      .pause(1000)
      .click('#user-drop-down')
      .pause(1000)
      .click('#favourite-recipes')
      .pause(1000)
    categorizeRecipe(browser, 'Breakfast')
    categorizeRecipe(browser, 'Lunch')
    categorizeRecipe(browser, 'Dinner')
    categorizeRecipe(browser, 'Desserts')
    categorizeRecipe(browser, 'Noodles')
    categorizeRecipe(browser, 'Drinks')
      .click('#user-drop-down')
      .pause(1000)
      .click('#all-recipes')
    deleteRecipe(browser, validRecipeTwo.id)
      .click('#user-drop-down')
      .pause(1000)
      .click('#profile')
    updateProfile(browser, validUserTwo)
    changePassword(browser, validUserTwo)
    browser.end();
  }
};
