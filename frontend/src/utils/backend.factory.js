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

  getMessages() {
    return this.$http.get(`${config.backendEndpoint}/api/messages`);
  }

  newMessage(messageDTO) {
    return this.$http.post(`${config.backendEndpoint}/api/messages`, messageDTO);
  }
}

export default BackendService;
