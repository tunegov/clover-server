const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const paramValidation = require('../../config/param-validation');
const authCtrl = require('./auth.controller');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

/**
 * Get user object by id
 * @route POST /v1/auth/signin
 * @group User
 * @param {string} username.body.required - username
 * @param {string} password.body.required - password
 * @returns {User.model} 200 - User info
 * @returns {Error}  default - Unexpected error
 */

router.route('/signin')
  .post(validate(paramValidation.signin), authCtrl.signin);

/**
 * Get user object by id
 * @route POST /v1/auth/signup
 * @group User
 * @param {string} username.body.required - username
 * @param {string} password.body.required - password
 * @param {string} firstName.body.required - firstName
 * @param {string} lastName.body.required - lastName
 * @param {string} profileUrl.body - profileUrl
 * @param {string} email.body - email
 * @returns {User.model} 200 - User info
 * @returns {Error}  default - Unexpected error
 */
router.route('/signup')
  .post(validate(paramValidation.signup), authCtrl.signup);


router.route('/logout')
  .post(authCtrl.logout);

/** GET /v1/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
  .get(expressJwt({ secret: config.jwtSecret }), authCtrl.getRandomNumber);

module.exports = router;
