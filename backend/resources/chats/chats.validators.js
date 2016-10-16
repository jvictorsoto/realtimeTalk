import Joi from 'joi';

export default {
  create: {
    body: {
      title: Joi.string().min(3).max(200).required(),
      private: Joi.boolean().required(),
      users: Joi.array().items(Joi.string())
    }
  }
};
