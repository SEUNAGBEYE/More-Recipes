import db from '../models/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController{
  /**
  * This Handles User Registration
  * @param {obj} req request object
  * @param {obj} res response object
  * @returns {null} json
  */
  static signUp(req, res) {
      return db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture
      })
        .then(user => res.status(200).json({message: 'success', data: user}))
        .catch(error => res.status(400).json(error));
  }

  /**
  * This Handles User Authentication
  * @param {obj} req request object
  * @param {obj} res response object
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
      })
      .catch(error => res.status(404).json(error))
    })
    .catch(error => res.status(200).json(error))
    
  }
}

export default UserController;

