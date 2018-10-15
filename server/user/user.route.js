const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

/**
* @typedef User
* @property {integer} id
* @property {string} username.required
* @property {string} firstName.required
* @property {string} lastName.required
* @property {string} mobileNumber.required
* @property {string} profileUrl.required
* @property {string} email.required
*/

/**
 * Get user object by id
 * @route GET /users/
 * @group User
 * @returns {[User.model]} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.route('/')
  /** GET /v1/users - Get list of users */
  .get(userCtrl.list)

  /** POST /v1/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);

/**
 * Get user object by id
 * @route GET /users/:userId
 * @group User
 * @param {User.model} userId.query.required - id
 * @returns {User.model} 200 - User info
 * @returns {Error}  default - Unexpected error
 */

/**
* Update user object by id
* @route PUT /users/:userId
* @group User
* @param {string} userId.query.required - id
* @returns {User.model} 200 - Updated user info
* @returns {Error}  default - Unexpected error
*/
router.route('/:userId')

  .get(userCtrl.get)

  /** PUT /v1/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /v1/users/:userId - Delete user */
  .delete(userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

module.exports = router;
