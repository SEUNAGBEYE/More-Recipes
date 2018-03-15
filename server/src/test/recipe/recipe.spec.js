import chai, { assert, expect } from 'chai';
import chaiHtpp from 'chai-http';
import { recipeRoute } from '../../routes/index';


// Test For Recipes Actions

chai.use(chaiHtpp);
describe('Test For Recipes Routes', () => {
  describe('Test Getting all recipes', () => {
    it('should return return all recipes', (done) => {
      chai.request(recipeRoute)
        .get('/')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isArray(res.body.data, 'is an array of objects');
          expect(res.body.data.length).to.equals(24);
          done();
        });
    });
  });

  describe('Test For Getting A  Single Recipe', () => {
    it('should return a recipe', (done) => {
      chai.request(recipeRoute)
        .get('/11')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(parseInt(res.body.data.id, 10)).equal(11);
          assert.isObject(res.body.data, 'respone return an object');
          done();
        });
    });
  });

  describe('Test For Getting A  Single Recipe', () => {
    it('should not return a recipe when an invalid recipe id is provided', (done) => {
      chai.request(recipeRoute)
        .get('/aaaaaa')
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equals('Please input a valid ID');
          expect(res.body.status).to.equals('Failure');
          done();
        });
    });
  });

  describe('Test For Getting A  Single Recipe Not The Memory', () => {
    it('should not return a recipe that is not in the database', (done) => {
      chai.request(recipeRoute)
        .get('/2333333')
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).equal('Recipe Not Found');
          done();
        });
    });
  });

  describe('Test For Adding A  Single Recipe', () => {
    it('should create a recipe when inputs are cleaned and a valid token is provided', (done) => {
      chai.request(recipeRoute)
        .post('/')
        .send({
          id: 10,
          name: 'Amala',
          description: 'This is made from carbonhydrate',
          image: 'This is the image',
          token: 2,
          categoryId: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data.name).to.equals('Amala');
          expect(res.body.data.image).to.equals('This is the image');
          expect(res.body.data.description).to.equals('This is made from carbonhydrate');
          expect(res.body.data.userId).to.equals(2);
          expect(res.body.data.categoryId).to.equals(1);
          done();
        });
    });
  });

  describe('Test For Adding A  Single Recipe', () => {
    it('should not create a recipe when all required properties are not provided', (done) => {
      chai.request(recipeRoute)
        .post('/')
        .send({
          id: 10,
          name: 'Amala',
          description: 'This is made from carbonhydrate',
          image: 'This is the image'
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equals('Failure');
          expect(res.body).to.have.property('errors');
          assert.isArray(res.body.errors, 'is array of objects');
          expect(res.body.errors.length).to.equals(1);
          expect(res.body.errors[0].message).to.equals('Recipe.categoryId cannot be null');
          done();
        });
    });
  });

  describe('Test For Updating A  Single Recipe', () => {
    it('should update a recipe when inputs are cleaned and token is valid', (done) => {
      chai.request(recipeRoute)
        .put('/11')
        .send({
          name: 'Amala',
          description: 'This is made from carbonhydrate'
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.id).equal(11);
          expect(res.body.data.name).to.equals('Amala');
          expect(res.body.data.description).to.equals('This is made from carbonhydrate');
          assert.isObject(res.body.data, 'respone return an object');
          done();
        });
    });
  });

  describe('Test For Updating A  Single Recipe', () => {
    it('should not update a recipe when the user is unauthorize', (done) => {
      chai.request(recipeRoute)
        .put('/11')
        .send({
          token: 100,
          name: 'Amala',
          description: 'This is made from carbonhydrate',
          review: 'This is the best african food'
        })
        .end((error, res) => {
          expect(res).to.have.status(403);
          expect(res.body.message).to.equal('Not Authorize');
          done();
        });
    });
  });

  describe('Test For Updating A  Single Recipe Not In Memory', () => {
    it('should not update a recipe that does not exist in the database', (done) => {
      chai.request(recipeRoute)
        .put('/244444')
        .send({
          name: 'Amal',
          description: 'This is made from carbonhydrate',
          review: 'This is the best african food'
        })
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).equal('Recipe Not Found');
          done();
        });
    });
  });
  describe('Test For Updating A  Single Recipe Not In Memory', () => {
    it('should not update a recipe, when a recipe with the same name is already created by the user', (done) => {
      chai.request(recipeRoute)
        .put('/244444')
        .send({
          name: 'Amala',
          description: 'This is made from carbonhydrate',
          review: 'This is the best african food'
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.errors[0].message).equal('You Already added A Recipe With This Name');
          done();
        });
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('should upvote a recipe when token is valid', (done) => {
      chai.request(recipeRoute)
        .put('/11/upvotes')
        .send({
          token: 2
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.upvotes).that.include(2);
          assert.isObject(res.body, 'is an object');
          done();
        });
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('should remove a recipe from the user\'s upvoted recipes when the same route is hitted again', (done) => {
      chai.request(recipeRoute)
        .put('/11/upvotes')
        .send({
          token: 2
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.upvotes).to.not.include(2);
          done();
        });
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('should not upvote a recipe that does not exist in the database', (done) => {
      chai.request(recipeRoute)
        .put('/11111/upvotes')
        .send({
          token: 2
        })
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equals('Recipe Not Found');
          done();
        });
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('should downvote a recipe when token is valid', (done) => {
      chai.request(recipeRoute)
        .put('/11/downvotes')
        .send({
          token: 2
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.downvotes).that.include(2);
          assert.isObject(res.body, 'is an object');
          done();
        });
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('should remove a recipe from the user\'s downvoted recipes when the same route is hitted again', (done) => {
      chai.request(recipeRoute)
        .put('/11/downvotes')
        .send({
          token: 2
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.downvotes).to.not.include(2);
          assert.isObject(res.body, 'respone return an object');
          done();
        });
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('should not downvote a recipe with invalid recipe id', (done) => {
      chai.request(recipeRoute)
        .put('/""/downvotes')
        .send({
          token: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equals('Please input a valid ID');
          done();
        });
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('should not downvote a recipe that does not exist in the database', (done) => {
      chai.request(recipeRoute)
        .put('/100/downvotes')
        .send({
          token: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equals('Recipe Not Found');
          done();
        });
    });
  });

  describe('Test For Reviewing A Recipe', () => {
    it('should review a recipe when token is valid', (done) => {
      chai.request(recipeRoute)
        .post('/10/reviews')
        .send({
          token: 1,
          reviewBody: 'Hi this is my review'
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.body).to.equals('Hi this is my review');
          assert.isObject(res.body.data.user, 'is an object');
          expect(res.body.data.user.userId).to.equals(1);
          assert.isObject(res.body, 'is an object');
          done();
        });
    });
  });

  describe('Test For Reviewing A Recipe', () => {
    it('should not review a recipe that does not exist in the database', (done) => {
      chai.request(recipeRoute)
        .post('/10000/reviews')
        .send({
          token: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Recipe Not Found');
          done();
        });
    });
  });

  describe('Test For Reviewing A Recipe', () => {
    it('should not review a recipe when review body is not present', (done) => {
      chai.request(recipeRoute)
        .post('/10/reviews')
        .send({
          token: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors.length).to.equals(1);
          expect(res.body.errors[0].message).to.equals('Body Is Required');
          done();
        });
    });
  });

  describe('Test For Getting Reviews For A Recipe', () => {
    it('should return a review that belongs to recipe', (done) => {
      chai.request(recipeRoute)
        .get('/10/reviews')
        .end((error, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Test For Getting Reviews For A Recipe', () => {
    it('should not return a review when query strings are invalid', (done) => {
      chai.request(recipeRoute)
        .get('/10/reviews?limit=aaa')
        .end((error, res) => {
          expect(res.body.status).equal('Failure');
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('Test For Deleting A  Single Recipe In Memory When Not Authorized', () => {
    it('should not delete a recipe if the user is not the one who created the recipe', (done) => {
      chai.request(recipeRoute)
        .delete('/11')
        .send({
          token: 2
        })
        .end((error, res) => {
          expect(res).to.have.status(403);
          assert.isObject(res.body, 'is an empty object');
          done();
        });
    });
  });

  describe('Test For Deleting A  Single Recipe In Memory', () => {
    it('should delete a recipe when the recipe is created by the user', (done) => {
      chai.request(recipeRoute)
        .delete('/11')
        .send({
          token: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(204);
          assert.isObject(res.body, 'is an empty object');
          done();
        });
    });
  });

  describe('Test For Deleting A  Single Recipe Not In Memory', () => {
    it('should not delete a recipe that does not exist in the database', (done) => {
      chai.request(recipeRoute)
        .delete('/2222')
        .end((error, res) => {
          expect(res).to.have.status(404);
          assert.isObject(res.body, 'is an empty object');
          done();
        });
    });
  });

  describe('Test For Getting All Recipes By Votes', () => {
    it('should return all recipes when query strings are valid', (done) => {
      chai.request(recipeRoute)
        .get('?sort=upvotes&order=desc')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Test For Getting All Recipes By Votes', () => {
    it('should not return all recipes when query strings are invalid', (done) => {
      chai.request(recipeRoute)
        .get('?sort=up&order=asc')
        .end((error, res) => {
          expect(res.body.status).equal('Failure');
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Test For Getting All Recipes By Votes', () => {
    it('should return popular recipes', (done) => {
      chai.request(recipeRoute)
        .get('/popular')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.equals(23);
          done();
        });
    });
  });

  describe('Test For Getting All Recipes Categories', () => {
    it('should return all categories', (done) => {
      chai.request(recipeRoute)
        .get('/categories')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isObject(res.body);
          done();
        });
    });
  });

  describe('Test For Searching For Recipes', () => {
    it('should return recipes that either their names or ingredients match the query string', (done) => {
      chai.request(recipeRoute)
        .get('/search_results?search=Amala')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data[0].name).to.equal('Amala');
          expect(res.body.data[0].image).to.equal('This is the image');
          expect(res.body.data[0].description).to.equal('This is made from carbonhydrate');
          assert.isArray(res.body.data);
          expect(res.body.data.length).to.equals(1);
          done();
        });
    });
  });
});

