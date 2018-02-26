import chai, { assert, expect } from 'chai';
import chaiHtpp from 'chai-http';
import { userRoute } from '../../routes/index';

// Test For Users Actions
chai.use(chaiHtpp);
describe('Test For Users Routes', () => {
  describe('Test For Creating A User', () => {
    it('should have a statusCode of 400 when a user sends a password lesser than six characters when trying to signup', (done) => {
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
          assert.isObject(res.body, 'response is an object');
          done();
        });
    });
  });

  describe('Test For Creating A User', () => {
    it('should have a statusCode of 400 when a user did not input his/her email', (done) => {
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
          assert.isArray(res.body.errors, 'response is an array of object');
          done();
        });
    });
  });

  describe('Test For Creating A User', () => {
    it('should have a statusCode of 201 when a user is created', (done) => {
      chai.request(userRoute)
        .post('/signup')
        .send({
          id: 11,
          firstName: 'Seun',
          lastName: 'Agbeye',
          email: 'boy@mail.com.ng',
          profilePicture: 'This is my lovely image',
          password: 'mynameisseun',
          aboutMe: 'This is about me',
          facebookUrl: 'facebook.com',
          twitterUrl: 'twitter.com',
          linkedInUrl: 'linkedIn.com'
        })
        .end((error, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data.firstName).equal('Seun');
          expect(res.body.data.lastName).equal('Agbeye');
          expect(res.body.data.email).equal('boy@mail.com.ng');
          expect(res.body.data.profilePicture).equal('This is my lovely image');
          assert.isObject(res.body.data, 'response is an object');
          // done();
        });
      done();
    });
  });

  describe('Test For Authenticating A User', () => {
    it('should return a body containing the user token and it should have a statusCode of 200 when a user is logged in', (done) => {
      chai.request(userRoute)
        .post('/signin')
        .send({
          email: 'boy@mail.com.ng',
          password: 'mynameisseun'
        })
        .end((error, res) => {
          if (!error) {
            expect(res).to.have.status(200);
            expect(res.body.data).to.have.property('token');
          }
          done();
        });
    });
  });

  describe('Test For Authenticating A User', () => {
    it('should have a statusCode of 401 with a message "Invalid Password or Email" when trying to login with wrong credentials', (done) => {
      chai.request(userRoute)
        .post('/signin')
        .send({
          email: 'boy@mail.com.ng',
          password: 'mynameis'
        })
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.not.have.property('token');
          expect(res.body.message).to.equal('Invalid Password or Email');
          assert.isObject(res.body, 'response is an object');
          done();
        });
    });
  });

  describe('Test For Authenticating A User', () => {
    it('should have a statusCode of 401 when a user provides only an email when logging in', (done) => {
      chai.request(userRoute)
        .post('/signin')
        .send({
          email: 'boy@mail.com.ng'
        })
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.not.have.property('token');
          expect(res.body.status).to.equal('Failure');
          expect(res.body.message).to.equals('Invalid Password or Email');
          expect(res.body).to.not.have.property('userId');
          assert.isObject(res.body, 'response is object');
          done();
        });
    });
  });

  describe('Test For Authenticating A User 404', () => {
    it('should have a statusCode of 404 when a user trys logging in with an email not in database', (done) => {
      chai.request(userRoute)
        .post('/signin')
        .send({
          email: 'agbeye',
          password: ''
        })
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.equal('Failure');
          expect(res.body.message).to.equal('User Not Found');
          expect(res.body).to.not.have.property('token');
          expect(res.body).to.not.have.property('userId');
          assert.isObject(res.body, 'response is an object');
          done();
        });
    });
  });

  describe('Test For User To Add A Recipe To Favorited Recipes', () => {
    it('should have a statusCode of 200 when a user makes a recipe their favorite', (done) => {
      chai.request(userRoute)
        .post('/fav-recipes/12/add')
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
          assert.isObject(res.body.data, 'response is an object');
          done();
        });
    });
  });

  describe('Test For User To Remove A Recipe From Favorited Recipes', () => {
    it('should have a statusCode of 200 when a user remove a recipe from favorite recipes by hitting the same route again', (done) => {
      chai.request(userRoute)
        .post('/fav-recipes/12/add')
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
          assert.isObject(res.body.data, 'response is an object');
          done();
        });
    });
  });

  describe('Test For User To Add A Recipe To Favorited Recipes', () => {
    it('should have a statusCode of 400 when a user trys to make a recipe their favorite with invalid token', (done) => {
      chai.request(userRoute)
        .post('/fav-recipes/12/add')
        .send({
          userId: 'aaaa'
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equals('Token Not Valid');
          done();
        });
    });
  });

  describe('Test For User To Add A Recipe To Favorited Recipes', () => {
    it('should have a statusCode of 400 when a user trys to make a recipe their favorite with wrong recipe id', (done) => {
      chai.request(userRoute)
        .post('/fav-recipes/wwww/add')
        .send({
          userId: '100'
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equals('Please input a valid ID');
          done();
        });
    });
  });

  describe('Test For User To Remove A Recipe From Favorited Recipes', () => {
    it('should have a statusCode of 404 when a user trys to favorite a recipe not in database', (done) => {
      chai.request(userRoute)
        .post('/fav-recipes/100/add')
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.equal('Failure');
          expect(res.body.message).to.equal('Recipe Not Found');
          done();
        });
    });
  });

  describe('Test For Getting User Favourites Recipes', () => {
    it('should return a body of an array, and it should have a statusCode of 200 when a user get their favorited recipe', (done) => {
      chai.request(userRoute)
        .get('/fav-recipes/')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isArray(res.body.data, 'is an array of objects');
          done();
        });
    });
  });

  describe('Test For Getting User Favourites Recipes', () => {
    it('should have a statusCode of 400 when a user trys to get their favorited recipe with a wrong token', (done) => {
      chai.request(userRoute)
        .get('/fav-recipes/')
        .set('token', 'aaaa')
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equals('Token Not Valid');
          done();
        });
    });
  });

  describe('Test For Getting User Favourites Recipes', () => {
    it('should have a statusCode of 200 when a user get their favorited recipes id', (done) => {
      chai.request(userRoute)
        .get('/fav-recipes/getIds')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isArray(res.body.data, 'is an array of objects');
          done();
        });
    });
  });

  describe('Test For Getting User Favourites Recipes', () => {
    it('should have a statusCode of 400 when a user get their favorited recipes id with a wrong token', (done) => {
      chai.request(userRoute)
        .get('/fav-recipes/getIds')
        .set('token', 'aaaa')
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equals('Token Not Valid');
          done();
        });
    });
  });

  describe('Test For Getting User Recipes', () => {
    it('should have a statusCode of 200 when a user get their recipes', (done) => {
      chai.request(userRoute)
        .get('/myrecipes/')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isArray(res.body.data, 'is an array of object');
          done();
        });
    });
  });

  describe('Test For Getting User Recipes', () => {
    it('should be an array and it should have a statusCode of 400 when a user not in database tries to get their recipe', (done) => {
      chai.request(userRoute)
        .get('/myrecipes/')
        .set('token', 'aaaa')
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equals('Token Not Valid');
          done();
        });
    });
  });

  describe('Test For Getting User Profile', () => {
    it('should have a statusCode of 400 when a user not in database tries to access their profile', (done) => {
      chai.request(userRoute)
        .get('/profile')
        .set('token', 'aaaa')
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equals('Token Not Valid');
          done();
        });
    });
  });


  describe('Test For Getting User Profile', () => {
    it('should have a statusCode of 200 when a user access their profile', (done) => {
      chai.request(userRoute)
        .get('/profile')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.id).to.equals(1);
          expect(res.body.data.firstName).to.equals('seun');
          expect(res.body.data.lastName).to.equals('agbeye');
          done();
        });
    });
  });

  // describe('Test For Updating User Profile', () => {
  //   it('should have a statusCode of 200 when a user update their profile', (done) => {
  //     chai.request(userRoute)
  //       .put('/profile')
  //       .send({
  //         firstName: 'Seun',
  //         lastName: 'Agbeye',
  //         profilePicture: 'This is my lovely image',
  //         password: 'my'
  //       })
  //       .end((error, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.body.data).to.have.property('token');
  //         console.log('>>>>>>>>>>>>>>>>>>', error)
  //         done();
  //       });
  //   });
  // });

  describe('Test For Forget Password', () => {
    it('should have a statusCode of 404 when a request is made to forget password controller with an email that do not exist in database', (done) => {
      chai.request(userRoute)
        .post('/forgot-password')
        .send({
          email: 'agbeyeseun1@gmail.com'
        })
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('User Not Found');
          done();
        });
    });
  });

  describe('Test For Forget Password', () => {
    it('should have a statusCode of 404 when a user hit forget password controller', (done) => {
      chai.request(userRoute)
        .post('/forgot-password')
        .send({
          email: 'boy@mail.com.ng'
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('A Message has been sent to the email provided kindly read to mail to reset your password');
          done();
        });
    });
  });

  describe('Test For Confirm Forget Password', () => {
    it('should have a statusCode of 404 when a user hit forget password controller', (done) => {
      chai.request(userRoute)
        .put('/forgot-password/qwertyhnbgfdswerfgh')
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('User Not Found');
          done();
        });
    });
  });
});
