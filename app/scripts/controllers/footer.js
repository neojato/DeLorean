'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('FooterCtrl', function($scope, $window, $timeout, Config) {
    $scope.site = Config;
    var date = new Date();
    $scope.copyright = date.getFullYear() == '2015' ? '2015' : '2015-' + date.getFullYear();
    
    $scope.socialLink = function(network) {
      var link = '';
      
      switch(network) {
        case 'google_plus':
          link = 'https://plus.google.com/' + Config.id;
          break;
        case 'facebook':
          link = 'https://www.facebook.com/' + Config.facebook;
          break;
        case 'twitter':
          link = 'https://twitter.com/' + Config.twitter;
          break;
        case 'github':
          link = 'https://github.com/' + Config.github;
          break;
        case 'meetup':
          link = 'http://www.meetup.com/' + Config.meetup;
          break;
      }
      
      $window.open(link, '_blank');
      return false;
    };
    
    $timeout(function() {
      gapi.plusone.go();
    }, 1000);
  });
