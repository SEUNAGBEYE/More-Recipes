const signOut = browser => browser
  .waitForElementVisible('body', 5000)
  .assert.title('Get Your Recipe')
  .assert.containsText('#user-drop-down', 'Seun')
  .assert.containsText('#brand', 'Recipes')
  .click('#user-drop-down')
  .assert.containsText('#logout', 'Logout')
  .click('#logout')

export default signOut;
