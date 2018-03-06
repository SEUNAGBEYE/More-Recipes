const signUpUser = (browser, user = {}) => browser
  .waitForElementVisible('body', 5000)
  .assert.containsText('#brand', 'Recipes')
  .click('#signUp')
  .setValue('input[name=firstName]', user.firstName)
  .setValue('input[name=lastName]', user.lastName)
  .setValue('input[name=email]', user.email)
  .setValue('input[name=newPassword]', user.password)
  .setValue('input[name=confirmPassword]', user.password)
  .assert.containsText('#signUpSubmit', 'Signup')
  .execute(function () { //eslint-disable-line
    document.querySelector('#signUpSubmit').click();
  })
  .pause(1000)
  .url('http://localhost:7000')
export default signUpUser;
