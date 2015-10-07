'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('MainCtrl', function ($scope, $http, $window, $location, Config) {
    $scope.site = Config;
    $scope.gMapLazy = 'https://maps.google.com/maps/api/js';
    $scope.gMapURL = 'https://maps.google.com/maps/api/js?client=' + Config.googleAPI;

    var sHour = Config.eventStart.substring(0, Config.eventStart.indexOf(':'));
    var sMinutes = Config.eventStart.substring(Config.eventStart.indexOf(':') + 1, Config.eventStart.indexOf(':') + 3);

    var eHour = Config.eventEnd.substring(0, Config.eventEnd.indexOf(':'));
    var eMinutes = Config.eventEnd.substring(Config.eventEnd.indexOf(':') + 1, Config.eventEnd.indexOf(':') + 3);

    function parseDate(str) {
      var d = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
      return (d) ? new Date(d[1], d[2]-1, d[3]) : new Date();
    }

    var event = parseDate(Config.eventDate);
    $scope.eventStart = new Date(event.getFullYear(), event.getMonth(), event.getDate(), sHour, sMinutes, 0);
    $scope.eventEnd = new Date(event.getFullYear(), event.getMonth(), event.getDate(), eHour, eMinutes, 0);

    var onComplete = function(results) {
      var data = results.data;
      if (data.status === 'OK') {
        $scope.map = {
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
          zoom: 16,
          center: {
            lat: data.results[0].geometry.location.lat + 0.002,
            lng: data.results[0].geometry.location.lng
          }
        };
      }
    };

    var onError = function(error) {
      console.error(error);
    };

    if (Config.eventAddress.length > 0 ) {
      $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + Config.eventAddress.replace(/\s/g, '+').replace(/,/g, '') + '&key=' + Config.googleAPI)
        .then(onComplete, onError);
    }
    
    $scope.$on('$viewContentLoaded', function(event) {
      $window.ga('send', 'pageview', { page: $location.path() });
    });
    
    $scope.gaClick = function(category, action, label, value) {
      $window.ga('send', 'event', category, action, label, value);
    }
  });