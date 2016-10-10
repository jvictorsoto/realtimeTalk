import config from './config';
import { app } from './index';

export default routesConfig;

/** @ngInject */
function routesConfig(localStorageServiceProvider, $logProvider, $httpProvider, $stateProvider,
  $urlRouterProvider, $locationProvider) {
  localStorageServiceProvider.setPrefix(app);
  $httpProvider.interceptors.push('AuthInterceptor');
  $logProvider.debugEnabled(config.debug);

  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'chats',
      resolve: { authentication: ensureAuthenticated }
    })
    .state('signin', {
      url: '/signin',
      component: 'signin'
    })
    .state('signup', {
      url: '/signup',
      component: 'signup',
    });
}

function ensureAuthenticated($q, $rootScope, $state, $timeout) {
  if ($rootScope.loggedUser) {
    // Resolve the promise successfully
    return $q.when();
  }
  /* Lets use an old JS trick, envolve in a timeout the state change to force its execution after
  Promise rejection (this is because the timeout function will be executed when stack is empty) */
  $timeout(() => {
    $state.go('signin');
  });

  // Reject the authentication promise to prevent the state from loading
  return $q.reject(Error('You are not logged'));
}
