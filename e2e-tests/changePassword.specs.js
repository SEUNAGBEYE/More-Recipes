const changePassword = (browser, user = {}) => browser
  .waitForElementVisible('body', 5000)
  .click('[data-reset-password=reset-password]')
  .pause(1000)
  .setValue('input[name=oldPassword]', user.password)
  .pause(1000)
  .setValue('input[name=newPassword]', user.newPassword)
  .pause(1000)
  .setValue('input[name=confirmPassword]', user.newPassword)
  .pause(1000)
  .execute(function () { //eslint-disable-line
    // eslint-disable-next-line
    document.querySelector('#resetPasswordButton').click();
  })
  .pause(10000);
export default changePassword;
