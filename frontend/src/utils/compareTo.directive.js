export default () => ({
  require: 'ngModel',
  link: (scope, element, attrs, ctrl) => {
    ctrl.$validators.compareTo = val => // eslint-disable-line no-param-reassign
      (val === scope.$eval(attrs.compareTo));

    scope.$watch(attrs.compareTo, () => {
      ctrl.$validate();
    });
  }
});
