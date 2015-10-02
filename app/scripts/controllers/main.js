'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
.controller('MainCtrl', function ($scope, $http, Config) {
  $scope.config = Config;
  $scope.gMapLazy = 'https://maps.google.com/maps/api/js';
  $scope.gMapURL = 'https://maps.google.com/maps/api/js?client=' + Config.googleAPI;
  
  var onComplete = function(results) {
    var data = results.data;
    if (data.status === 'OK') {
      $scope.map = {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
        zoom: 16
      };
      console.log($scope.map);
    }
  };

  var onError = function(error) {
    console.error(error);
  };
  
  if (Config.eventAddress.length > 0 ) {
    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + Config.eventAddress.replace(/\s/g, '+').replace(/,/g, '') + '&key=' + Config.googleAPI)
      .then(onComplete, onError);
  }
});