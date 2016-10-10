import express from 'express';
import messagesRoutes from './messages/messages.routes';
import usersRoutes from './users/users.routes';
import authenticator from '../utils/authenticator';

const router = express.Router()

router.use('/messages', authenticator.ensureAuthenticated, messagesRoutes);
router.use('/users', usersRoutes);

export default router;
