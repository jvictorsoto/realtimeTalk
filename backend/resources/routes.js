import express from 'express';
import messagesRoutes from './messages/messages.routes';

const router = express.Router()

router.use('/messages', messagesRoutes);

export default router;
