import chai, { assert, expect } from 'chai';
import chaiHtpp from 'chai-http';
import { recipeRoute, userRoute } from '../routes/index';


// Test For Recipes Actions

chai.use(chaiHtpp);
describe('Test For Recipes Routes', () => {
  describe('Test Getting all recipes', () => {
    it('the body should be an array and it should have a statusCode of 200 when trying to get all recipes', (done) => {
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
    it('body should be an object and it should have a statusCode of 200 when trying to get a recipe', (done) => {
      chai.request(recipeRoute)
        .get('/2')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.id).equal(2);
          assert.isObject(res.body.data, 'respone return an object');
          done()
        });
    });
  });

  describe('Test For Getting A  Single Recipe Not The Memory', () => {
    it('it should have a statusCode of 404 when trying to get a recipe not in memory', (done) => {
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
    it('body should return an object and it should have a statusCode of 200 when trying to add a recipe', (done) => {
      chai.request(recipeRoute)
        .post('/')
        .send({
          id: 10,
          name: 'Amala',
          description: 'This is made from carbonhydrate',
          image: 'This is the image',
          userId: 2
        })
        .end((error, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  });

  describe('Test For Adding A  Single Recipe', () => {
    it('body should return an object and it should have a statusCode of 401 when trying to add a recipe when not authenticated', (done) => {
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
    it('body should return an object and it should have a statusCode of 200 when trying to update a recipes', (done) => {
      chai.request(recipeRoute)
        .put('/2')
        .send({
          name: 'Amala',
          description: 'This is made from carbonhydrate',
          review: 'This is the best african food'
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.id).equal(2);
          assert.isObject(res.body.data, 'respone return an object');
          done();
        })
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
        .end((error, res) => {
          expect(res).to.have.status(404);
          // expect(res.body.recipe.id).equal(undefined);
          done();
        })
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('body should return an object and it should have a statusCode of 200 when trying to upvote a recipes', (done) => {
      chai.request(recipeRoute)
        .put('/10/upvotes')
        .send({
          userId: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.upvotes).that.include(1);
          assert.isObject(res.body, 'respone return an object');
          done();
        })
    });
  });

  describe('Test For Voting A Recipe', () => {
    it('body should return an object and it should have a statusCode of 200 when trying to downvote a recipes', (done) => {
      chai.request(recipeRoute)
        .put('/10/downvotes')
        .send({
          userId: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.downvotes).that.include(1);
          assert.isObject(res.body, 'respone return an object');
          done();
        })
    });
  });

  describe('Test For Reviewing A Recipe', () => {
    it('body should return an object and it should have a statusCode of 200 when trying to review a recipes', (done) => {
      chai.request(recipeRoute)
        .post('/10/reviews')
        .send({
          userId: 2,
          body: 'Hi this is my review'
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isObject(res.body, 'respone return an object');
          done();
        })
    });
  });

  describe('Test For Deleting A  Single Recipe In Memory When Not Authorized', () => {
    it('body should return an object and it should have a statusCode of 401 when trying to delete a recipe in memory', (done) => {
      chai.request(recipeRoute)
        .delete('/2')
        .send({
          userId: 1
        })
        .end((error, res) => {
          expect(res).to.have.status(401);
          assert.isObject(res.body, 'respone return an empty object');
          done();
        });
    });
  });

  describe('Test For Deleting A  Single Recipe In Memory', () => {
    it('body should return an object and it should have a statusCode of 200 when trying to delete a recipe in memory', (done) => {
      chai.request(recipeRoute)
        .delete('/2')
        .send({
          userId: 2
        })
        .end((error, res) => {
          expect(res).to.have.status(204);
          assert.isObject(res.body, 'respone return an empty object');
          done();
        });
    });
  });

  describe('Test For Deleting A  Single Recipe Not In Memory', () => {
    it('body should return an object and it should have a statusCode of 404 when trying to delete a recipe not in memory', (done) => {
      chai.request(recipeRoute)
        .delete('/2222')
        .end((error, res) => {
          expect(res).to.have.status(404)
          assert.isObject(res.body, 'respone return an empty object');
          done();
        });
    });
  });

  describe('Test For Getting All Recipes By Votes', () => {
    it('body should return an object and it should have a statusCode of 200 when trying to get all recipes', (done) => {
      chai.request(recipeRoute)
        .get('/?sort=upvotes&order=desc')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});

// Test For Users Actions

describe('Test For Users Routes', () => {
  describe('Test For Creating A User', () => {
    it('the body should be an array and it should have a statusCode of 201 when a user is created', (done) => {
      chai.request(userRoute)
        .post('/signup')
        .send({
          id: 11,
          firstName: 'Seun',
          lastName: 'Agbeye',
          email: 'boy@mail.com.ng',
          profilePicture: 'This is my lovely image',
          password: 'mynameisseun'
        })
        .end((error, res) => {
          expect(res).to.have.status(201);
          assert.isObject(res.body.data, 'respone return array of object');
          done();
        });
    });
  });

  // describe('Test For Authenticating A User', () => {
  //   it('the body should be an array and it should have a statusCode of 201 when a user is logged in', (done) => {
  //     chai.request(userRoute)
  //       .post('/signin')
  //       .send({
  //         email: 'boy@mail.com.ng',
  //         password: 'mynameisseun'
  //       })
  //       .end((error, res) => {
  //         console.log(error)
  //         expect(res).to.have.status(201);
  //         assert.isObject(res.body.data, 'respone return array of object');
  //         done();
  //       });
  //   });
  // });

  describe('Test For User To Add A Recipe To Favorited Recipes', () => {
    it('the body should be an array and it should have a statusCode of 200 when a user make a recipe their favorite', (done) => {
      chai.request(userRoute)
        .post('/fav-recipes/10/add')
        .end((error, res) => {
          console.log(error)
          expect(res).to.have.status(200);
          assert.isObject(res.body.data, 'respone return array of object');
          done();
        });
    });
  });

  describe('Test For Getting User Favorites Recipes', () => {
    it('the body should be an array and it should have a statusCode of 200 when a user get their favorited recipe', (done) => {
      chai.request(userRoute)
        .get('/fav-recipes/')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isArray(res.body.data, 'respone return array of object');
          done();
        });
    });
  });

  describe('Test For Getting User Profile', () => {
    it('the body should be an array and it should have a statusCode of 200 when a user access their profile', (done) => {
      chai.request(userRoute)
        .get('/profile')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isObject(res.body.data, 'respone return array of object');
          done();
        });
    });
  });
});