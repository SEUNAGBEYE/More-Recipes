import chai, { assert, expect } from 'chai';
import chaiHtpp from 'chai-http';
import { userRoute } from '../../routes/index';

// Test For Users Actions
chai.use(chaiHtpp);
describe('Test For Users Routes', () => {
  describe('Test For Creating A User', () => {
    it('should not register a user with a password lesser than six characters', (done) => {
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
          expect(res.body.message).to.equal('Bad Request');
          expect(res.body.errors[0].message).to.equal('Password must be greater than 6');
          assert.isObject(res.body, 'response is an object');
          done();
        });
    });
  });

  describe('Test For Creating A User', () => {
    it('should not register a user without an email', (done) => {
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
          expect(res.body.errors[0].message).to.equal('Please provide a valid email address');
          assert.isArray(res.body.errors, 'response is an array of object');
          expect(res.body.errors.length).to.equals(1);
          done();
        });
    });
  });

  describe('Test For Creating A User', () => {
    it('should successfully create a user with correct credentials', (done) => {
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
          done();
        });
      // done();
    });
  });

  describe('Test For Authenticating A User', () => {
    it('should sign in a user with correct credentials', (done) => {
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
    it('should not sign in a user with wrong credentials', (done) => {
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
    it('should not sign in a user when only email is provided', (done) => {
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
    it('should not sign in a user when email provided is not in the database', (done) => {
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
    it('should add a recipe to a user\'s favorited recipes', (done) => {
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
    it('should remove a recipe from user\'s favorited recipes when the same route is hit again after favoriting', (done) => {
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
    it('should not favorite a recipe when a wrong token is provided', (done) => {
      chai.request(userRoute)
        .post('/fav-recipes/12/add')
        .send({
          token: 'aaaa'
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equals('Token Not Valid');
          done();
        });
    });
  });

  describe('Test For User To Add A Recipe To Favorited Recipes', () => {
    it('should not favorite a recipe when a wrong recipe id is provided', (done) => {
      chai.request(userRoute)
        .post('/fav-recipes/wwww/add')
        .send({
          token: '100'
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equals('Token Not Valid');
          done();
        });
    });
  });

  describe('Test For User To Remove A Recipe From Favorited Recipes', () => {
    it('should not favorite a recipe that does not exist in the database', (done) => {
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
    it('should return user\'s favorited recipes', (done) => {
      chai.request(userRoute)
        .get('/fav-recipes/')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isArray(res.body.data, 'is an array of objects');
          expect(res.body.data.length).to.equals(0);
          done();
        });
    });
  });

  describe('Test For Getting User Favourites Recipes', () => {
    it('should not return user\'s favorited recipe when a wrong token is provided', (done) => {
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
    it('should return user\'s favorited recipes id when token is valid', (done) => {
      chai.request(userRoute)
        .get('/fav-recipes/getIds')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isArray(res.body.data, 'is an array of objects');
          expect(res.body.data.length).to.equals(1);
          done();
        });
    });
  });

  describe('Test For Getting User Favourites Recipes', () => {
    it('should not return user\'s favorited recipes id when a wrong token is provided', (done) => {
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
    it('should return user\'s recipes when a valid token is provided', (done) => {
      chai.request(userRoute)
        .get('/myrecipes/')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isArray(res.body.data, 'is an array of object');
          expect(res.body.data.length).to.equals(23);
          done();
        });
    });
  });

  describe('Test For Getting User Recipes', () => {
    it('should not return user\'s recipes when an invalid token is provided', (done) => {
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
    it('should not return user\'s profile when an invalid token is provided', (done) => {
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
    it('should return user\'s profile when a valid token is provided', (done) => {
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

  describe('Test For Updating User Profile', () => {
    it('should return user\'s updated profile when a valid token is provided', (done) => {
      chai.request(userRoute)
        .put('/profile')
        .send({
          firstName: 'Seun',
          lastName: 'Agbeye',
          profilePicture: 'This is my lovely image',
          password: 'my'
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.have.property('token');
          done();
        });
    });
  });

  describe('Test For Forget Password', () => {
    it('should not send a mail to the user\'s email when user\'s email does not exist in the database', (done) => {
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
    it('should send a mail to the user\'s email when user\'s email exist in the database', (done) => {
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
    it('should not reset user\'s password when rememberToken is invalid', (done) => {
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
