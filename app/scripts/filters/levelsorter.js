'use strict';

/**
 * @ngdoc filter
 * @name devfestApp.filter:levelSorter
 * @function
 * @description
 * # levelSorter
 * Filter in the devfestApp.
 */
angular.module('devfestApp')
  .filter('levelSorter', function() {
    function customOrder(item) {
      switch(item) {
        case 'Gold':
          return 1;
        case 'Silver':
          return 2;
        case 'Bronze':
          return 3;
      }
    }

    return function(items, field) {
      var filtered = [];
      angular.forEach(items, function(item) {
        filtered.push(item);
      });
      filtered.sort(function(a, b) {
        return (customOrder(a.level) > customOrder(b.level) ? 1 : -1);
      });
      return filtered;
    };
  });

