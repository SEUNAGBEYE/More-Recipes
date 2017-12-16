import chai, { assert, expect } from 'chai';
import chaiHtpp from 'chai-http';
import { userRoute } from '../../routes/index';

// Test For Users Actions
chai.use(chaiHtpp);
describe('Test For Users Routes', () => {
  describe('Test For Creating A User', () => {
    it('should ruturn a body that is an array and it should have a statusCode of 201 when a user is created', (done) => {
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
          expect(res.body.data).to.deep.equal({
            firstName: 'Seun',
            lastName: 'Agbeye',
            email: 'boy@mail.com.ng',
            profilePicture: 'This is my lovely image'
          });
          assert.isObject(res.body.data, 'respone return array of object');
          done();
        });
    });
  });

  describe('Test For Creating A User', () => {
    it('should ruturn a body that is an array and it should have a statusCode of 400 when a user is created', (done) => {
      chai.request(userRoute)
        .post('/signup')
        .send({
          id: 11,
          firstName: 'Seun',
          lastName: 'Agbeye',
          email: 'boy@mail.com.ng11',
          profilePicture: 'This is my lovely image',
          password: 'my'
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Password must be greater than 6');
          assert.isObject(res.body, 'respone return array of object');
          done();
        });
    });
  });

  describe('Test For Creating A User', () => {
    it('should ruturn a body that is an array and it should have a statusCode of 400 when a user is created', (done) => {
      chai.request(userRoute)
        .post('/signup')
        .send({
          id: 11,
          firstName: 'Seun',
          lastName: 'Agbeye',
          email: '',
          profilePicture: 'This is my lovely image',
          password: 'hhhhhhhh'
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.errors).to.deep.equal([
            {
              field: 'email',
              description: 'Please provide a valid email address'
            },
          ]);
          assert.isArray(res.body.errors, 'respone return array of object');
          done();
        });
    });
  });

  describe('Test For Authenticating A User', () => {
    it('the body should be an array and it should have a statusCode of 200 when a user is logged in', (done) => {
      chai.request(userRoute)
        .post('/signin')
        .send({
          email: 'boy@mail.com.ng',
          password: 'mynameisseun'
        })
        .end((error, res) => {
          if (!error) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            expect(res.body).to.have.property('userId');
          }
          console.log('errrrrroooooooorrrrrrrrrrrrrr==========================', error, res);
        });
      done();
    });
  });

  describe('Test For Authenticating A User', () => {
    it('the body should be an array and it should have a statusCode of 401 when a user is logged in', (done) => {
      chai.request(userRoute)
        .post('/signin')
        .send({
          email: 'boy@mail.com.ng',
          password: 'mynameis'
        })
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.not.have.property('token');
          expect(res.body).to.not.have.property('userId');
          assert.isObject(res.body, 'respone return array of object');
          done();
        });
    });
  });

  describe('Test For Authenticating A User', () => {
    it('the body should be an array and it should have a statusCode of 201 when a user is logged in', (done) => {
      chai.request(userRoute)
        .post('/signin')
        .send({
          email: 'boy@mail.com.ng'
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.errors).to.equal('Please Provide Password');
          expect(res.body).to.not.have.property('token');
          expect(res.body).to.not.have.property('userId');
          assert.isObject(res.body, 'respone return array of object');
          done();
        });
    });
  });

  describe('Test For Authenticating A User 404', () => {
    it('the body should be an array and it should have a statusCode of 404 when a user is logged in', (done) => {
      chai.request(userRoute)
        .post('/signin')
        .send({
          email: 'agbeye',
          password: ''
        })
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('User Not Found');
          expect(res.body.status).to.equal('Not Found');
          expect(res.body).to.not.have.property('token');
          expect(res.body).to.not.have.property('userId');
          assert.isObject(res.body, 'respone return array of object');
          done();
        });
    });
  });

  describe('Test For User To Add A Recipe To Favorited Recipes', () => {
    it('the body should be an array and it should have a statusCode of 200 when a user make a recipe their favorite', (done) => {
      chai.request(userRoute)
        .post('/fav-recipes/10/add')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.have.property('userId');
          expect(res.body.data).to.have.property('name');
          expect(res.body.data).to.have.property('image');
          expect(res.body.data).to.have.property('image');
          expect(res.body.data).to.have.property('upvotes');
          expect(res.body.data).to.have.property('steps');
          expect(res.body.data).to.have.property('ingredients');
          expect(res.body.data).to.have.property('description');
          assert.isArray(res.body.data.upvotes);
          assert.isArray(res.body.data.downvotes);
          assert.isArray(res.body.data.steps);
          assert.isArray(res.body.data.ingredients);
          expect(res.body.data).to.have.property('downvotes');
          assert.isObject(res.body.data, 'respone return array of object');
          done();
        });
    });
  });

  describe('Test For User To Remove A Recipe From Favorited Recipes', () => {
    it('should be an array and it should have a statusCode of 200 when a user remove a recipe from favorite recipes by hitting the same route again', (done) => {
      chai.request(userRoute)
        .post('/fav-recipes/10/add')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.have.property('userId');
          expect(res.body.data).to.have.property('name');
          expect(res.body.data).to.have.property('image');
          expect(res.body.data).to.have.property('image');
          expect(res.body.data).to.have.property('upvotes');
          expect(res.body.data).to.have.property('steps');
          expect(res.body.data).to.have.property('ingredients');
          expect(res.body.data).to.have.property('description');
          assert.isArray(res.body.data.upvotes);
          assert.isArray(res.body.data.downvotes);
          assert.isArray(res.body.data.steps);
          assert.isArray(res.body.data.ingredients);
          expect(res.body.data).to.have.property('downvotes');
          assert.isObject(res.body.data, 'respone return array of object');
          done();
        });
    });
  });

  describe('Test For User To Add A Recipe To Favorited Recipes', () => {
    it('the body should be an array and it should have a statusCode of 400 when a user make a recipe their favorite', (done) => {
      chai.request(userRoute)
        .post('/fav-recipes/12/add')
        .send({
          userId: 'aaaa'
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('Test For User To Add A Recipe To Favorited Recipes', () => {
    it('the body should be an array and it should have a statusCode of 400 when a user make a recipe their favorite', (done) => {
      chai.request(userRoute)
        .post('/fav-recipes/wwww/add')
        .send({
          userId: '100'
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('Test For User To Remove A Recipe From Favorited Recipes', () => {
    it('should be an array and it should have a statusCode of 404 when a user remove a recipe from favorite recipes by hitting the same route again', (done) => {
      chai.request(userRoute)
        .post('/fav-recipes/100/add')
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.equal('Not Found');
          expect(res.body.message).to.equal('Recipe Not Found');
          done();
        });
    });
  });

  describe('Test For Getting User Favourites Recipes', () => {
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

  describe('Test For Getting User Favourites Recipes', () => {
    it('the body should be an array and it should have a statusCode of 200 when a user get their favorited recipe', (done) => {
      chai.request(userRoute)
        .get('/fav-recipes/')
        .set('token', 'aaaa')
        .end((error, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('Test For Getting User Favourites Recipes', () => {
    it('the body should be an array and it should have a statusCode of 404 when a user get their favorited recipe', (done) => {
      chai.request(userRoute)
        .get('/fav-recipes/getIds')
        .end((error, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Test For Getting User Favourites Recipes', () => {
    it('the body should be an array and it should have a statusCode of 404 when a user get their favorited recipe', (done) => {
      chai.request(userRoute)
        .get('/fav-recipes/getIds')
        .set('token', 'aaaa')
        .end((error, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('Test For Getting User Recipes', () => {
    it('the body should be an array and it should have a statusCode of 200 when a user get their recipe', (done) => {
      chai.request(userRoute)
        .get('/myrecipes/')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isArray(res.body.data, 'respone return array of object');
          done();
        });
    });
  });

  describe('Test For Getting User Recipes', () => {
    it('should be an array and it should have a statusCode of 400 when a user not in database tries to get their recipe', (done) => {
      chai.request(userRoute)
        .get('/myrecipes/')
        .set('token', 'aaaaa')
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('Test For Getting User Profile 400', () => {
    it('should ruturn a body that is an array and it should have a statusCode of 400 when a user not in database tries to access their profile', (done) => {
      chai.request(userRoute)
        .get('/profile')
        .set('token', 'aaaa')
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });


  describe('Test For Getting User Profile 200', () => {
    it('should ruturn a body that is an array and it should have a statusCode of 200 when a user access their profile', (done) => {
      chai.request(userRoute)
        .get('/profile')
        .end((error, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
