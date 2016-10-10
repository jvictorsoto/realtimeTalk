export default authRun;

/** @ngInject */
function authRun($rootScope, $log, localStorageService) {
  const loggedUser = localStorageService.get('loggedUser');
  if (loggedUser) {
    $log.debug('Fetched user from localStorage:', loggedUser);
    $rootScope.loggedUser = loggedUser; // eslint-disable-line no-param-reassign
  }
}
