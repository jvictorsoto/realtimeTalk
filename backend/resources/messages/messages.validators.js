import Joi from 'joi';

export default {
  create: {
    params: {
      chatId: Joi.string().regex(/^[a-f\d]{24}$/i).required()
    },
    body: {
      text: Joi.string().min(1).max(1000).required()
    }
  }
};
