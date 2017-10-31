import db from '../models/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController{
  /**
  * This Handles adding a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static signUp(req, res) {

    bcrypt.hash(req.body.password, 10).then(function(hash) {
        // Store hash in your password DB.
      return db.User.create({
        firsName: req.body.firsName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        profilePicture: req.body.profilePicture
      })
        .then(user => res.status(200).json({message: 'success', data: user}))
        .catch(error => res.status(400).json(error));
    });

  }

  /**
  * This Handles adding a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static signIn(req, res, next) {

    db.User.find({
      where: {
        email: req.body.email
      }
    }).then(user => {
      bcrypt.compare(req.body.password, user.password).then(response => {
        if (response){
          const token = jwt.sign({userId: user.id, expiresIn: 60 * 60 }, process.env.SECRET_KEY);
          return res.status(200).send(token)
        }
        return res.status(200).send('Invalid Password or Email?')
      });
    })
    
  }
}

export default UserController;

