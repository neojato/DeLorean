'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('MainCtrl', function ($scope, Config) {
    $scope.config = Config;
  });
