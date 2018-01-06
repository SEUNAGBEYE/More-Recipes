import chai, { assert, expect } from 'chai';
import chaiHtpp from 'chai-http';
import { recipeRoute } from '../../routes/index';


// Test For Recipes Actions

chai.use(chaiHtpp);
describe('Test For Recipes Routes', () => {
  describe('Test Getting all recipes', () => {
    it('should be an array and it should have a statusCode of 200 when trying to get all recipes', (done) => {
      chai.request(recipeRoute)
        .get('/')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isArray(res.body.data, 'respone return array of object');
          done();
        });
    });
  });

  describe('Test For Getting A  Single Recipe', () => {
    it('should be an object and it should have a statusCode of 200 when trying to get a recipe', (done) => {
      chai.request(recipeRoute)
        .get('/11')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(parseInt(res.body.data[0].id, 10)).equal(11);
          assert.isObject(res.body.data[0], 'respone return an object');
          done();
        });
    });
  });

  describe('Test For Getting A  Single Recipe', () => {
    it('should be an object and it should have a statusCode of 200 when trying to get a recipe', (done) => {
      chai.request(recipeRoute)
        .get('/aaaaaa')
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('Test For Getting A  Single Recipe Not The Memory', () => {
    it('should have a statusCode of 404 when trying to get a recipe not in memory', (done) => {
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
    it('should return an object and it should have a statusCode of 201 when trying to add a recipe', (done) => {
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
          done();
        });
    });
  });

  describe('Test For Adding A  Single Recipe', () => {
    it('should return an object and it should have a statusCode of 401 when trying to add a recipe when not authenticated', (done) => {
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
          done();
        });
    });
  });

  describe('Test For Updating A  Single Recipe', () => {
    it('should return an object and it should have a statusCode of 200 when trying to update a recipes', (done) => {
      chai.request(recipeRoute)
        .put('/11')
        .send({
          name: 'Amala',
          description: 'This is made from carbonhydrate',
          review: 'This is the best african food'
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.id).equal(11);
          assert.isObject(res.body.data, 'respone return an object');
          done();
        });
    });
  });

  describe('Test For Updating A  Single Recipe', () => {
    it('should return an object and it should have a statusCode of 200 when trying to update a recipes', (done) => {
      chai.request(recipeRoute)
        .put('/11')
        .set('token', 100)
        .send({
          name: 'Amala',
          description: 'This is made from carbonhydrate',
          review: 'This is the best african food'
        })
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Not Authorize');
          done();
        });
    });
  });

  describe('Test For Updating A  Single Recipe Not In Memory', () => {
    it('should return an object and it should have a statusCode of 404 when trying to get all recipes', (done) => {
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
    it('should return an object and it should have a statusCode of 200 when trying to upvote a recipes', (done) => {
      chai.request(recipeRoute)
        .put('/11/upvotes')
        .send({
          userId: 2
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.upvotes).that.include(2);
          assert.isObject(res.body, 'respone return an object');
          done();
        });
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('should return an object and it should have a statusCode of 200 when trying to upvote a recipes', (done) => {
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
    it('should return an object and it should have a statusCode of 200 when trying to upvote a recipes', (done) => {
      chai.request(recipeRoute)
        .put('/11111/upvotes')
        .send({
          userId: 2
        })
        .end((error, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('should return an object and it should have a statusCode of 200 when trying to downvote a recipes', (done) => {
      chai.request(recipeRoute)
        .put('/11/downvotes')
        .send({
          userId: 2
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.downvotes).that.include(2);
          assert.isObject(res.body, 'respone return an object');
          done();
        });
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('should return an object and it should have a statusCode of 200 when trying to downvote a recipes', (done) => {
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
    it('should return an object and it should have a statusCode of 400 when trying to downvote a recipes', (done) => {
      chai.request(recipeRoute)
        .put('/""/downvotes')
        .send({
          userId: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('should return an object and it should have a statusCode of 404 when trying to downvote a recipes', (done) => {
      chai.request(recipeRoute)
        .put('/100/downvotes')
        .send({
          userId: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('Test For Reviewing A Recipe', () => {
    it('should return an object and it should have a statusCode of 200 when trying to review a recipes', (done) => {
      chai.request(recipeRoute)
        .post('/10/reviews')
        .send({
          userId: 1,
          reviewBody: 'Hi this is my review'
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isObject(res.body, 'respone return an object');
          done();
        });
    });
  });

  describe('Test For Reviewing A Recipe', () => {
    it('should return an object and it should have a statusCode of 200 when trying to review a recipes', (done) => {
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
    it('should return an object and it should have a statusCode of 200 when trying to review a recipes', (done) => {
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
          expect(res.body.status).equal('Bad Request');
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('Test For Deleting A  Single Recipe In Memory When Not Authorized', () => {
    it('should return an object and it should have a statusCode of 401 when trying to delete a recipe in memory', (done) => {
      chai.request(recipeRoute)
        .delete('/11')
        .send({
          userId: 2
        })
        .end((error, res) => {
          expect(res).to.have.status(401);
          assert.isObject(res.body, 'respone return an empty object');
          done();
        });
    });
  });

  describe('Test For Deleting A  Single Recipe In Memory', () => {
    it('should return an object and it should have a statusCode of 200 when trying to delete a recipe in memory', (done) => {
      chai.request(recipeRoute)
        .delete('/11')
        .send({
          userId: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(204);
          assert.isObject(res.body, 'respone return an empty object');
          done();
        });
    });
  });

  describe('Test For Deleting A  Single Recipe Not In Memory', () => {
    it('should return an object and it should have a statusCode of 404 when trying to delete a recipe not in memory', (done) => {
      chai.request(recipeRoute)
        .delete('/2222')
        .end((error, res) => {
          expect(res).to.have.status(404);
          assert.isObject(res.body, 'respone return an empty object');
          done();
        });
    });
  });

  describe('Test For Getting All Recipes By Votes', () => {
    it('should return an object and it should have a statusCode of 200 when trying to get all recipes', (done) => {
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
    it('should return an object and it should have a statusCode of 400 when trying to get all recipes with wrong query', (done) => {
      chai.request(recipeRoute)
        .get('?sort=upvotes&order=a')
        .end((error, res) => {
          expect(res.body.status).equal('Bad Request');
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Test For Getting All Recipes By Votes', () => {
    it('should return an object and it should have a statusCode of 200 when trying to get all recipes', (done) => {
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
    it('should return an object and it should have a statusCode of 200 when trying to get all recipes', (done) => {
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

