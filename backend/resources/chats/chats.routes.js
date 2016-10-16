import express from 'express';
import validate from 'express-validation';
import paramValidation from './chats.validators';
import chatsCtrl from './chats.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(chatsCtrl.list)
  .post(validate(paramValidation.create), chatsCtrl.create);

export default router;
