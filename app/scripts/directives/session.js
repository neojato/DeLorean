'use strict';

/**
 * @ngdoc directive
 * @name devfestApp.directive:session
 * @description
 * # session
 */
angular.module('devfestApp')
  .directive('sessionTabpanel', function(Config) {
    return {
      templateUrl: '/views/session.html',
      restrict: 'E',
      replace: true,
      scope: {
        'model': '=',
        'editSession': '&',
        'deleteSession': '&'
      },
      link: function postLink($scope, element, attrs) {
        $scope.session = $scope.model;
        
        $scope.getTime = function(time) {
          var sHour = time.substring(0, time.indexOf(':'));
          var sMinutes = time.substring(time.indexOf(':')+1, time.indexOf(':')+3);
          var event = parseDate(Config.eventDate);
          return new Date(event.getFullYear(), event.getMonth(), event.getDate(), sHour, sMinutes, 0);
        };

        function parseDate(str) {
          var d = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
          return (d) ? new Date(d[1], d[2]-1, d[3]) : new Date();
        }
      }
    };
  });