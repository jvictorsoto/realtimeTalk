import config from '../config';

class BackendService {
  /** @ngInject */
  constructor($http) {
    this.$http = $http;
  }

  signin(userDTO) {
    return this.$http.post(`${config.backendEndpoint}/api/users/signin`, userDTO);
  }

  signup(userDTO) {
    return this.$http.post(`${config.backendEndpoint}/api/users`, userDTO);
  }

  getChats() {
    return this.$http.get(`${config.backendEndpoint}/api/chats`);
  }

  getMessages(chatId) {
    return this.$http.get(`${config.backendEndpoint}/api/chats/${chatId}/messages`);
  }

  newMessage(chatId, messageDTO) {
    return this.$http.post(`${config.backendEndpoint}/api/chats/${chatId}/messages`, messageDTO);
  }
}

export default BackendService;
