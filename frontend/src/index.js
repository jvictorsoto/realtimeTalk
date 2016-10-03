import angular from 'angular';
import 'angular-ui-router';
import 'angular-socket-io/socket';
import 'angular-aria';
import 'angular-animate';
import 'angular-messages';
import 'angular-material';
import 'angular-material/angular-material.css';

import {messages} from './messages/messages';
import routesConfig from './routes';

import './index.less';

export const app = 'app';

angular
  .module(app, ['ui.router', 'ngMessages', 'ngMaterial', 'btford.socket-io'])
  .config(routesConfig)
  .component('messages', messages)
  .factory('mSocket', socketFactory => {
    const messagesSocket = io.connect('http://192.168.1.137:8000'); // eslint-disable-line no-undef

    return socketFactory({
      ioSocket: messagesSocket
    });
  });
