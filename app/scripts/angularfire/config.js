angular.module('firebase.config', [])
  .constant('FBURL', 'https://flying-disc.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])

  .constant('loginRedirectPath', '/login');
