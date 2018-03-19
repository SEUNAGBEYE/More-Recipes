import path from 'path';

const updateProfile = (browser, user = {}) => browser
  .waitForElementVisible('body', 5000)
  .click('[data-update-profile=update-profile]')
  .pause(1000)
  .clearValue('input[name=firstName]')
  .setValue('input[name=firstName]', 'Sky')
  .pause(1000)
  .clearValue('input[name=lastName]')
  .setValue('input[name=lastName]', user.lastName)
  .pause(1000)
  .setValue('input[name=facebookUrl]', user.facebookUrl)
  .pause(1000)
  .setValue('input[name=twitterUrl]', user.twitterUrl)
  .pause(1000)
  .setValue('input[name=linkedInUrl]', user.linkedInUrl)
  .pause(1000)
  .setValue('#aboutMe', user.aboutMe)
  .pause(1000)
  .setValue('input[name=profilePicture]', path.resolve(user.profilePicture))
  .pause(1000)
  .execute(function () { //eslint-disable-line
    // eslint-disable-next-line
    document.querySelector('#updateProfileButton').click();
  })
  .pause(10000)
export default updateProfile;
