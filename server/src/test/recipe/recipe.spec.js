import chai, { assert, expect } from 'chai';
import chaiHtpp from 'chai-http';
import { recipeRoute } from '../../routes/index';


// Test For Recipes Actions

chai.use(chaiHtpp);
describe('Test For Recipes Routes', () => {
  describe('Test Getting all recipes', () => {
    it('should return an array of objects and it should have a statusCode of 200 when trying to get all recipes', (done) => {
      chai.request(recipeRoute)
        .get('/')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isArray(res.body.data, 'is an array of objects');
          done();
        });
    });
  });

  // describe('Test For Getting A  Single Recipe', () => {
  //   it('should be an object and it should have a statusCode of 200 when trying to get a recipe', (done) => {
  //     chai.request(recipeRoute)
  //       .get('/11')
  //       .end((error, res) => {
  //         expect(res).to.have.status(200);
  //         expect(parseInt(res.body.data.id, 10)).equal(11);
  //         assert.isObject(res.body.data, 'respone return an object');
  //         done();
  //       });
  //   });
  // });

  describe('Test For Getting A  Single Recipe', () => {
    it('should have a statusCode of 400 when trying to get a single recipe with an invalid id', (done) => {
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
    it('should have a statusCode of 404 when trying to get a recipe not in database', (done) => {
      chai.request(recipeRoute)
        .get('/2333333')
        .end((error, res) => {
          expect(res).to.have.status(404);
          // expect(res.body.data.message).equal('Recipe Not Foundj');
          done();
        });
    });
  });

  describe('Test For Adding A  Single Recipe', () => {
    it('should return an object and it should have a statusCode of 201 when a recipe is created', (done) => {
      chai.request(recipeRoute)
        .post('/')
        .send({
          id: 10,
          name: 'Amala',
          description: 'This is made from carbonhydrate',
          image: 'This is the image',
          userId: 2,
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
    it('should have a statusCode of 400 when trying to add a recipe without all required properties', (done) => {
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
          expect(res.body.message).to.equals('Bad Request');
          expect(res.body).to.have.property('errors');
          assert.isArray(res.body.errors, 'is array of objects');
          expect(res.body.errors[0].field).to.equals('categoryId');
          expect(res.body.errors[0].description).to.equals('Recipe.categoryId cannot be null');
          done();
        });
    });
  });

  describe('Test For Updating A  Single Recipe', () => {
    it('should have a statusCode of 200 when a recipe is updated', (done) => {
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
    it('should have a statusCode of 403 when a user is trying to update a recipes he/she did not create', (done) => {
      chai.request(recipeRoute)
        .put('/11')
        .set('token', 100)
        .send({
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
    it('should have a statusCode of 404 when trying update a recipe not in database', (done) => {
      chai.request(recipeRoute)
        .put('/244444')
        .send({
          name: 'Amala',
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

  describe('Test For Voting A Recipe', () => {
    it('should have a statusCode of 200 when a recipe is upvoted', (done) => {
      chai.request(recipeRoute)
        .put('/11/upvotes')
        .send({
          userId: 2
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
    it('should have a statusCode of 200 when a recipe is removed from upvoted recipes', (done) => {
      chai.request(recipeRoute)
        .put('/11/upvotes')
        .send({
          userId: 2
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.upvotes).to.not.include(2);
          done();
        });
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('should have a statusCode of 404 when trying to upvote a recipe not in database', (done) => {
      chai.request(recipeRoute)
        .put('/11111/upvotes')
        .send({
          userId: 2
        })
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equals('Recipe Not Found');
          done();
        });
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('should have a statusCode of 200 when a recipe is downvoted', (done) => {
      chai.request(recipeRoute)
        .put('/11/downvotes')
        .send({
          userId: 2
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
    it('should have a statusCode of 200 when a recipe removed from downvoted recipes', (done) => {
      chai.request(recipeRoute)
        .put('/11/downvotes')
        .send({
          userId: 2
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
    it('should have a statusCode of 400 when trying to downvote a recipe with invalid recipeId', (done) => {
      chai.request(recipeRoute)
        .put('/""/downvotes')
        .send({
          userId: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equals('Please input a valid ID');
          done();
        });
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('should have a statusCode of 404 when trying to downvote a recipe not in database', (done) => {
      chai.request(recipeRoute)
        .put('/100/downvotes')
        .send({
          userId: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equals('Recipe Not Found');
          done();
        });
    });
  });

  describe('Test For Reviewing A Recipe', () => {
    it('should have a statusCode of 200 when a recipe is reviewed', (done) => {
      chai.request(recipeRoute)
        .post('/10/reviews')
        .send({
          userId: 1,
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
    it('should have a statusCode of 200 when trying to review a recipe not in database', (done) => {
      chai.request(recipeRoute)
        .post('/10000/reviews')
        .send({
          userId: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Recipe Not Found');
          done();
        });
    });
  });

  describe('Test For Reviewing A Recipe', () => {
    it('should have a statusCode of 200 when trying to review a recipes', (done) => {
      chai.request(recipeRoute)
        .post('/10/reviews')
        .send({
          userId: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('Test For Getting Reviews For A Recipe', () => {
    it('should return an object and it should have a statusCode of 200 when trying to review a recipes', (done) => {
      chai.request(recipeRoute)
        .get('/10/reviews')
        .end((error, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Test For Getting Reviews For A Recipe', () => {
    it('should return an object and it should have a statusCode of 400 when trying to review a recipes', (done) => {
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
    it('should have a statusCode of 403 when trying to delete a recipe if the user is not the one who created the recipe', (done) => {
      chai.request(recipeRoute)
        .delete('/11')
        .send({
          userId: 2
        })
        .end((error, res) => {
          expect(res).to.have.status(403);
          assert.isObject(res.body, 'is an empty object');
          done();
        });
    });
  });

  describe('Test For Deleting A  Single Recipe In Memory', () => {
    it('should have a statusCode of 200 when trying to delete a recipe in memory', (done) => {
      chai.request(recipeRoute)
        .delete('/11')
        .send({
          userId: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(204);
          assert.isObject(res.body, 'is an empty object');
          done();
        });
    });
  });

  describe('Test For Deleting A  Single Recipe Not In Memory', () => {
    it('should have a statusCode of 404 when trying to delete a recipe not in memory', (done) => {
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
    it('should have a statusCode of 200 when trying to get all recipes by votes', (done) => {
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
    it('should have a statusCode of 400 when trying to get all recipes with wrong query', (done) => {
      chai.request(recipeRoute)
        .get('?sort=upvotes&order=a')
        .end((error, res) => {
          expect(res.body.status).equal('Failure');
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Test For Getting All Recipes By Votes', () => {
    it('should have a statusCode of 200 when trying to get popular recipes', (done) => {
      chai.request(recipeRoute)
        .get('/popular')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('Test For Getting All Recipes Categories', () => {
    it('should have a statusCode of 200 when trying to get all categories', (done) => {
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
    it('should return an object and it should have a statusCode of 200 when trying to search for recipes', (done) => {
      chai.request(recipeRoute)
        .get('/search_results?search=Amala')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data[0].name).to.equal('Amala');
          expect(res.body.data[0].image).to.equal('This is the image');
          expect(res.body.data[0].description).to.equal('This is made from carbonhydrate');
          assert.isArray(res.body.data);
          done();
        });
    });
  });
});

