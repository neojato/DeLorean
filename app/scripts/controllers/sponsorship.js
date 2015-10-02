'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:SponsorshipCtrl
 * @description
 * # SponsorshipCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('SponsorshipCtrl', function ($scope, Config) {
    $scope.site = Config;

    var sHour = Config.eventStart.substring(0, Config.eventStart.indexOf(':'));
    var sMinutes = Config.eventStart.substring(Config.eventStart.indexOf(':')+1, Config.eventStart.indexOf(':')+2);

    var eHour = Config.eventEnd.substring(0, Config.eventEnd.indexOf(':'));
    var eMinutes = Config.eventEnd.substring(Config.eventEnd.indexOf(':')+1, Config.eventEnd.indexOf(':')+2);

    function parseDate(str) {
      var d = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
      return (d) ? new Date(d[1], d[2]-1, d[3]) : new Date();
    }

    var event = parseDate(Config.eventDate);
    $scope.eventStart = new Date(event.getFullYear(), event.getMonth(), event.getDate(), sHour, sMinutes, 0);
    $scope.eventEnd = new Date(event.getFullYear(), event.getMonth(), event.getDate(), eHour, eMinutes, 0);
  });
