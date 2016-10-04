import Joi from 'joi';

export default {
  create: {
    body: {
      username: Joi.string().min(3).max(40).required(),
      name: Joi.string().min(3).max(60).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required(),
      picture: Joi.string(),
      status: Joi.string()
    }
  },
  list: {
    query: {
      sort: Joi.string(),
      filter: Joi.string(),
      skip: Joi.number().min(1),
      limit: Joi.number().min(1).max(100)
    }
  },
  signin: {
    body: {
      username: Joi.string().min(3).max(40).required(),
      password: Joi.string().min(6).max(100).required()
    }
  }
};