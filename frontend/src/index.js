import angular from 'angular';
import 'angular-ui-router';
import 'angular-socket-io/socket';
import 'angular-aria';
import 'angular-animate';
import 'angular-messages';
import 'angular-material';
import 'angular-material/angular-material.css';
import 'angular-local-storage/dist/angular-local-storage';
import 'material-design-icons';

import backend from './utils/backend.factory';
import socketFactory from './utils/socket.factory';
import compareTo from './utils/compareTo.directive';
import { signin, signup, authInterceptor, authRun } from './auth';
import { messages } from './messages/messages';
import { chats } from './chats/chats';
import routesConfig from './routes';

import './index.less';

export const app = 'realtimeTalk';

angular
  .module(app, ['ui.router', 'ngMessages', 'ngMaterial', 'LocalStorageModule', 'btford.socket-io'])
  .config(routesConfig)
  .run(authRun)
  .service('AuthInterceptor', authInterceptor)
  .factory('Backend', backend)
  .factory('mSocket', socketFactory)
  .directive('compareTo', compareTo)
  .component('messages', messages)
  .component('chats', chats)
  .component('signin', signin)
  .component('signup', signup);
