const jwt = require('jsonwebtoken');
const userModel = require('../models/Users');

class authJwt {
  static authentication(req, res, next) {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: 'Missing_Token' };
    }

    jwt.verify(
      access_token,
      process.env.SECRET_KEY || 'userKey',
      (err, decoded) => {
        if (err) {
          throw { name: 'Invalid_Token' };
        }
        // id dari token dan dimasukan kedalam req
        req.userID = decoded.id;
        next();
      }
    );
  }

  static authorization(req, res, next) {
    if (!req.userID) {
      return res
        .status(403)
        .json({ success: false, msg: `req.userID is not undefined` });
    }
    try {
      userModel.findById(req.userID).then(result => {
        if (result.id !== req.userID) {
          res.status(403).json({ success: false, msg: `Forbidden access` });
        } else {
          next();
        }
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static idIsValid(req, res, next) {
    if (!req.userID) {
      res
        .status(403)
        .json({ success: false, msg: `req.userID is not undefined` });
    }
    next();
  }
}

module.exports = authJwt;
