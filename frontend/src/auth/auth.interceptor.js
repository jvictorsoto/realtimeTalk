class AuthInterceptor {
  /** @ngInject */
  constructor($rootScope, $injector, $q, localStorageService) {
    this.$rootScope = $rootScope;
    this.$injector = $injector;
    this.$q = $q;
    this.localStorageService = localStorageService;
    AuthInterceptor.instance = this;
  }

  request(httpConfig) {
    const that = this || AuthInterceptor.instance;
    console.log('Logged user: ', that.$rootScope.loggedUser);
    if (that.$rootScope.loggedUser) {
      httpConfig.headers.Authorization = // eslint-disable-line no-param-reassign
      `Bearer ${that.$rootScope.loggedUser.token}`;
    }

    httpConfig.timeout = 5000; // eslint-disable-line no-param-reassign
    return httpConfig;
  }

  responseError(response) {
    const that = this || AuthInterceptor.instance;
    // go to login and reject response
    if (response.status === 401) {
      that.localStorageService.remove('loggedUser');
      that.$rootScope.loggedUser = null;
      that.$injector.get('$state').go('signin');
    }
    return that.$q.reject(response);
  }
}

export default AuthInterceptor;
