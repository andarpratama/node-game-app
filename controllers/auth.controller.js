const userModel = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        password: await bcrypt.hash(req.body.password, 8),
      });
      await newUser.save();
      res.status(201).json({
        success: true,
        message: 'Success Registration',
        data: newUser,
      });
      // logging.info('SIGNUP', 'MESSAGE: Success Sigup')
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      if (!req.body.email) {
        throw { name: 'Email Required' };
      }
      if (!validator.isEmail(req.body.email)) {
        throw { name: 'Invalid Email' };
      }
      if (!req.body.password) {
        throw { name: 'Password Required' };
      }

      const foundUser = await userModel.findOne({ email: req.body.email });
      if (!foundUser) {
        throw { name: 'Email not Registered' };
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );

      if (!passwordIsValid) {
        throw { name: 'Login Failed' };
      }

      let token = jwt.sign({ id: foundUser.id }, process.env.SECRET_KEY, {
        expiresIn: '1hr',
      });

      res.status(200).json({
        success: true,
        message: 'Success Login',
        data: foundUser,
        accessToken: token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Auth;
