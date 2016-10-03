class MessagesController {

  /** @ngIngect */
  constructor($http, $log, mSocket) {
    this.$http = $http;
    this.$log = $log;
    this.mSocket = mSocket;
    this.messages = [];
    this.getMessages();
    this.mSocket.on('newMessage', this.newMessageHandler.bind(this));
  }

  getMessages() {
    this.$http.get('http://192.168.1.137:8000/api/messages')
      .then(res => {
        this.$log.debug('Response from backend', res);
        this.messages = res.data;
      })
      .catch(reason => {
        this.$log.debug('Fail fetching messages from backend', reason);
      });
  }

  sendMessage(author, text) {
    this.$http.post('http://192.168.1.137:8000/api/messages', {author, text})
      .then(res => {
        this.$log.debug('Response from backend', res);
      })
      .catch(reason => {
        this.$log.debug('Fail from backend', reason);
      });
  }

  newMessageHandler(payload) {
    this.$log.debug('New message event!');
    this.messages.push({author: payload.author, text: payload.text, date: payload.date});
  }
}

export const messages = {
  template: require('./messages.html'),
  controller: MessagesController
};
