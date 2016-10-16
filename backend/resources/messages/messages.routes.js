import express from 'express';
import validate from 'express-validation';
import paramValidation from './messages.validators';
import messagesCtrl from './messages.controller';

const router = express.Router();

router.route('/:chatId/messages')
  .get(messagesCtrl.list)
  .post(validate(paramValidation.create), messagesCtrl.create);

export default router;
