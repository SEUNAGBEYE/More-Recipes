const updateProfile = (browser, user = {}) => browser
  .waitForElementVisible('body', 5000)
  .click('[data-edit-profile=edit-profile]')
  .pause(1000)
  .setValue('input[name=firstName]', 'Sky')
  .pause(1000)
  .setValue('input[name=lastName]', user.lastName)
  .pause(1000)
  .setValue('input[name=facebookUrl]', user.facebookUrl)
  .pause(1000)
  .setValue('input[name=twitterUrl]', user.twitterUrl)
  .pause(1000)
  .setValue('input[name=linkedInUrl]', user.linkedInUrl)
  .pause(1000)
  .setValue('input[name=aboutMe]', user.aboutMe)
  .pause(1000)
  .setValue('input[name=profilePicture]', user.profilePicture)
  .pause(1000)
  .execute(function () { //eslint-disable-line
    document.querySelector('#updateProfileButton').click();
  })
  .pause(10000)
export default updateProfile;
