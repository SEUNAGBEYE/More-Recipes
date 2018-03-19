import chromedriver from 'chromedriver';

export default {
  before: (done) => {
    chromedriver.start();
    done();
  },

  after: (done) => {
    chromedriver.stop();
    done();
  }
};
