import Message from './messages.model';
import { io } from '../events';

function list(req, res, next) {
    Message.list()
        .then((messages) => {
            res.json(messages);
        })
        .catch((reason) => {
            console.log('Error listing messages: ', reason);
            res.status(500).json({ msg: 'DB blew up' });
        });
}


function create(req, res, next) {
    console.log('Storing message: ', req.body);
    const message = new Message(req.body);
    message.save()
        .then(() => {
            io.emit('newMessage', { author: message.author, text: message.text, date: message.date })
            res.status(201).send({ msg: 'Message stored and broadcasted.' })
        })
        .catch((reason) => {
            console.log('Error saving message: ', reason);
            res.status(500).json({ msg: 'DB blew up' });
        });
}

export default { list, create };
