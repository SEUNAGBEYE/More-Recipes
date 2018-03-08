const createReview = (browser, review) => browser
  .setValue('#review', review)
  .submitForm('#create-review-form')
  .pause(5000)

export default createReview;
