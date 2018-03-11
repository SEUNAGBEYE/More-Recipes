const signUpUser = (browser, user = {}) => browser
  .waitForElementVisible('body', 5000)
  .assert.containsText('#brand', 'Recipes')
  .click('#signUp')
  .setValue('input[name=firstName]', user.firstName)
  .pause(1000)
  .setValue('input[name=lastName]', user.lastName)
  .pause(1000)
  .setValue('input[name=email]', user.email)
  .pause(1000)
  .setValue('input[name=newPassword]', user.password)
  .pause(1000)
  .setValue('input[name=confirmPassword]', user.password)
  .pause(1000)
  .assert.containsText('#signUpSubmit', 'Signup')
  .execute(function () { //eslint-disable-line
    document.querySelector('#signUpSubmit').click();
  })
  .pause(1000)
  .url('http://localhost:7000')
export default signUpUser;
