class SignupController {

  /** @ngIngect */
  constructor($log, Backend) {
    this.$log = $log;
    this.Backend = Backend;
  }

  signup() {
    this.userForm.username.$setValidity('conflict', true);
    this.userForm.confirmPassword.$setValidity('valid', true);
    this.userForm.confirmPassword.$setValidity('server', true);

    if (!this.userForm.$valid) {
      return;
    }

    this.backgroundWorking = true;
    this.Backend.signup(this.user)
      .then(res => {
        this.backgroundWorking = false;
        this.$log.debug('Signup response from backend: ', res);
      })
      .catch(res => {
        this.backgroundWorking = false;
        this.$log.debug('Signup response from backend: ', res);

        switch (res.status) {
          case 409:
            this.userForm.username.$setValidity('conflict', false);
            break;

          case 400:
            this.userForm.confirmPassword.$setValidity('valid', false);
            break;

          default:
            this.userForm.confirmPassword.$setValidity('server', false);
            break;
        }
      });
  }
}

export default SignupController;
