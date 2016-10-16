import Message from './messages.model';
import Chat from '../chats/chats.model';
import { io } from '../events';

function list(req, res, next) {
  const { sort = 'date', skip = 0, limit = 50, filter = '' } = req.query;
  Message.list({ sort, limit, skip, filter, chat: req.params.chatId })
    .then(messages => {
      res.json(messages);
    })
    .catch(reason => {
      console.log('Error listing messages: ', reason);
      res.status(500).json({ msg: 'DB blew up' });
    });
}


function create(req, res, next) {
  const message = new Message({
    text: req.body.text,
    author: req.user,
    chat: req.params.chatId
  });
  console.log('Storing message: ', message);

  message.save()
    .then(() => {
      io.emit('newMessage', { author: message.author, text: message.text, date: message.date });
      res.status(201).send({ msg: 'Message stored and broadcasted.' });
      Chat.updateChatActivy(req.params.chatId)
        .catch(reason => console.error('Impossible to update last activity of chat ', req.chatId, reason));
    })
    .catch(reason => {
      console.log('Error saving message: ', reason);
      res.status(500).json({ msg: 'DB blew up' });
    });
}

export default { list, create };
