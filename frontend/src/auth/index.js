import SigninController from './signin.controller';
import SignupController from './signup.controller';
import run from './auth.run';
import interceptor from './auth.interceptor';

export const signin = {
  template: require('./signin.html'),
  controller: SigninController
};

export const signup = {
  template: require('./signup.html'),
  controller: SignupController
};

export const authRun = run;
export const authInterceptor = interceptor;
