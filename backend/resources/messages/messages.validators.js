import Joi from 'joi';

export default {
  create: {
    body: {
      author: Joi.string().min(3).max(40).required(),
      text: Joi.string().min(1).max(500).required()
    }
  }
};