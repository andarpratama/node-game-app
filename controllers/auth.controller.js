const userModel = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator');

class Auth {
  static async register(req, res, next) {
    try {
          if (!req.body.name) {
             throw { name: 'Name Required' };
          }
          if (!req.body.email) {
             throw { name: 'Email Required' };
          }
          if (!validator.isEmail(req.body.email)) {
             throw { name: 'Invalid Email' };
          }
          if (!req.body.password) {
              throw { name: 'Password Required' };
          }
          const newUser = new userModel({
              name: req.body.name,
              email: req.body.email,
              password: await bcrypt.hash(req.body.password, 8)
          });
          await newUser.save();
          res.status(201).json({
              success: true,
              message: 'Success Registration',
              data: newUser
          });
          // logging.info('SIGNUP', 'MESSAGE: Success Sigup')
      } catch (err) {
          next(err);
      }
  }

  static login(req, res) {
    userModel.findOne({ email: req.body.email })
      .then((result) => {
        if (!result) {
          return res.status(401).json({success: false,msg: 'Users with this email and password is wrong',});
        }
        if (!req.body.password) {
          return res.status(401).json({success: false,msg: 'Please input the password',});
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password,result.password);
        if (!passwordIsValid) {
          return res.status(401).json({success: false,msg: 'Users with this email and password is wrong',});
        }

        let token = jwt.sign({ id: result.id }, process.env.SECRET_KEY, {
          expiresIn: '1hr',
        });
        res.status(200).json({ msg: 'Success login', data: result, accessToken: token });
      })
      .catch((err) => {
        throw ({name: 'Failed_login', err: err})
      });
  }

  
}


module.exports = Auth