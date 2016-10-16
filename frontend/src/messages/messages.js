import config from '../config';

class MessagesController {

  /** @ngIngect */
  constructor($rootScope, $scope, $mdSidenav, $log, Backend, mSocket) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$mdSidenav = $mdSidenav;
    this.$log = $log;
    this.Backend = Backend;
    this.mSocket = mSocket;
    this.messages = [];
    this.getMessages();
    this.mSocket.on('newMessage', this.newMessageHandler.bind(this));
    this.$scope.$watch(() => this.chat, (newValue, oldValue) => this.getMessages());
  }

  getMessages() {
    if (!this.chat) { return; }

    this.messages = [];
    this.loadingMessages = true;
    this.Backend.getMessages(this.chat._id)
      .then(res => {
        this.loadingMessages = false;
        this.$log.debug('getMessages response from backend', res);
        this.messages = res.data.docs;
      })
      .catch(reason => {
        this.loadingMessages = false;
        this.$log.debug('getMessages error from backend', reason);
      });
  }

  sendMessage() {
    this.Backend.newMessage(this.chat._id, { text: this.text })
      .then(res => {
        this.$log.debug('sendMessage response from backend', res);
        this.text = '';
        this.messageForm.$setPristine();
        this.chat.lastActivityAt = new Date();
      })
      .catch(reason => {
        this.$log.debug('sendMessage error from backend', reason);
      });
  }

  newMessageHandler(payload) {
    this.$log.debug('New message event!', payload);
    this.messages.push({ author: payload.author, text: payload.text, date: payload.date });
  }

  getMsgColors(message) {
    if (message.author === this.$rootScope.loggedUser.profile.username) {
      return { background: `${config.palete.primary}-200` };
    }

    return {};
  }

  tglSidenav() {
    this.$mdSidenav('left').toggle();
  }
}

export const messages = {
  template: require('./messages.html'),
  controller: MessagesController,
  bindings: {
    chat: '='
  }
};
