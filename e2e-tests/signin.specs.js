const signInUser = (browser, user = {}) => browser
  .waitForElementVisible('body', 5000)
  .assert.containsText('#brand', 'Recipes')
  .setValue('#email', user.email)
  .pause(1000)
  .setValue('#password', user.password)
  .pause(1000)
  .assert.containsText('#loginSubmit', 'Login')
      .execute(function () { //eslint-disable-line
    document.querySelector('#loginSubmit').click();
  })
export default signInUser;
