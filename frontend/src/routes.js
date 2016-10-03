export default routesConfig;

/** @ngInject */
function routesConfig($mdThemingProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
  $mdThemingProvider.theme('salton')
    .primaryPalette('purple');

  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'messages'
    });
}
