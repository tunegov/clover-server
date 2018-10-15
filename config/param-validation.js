const Joi = require('joi');

module.exports = {
  // POST /v1/users
  createUser: {
    body: {
      username: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[0-9][0-9]{9}$/).required(),
      profileUrl: Joi.string(),
      email: Joi.string().required(),
    }
  },

  // UPDATE /v1/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[0-9][0-9]{9}$/).required(),
      profileUrl: Joi.string(),
      email: Joi.string().required(),
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /v1/auth/signin
  signin: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },


  // POST /v1/auth/signup
  signup: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[0-9][0-9]{9}$/).required(),
      profileUrl: Joi.string(),
      email: Joi.string(),
    }
  }
};
