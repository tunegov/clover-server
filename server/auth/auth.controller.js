const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../user/user.model');

// sample user, used for authentication
const user = {
  username: 'react',
  password: 'express'
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function signin(req, res, next) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        let userData = user.serialize()
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(userData, config.jwtSecret);
          // return the information including token as JSON
          res.json({
            ...userData,
            token
          });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
}

/**
 * Returns user object
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function signup(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'Please pass username and password.' });
  } else {
    let newUser = new User({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.firstName,
      mobileNumber: req.body.mobileNumber,
      profileUrl: req.body.profileUrl,
      email: req.body.email
    });
    // save the user
    newUser.save(function (err, user) {
      if (err) {
        return res.json({ success: false, msg: 'Username already exists.', err });
      }

      const token = jwt.sign({
        username: newUser.username
      }, config.jwtSecret);

      res.json({
        ...user.serialize(),
        token
      });
    });
  }
}

/**
 * Returns user object
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function logout(req, res, next) {
  res.json({})
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

module.exports = { signin, getRandomNumber, signup, logout };
