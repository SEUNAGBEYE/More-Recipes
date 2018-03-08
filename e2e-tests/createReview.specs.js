const createReview = (browser, review) => browser
  .setValue('#review', review)
  .pause(1000)
  .submitForm('#create-review-form')
  .pause(2000)

export default createReview;
