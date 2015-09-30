'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('HeaderCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  });
