'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('HeaderCtrl', function($scope, Auth, $location, Config) {
    $scope.site = Config;
    $scope.logout = function() { Auth.$unauth(); };
  
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  });
