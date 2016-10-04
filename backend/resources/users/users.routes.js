import express from 'express';
import validate from 'express-validation';
import paramValidation from './users.validators';
import usersCtrl from './users.controller';

const router = express.Router();

router.route('/')
  .get(validate(paramValidation.list), usersCtrl.list)
  .post(validate(paramValidation.create), usersCtrl.create);

router.post('/signin', validate(paramValidation.signin), usersCtrl.signin);

export default router;
