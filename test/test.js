import chai, { assert, expect } from 'chai';
import chaiHtpp from 'chai-http';
import { recipeRoute } from '../routes/recipes';

chai.use(chaiHtpp);
describe('Test For Recipes Routes', () => {
  describe('Test Getting all recipes', () => {
    it('the body should be an array and it should have a statusCode of 200 when trying to get all recipes', (done) => {
      chai.request(recipeRoute)
        .get('/')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isArray(res.body, 'respone return array of object');
        });
        done();
    });
  });

  describe('Test For Getting A  Single Recipe', () => {
    it('body should be an object and it should have a statusCode of 200 when trying to get a recipe', (done) => {
      chai.request(recipeRoute)
        .get('/2')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.id).equal(2);
          assert.isObject(res.body, 'respone return an object');
          done();
        });
    });
  });

  describe('Test For Getting A  Single Recipe Not The Memory', () => {
    it('it should have a statusCode of 404 when trying to get a recipe not in memory', (done) => {
      chai.request(recipeRoute)
        .get('/2333333')
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.id).equal(undefined);
          done();
        });
    });
  });

  describe('Test For Adding A  Single Recipe', () => {
    it('body should return an object and it should have a statusCode of 200 when trying to get all recipes', (done) => {
      chai.request(recipeRoute)
        .post('/')
        .send({
          name: 'Amala',
          description: 'This is made from carbonhydrate',
          review: 'This is the best african food'
        })
        .then((res) => {
          expect(res).to.have.status(200);
          assert.isObject(res.body, 'respone return an object');
          done();
        })
        .catch((error) => {
          throw error;
        });
      done();
    });
  });

  describe('Test For Updating A  Single Recipe', () => {
    it('body should return an object and it should have a statusCode of 200 when trying to get all recipes', (done) => {
      chai.request(recipeRoute)
        .put('/2')
        .send({
          name: 'Amala',
          description: 'This is made from carbonhydrate',
          review: 'This is the best african food'
        })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.id).equal(2);
          assert.isObject(res.body, 'respone return an object');
          done();
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  describe('Test For Updating A  Single Recipe Not In Memory', (done) => {
    it('body should return an object and it should have a statusCode of 404 when trying to get all recipes', (done) => {
      chai.request(recipeRoute)
        .put('/244444')
        .send({
          name: 'Amala',
          description: 'This is made from carbonhydrate',
          review: 'This is the best african food'
        })
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body.id).equal(undefined);
          done();
        })
        .catch((error) => {
          throw error;
        });
      done();
    });
  });

  describe('Test For Updating A  Single Recipe Not In Memory', () => {
    it('body should return an object and it should have a statusCode of 404 when trying to get all recipes', (done) => {
      chai.request(recipeRoute)
        .delete('/2')
        .end((error, res) => {
          expect(res).to.have.status(204);
          expect(res.body.id).equal(undefined);
          done();
        });
    });
  });

  describe('Test For Updating A  Single Recipe Not In Memory', () => {
    it('body should return an object and it should have a statusCode of 404 when trying to get all recipes', (done) => {
      chai.request(recipeRoute)
        .delete('/2222')
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.id).equal(undefined);
          done();
        });
    });
  });

  describe('Test For Updating A  Single Recipe Not In Memory', () => {
    it('body should return an object and it should have a statusCode of 404 when trying to get all recipes', (done) => {
      chai.request(recipeRoute)
        .get('/?sort=upvotes&order=desc')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0].upvotes).equal(21);
          done();
        });
    });
  });
});
