'use strict';

/**
 * @ngdoc service
 * @name devfestApp.sessions
 * @description
 * # sessions
 * Service in the devfestApp.
 */
angular.module('devfestApp')
  .service('SessionsService', function ($firebaseArray, Ref) {
    return $firebaseArray(Ref.child('sessions'));
  });