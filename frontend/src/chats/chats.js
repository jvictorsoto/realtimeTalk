class ChatsController {

  /** @ngIngect */
  constructor($mdMedia, $mdSidenav, $log, Backend, mSocket) {
    this.$mdMedia = $mdMedia;
    this.$mdSidenav = $mdSidenav;
    this.$log = $log;
    this.Backend = Backend;
    this.mSocket = mSocket;
    this.getChats();
    this.currentChat = null;
  }

  getChats() {
    this.Backend.getChats()
      .then(res => {
        this.$log.debug('getChats response from backend', res);
        this.chats = res.data.docs;
        this.currentChat = this.chats[0];
      })
      .catch(reason => {
        this.$log.debug('getChats error from backend', reason);
      });
  }

  selectChat(chat) {
    this.currentChat = chat;
    this.$mdSidenav('left').close();  // If is locked open wont be affected...
  }
}

export const chats = {
  template: require('./chats.html'),
  controller: ChatsController
};
