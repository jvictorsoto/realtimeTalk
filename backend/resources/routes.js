import express from 'express';
import messagesRoutes from './messages/messages.routes';
import usersRoutes from './users/users.routes';

const router = express.Router()

router.use('/messages', messagesRoutes);
router.use('/users', usersRoutes);

export default router;
