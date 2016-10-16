import express from 'express';
import chatsRoutes from './chats/chats.routes';
import messagesRoutes from './messages/messages.routes';
import usersRoutes from './users/users.routes';
import authenticator from '../utils/authenticator';

const router = express.Router(); // eslint-disable-line new-cap

router.use('/chats', authenticator.ensureAuthenticated, chatsRoutes);
router.use('/chats', authenticator.ensureAuthenticated, messagesRoutes);
router.use('/users', usersRoutes);

export default router;
