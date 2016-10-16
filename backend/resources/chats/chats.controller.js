import httpStatus from 'http-status';
import Chat from './chats.model';
import { io } from '../events';

function list(req, res, next) {
  const { sort = '-lastActivityAt', skip = 0, limit = 50, filter = '' } = req.query;
  Chat.list({ sort, skip, limit, filter, username: req.user })
    .then(chats => {
      res.json(chats);
    })
    .catch(reason => {
      console.log('Error listing chat: ', reason);
      next(reason);
    });
}

function create(req, res, next) {
  console.log('Storing chat: ', req.body);
  const chat = new Chat({
    title: req.body.title,
    owner: req.user,
    private: req.body.private,
    users: req.body.users
  });

  chat.save()
    .then(() => {
      // TODO: Improve, only broadcast to users invited to private chats!!
      io.emit('newChat', { title: chat.title, owner: chat.owner, private: chat.private });
      res.status(httpStatus.CREATED).send({ msg: 'Chat stored and broadcasted.' });
    })
    .catch(reason => {
      if (reason.code === 11000) {
        return res.status(httpStatus.CONFLICT).json({ msg: 'title already taken' });
      }

      console.log('Error storing chat: ', reason);
      return next(reason);
    });
}

export default { list, create };
