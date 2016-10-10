class SigninController {

  /** @ngIngect */
  constructor($rootScope, $log, $state, localStorageService, Backend) {
    this.$rootScope = $rootScope;
    this.$log = $log;
    this.$state = $state;
    this.localStorageService = localStorageService;
    this.Backend = Backend;
  }

  signin() {
    this.userForm.username.$setValidity('present', true);
    this.userForm.password.$setValidity('correct', true);
    this.userForm.password.$setValidity('valid', true);
    this.userForm.password.$setValidity('server', true);

    if (!this.userForm.$valid) {
      return;
    }

    this.backgroundWorking = true;
    this.Backend.signin({ username: this.username, password: this.password })
      .then(res => {
        this.$log.debug('Signin response from backend: ', res);
        if (this.remember) {
          this.localStorageService.set('loggedUser', res.data);
        }

        this.$rootScope.loggedUser = res.data;
        this.$state.go('home');
      })
      .catch(res => {
        this.$log.debug('Signin response from backend: ', res);
        this.backgroundWorking = false;
        switch (res.status) {
          case 404:
            this.userForm.username.$setValidity('present', false);
            break;

          case 401:
            this.userForm.password.$setValidity('correct', false);
            break;

          case 400:
            this.userForm.password.$setValidity('valid', false);
            break;

          default:
            this.userForm.password.$setValidity('server', false);
            break;
        }
      });
  }
}

export default SigninController;
