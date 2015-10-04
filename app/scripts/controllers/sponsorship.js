'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:SponsorshipCtrl
 * @description
 * # SponsorshipCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('SponsorshipCtrl', function ($scope, Ref, $firebaseArray, $timeout, Config) {
    $scope.site = Config;
    $scope.sponsors = $firebaseArray(Ref.child('sponsors'));
    $scope.showSponsorModal = false;
    $scope.sponsor = {
      'company': null,
      'link': null,
      'description': null,
      'image': null,
      'level': null
    };

    var sHour = Config.eventStart.substring(0, Config.eventStart.indexOf(':'));
    var sMinutes = Config.eventStart.substring(Config.eventStart.indexOf(':')+1, Config.eventStart.indexOf(':')+3);

    var eHour = Config.eventEnd.substring(0, Config.eventEnd.indexOf(':'));
    var eMinutes = Config.eventEnd.substring(Config.eventEnd.indexOf(':')+1, Config.eventEnd.indexOf(':')+3);

    function parseDate(str) {
      var d = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
      return (d) ? new Date(d[1], d[2]-1, d[3]) : new Date();
    }

    var event = parseDate(Config.eventDate);
    $scope.eventStart = new Date(event.getFullYear(), event.getMonth(), event.getDate(), sHour, sMinutes, 0);
    $scope.eventEnd = new Date(event.getFullYear(), event.getMonth(), event.getDate(), eHour, eMinutes, 0);

    $scope.toggleSponsorModal = function() {
      $scope.showSponsorModal = !$scope.showSponsorModal;
    };

    $scope.addSponsor = function() {
      if ($scope.imageData) {
        $scope.sponsor.image = $scope.imageData;
      }
      $scope.sponsors.$add($scope.sponsor).catch(alert);
      $scope.toggleSponsorModal();
    };

    $scope.deleteSponsor = function(sponsor) {
      if (confirm('Are you sure you want to delete this sponsor?')) {
        $scope.sponsors.$remove(sponsor);
      }
    };
    
    $scope.handleImageAdd = function(evt) {
      var f = evt.target.files[0];
      var reader = new FileReader();
      reader.onload = (function(file) {
        return function(e) {
          var filePayload = e.target.result;
          $scope.imageData = filePayload;
        };
      })(f);
      reader.readAsDataURL(f);
    };
    
    $scope.$watch('sponsorForm', function() {
      document.getElementById('image').addEventListener('change', $scope.handleImageAdd, false);
    }, true);

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
