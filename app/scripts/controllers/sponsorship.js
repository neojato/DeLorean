'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:SponsorshipCtrl
 * @description
 * # SponsorshipCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('SponsorshipCtrl', function($scope, Ref, $firebaseArray, $timeout, $uibModal, $window, $location, $confirm, Config) {
    $scope.site = Config;
    $scope.sponsors = $firebaseArray(Ref.child('sponsors'));

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

    $scope.openFormModal = function(sponsor) {
      $scope.sponsor = sponsor;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'modalSponsorForm.html',
        controller: 'SponsorModalCtrl',
        resolve: {
          sponsor: function() {
            return $scope.sponsor;
          }
        }
      });
      modalInstance.result.then(function(results) {
        if (results.action === 'add') {
          $scope.add(results.sponsor);
        } else if (results.action === 'edit') {
          $scope.edit(results.sponsor);
        }
      });
    };

    $scope.add = function(sponsor) {
      $scope.sponsors.$add(sponsor);
    };

    $scope.editSponsor = function(sponsor) {
      $scope.openFormModal(sponsor);
    };

    $scope.edit = function(sponsor) {
      $scope.sponsors.$save(sponsor);
    };

    $scope.deleteSponsor = function(sponsor) {
      $confirm({text: 'Are you sure you want to delete ' + sponsor.company + '? (this cannot be undone)'})
        .then(function() {
          $scope.sponsors.$remove(sponsor);
        });
    };
    
    $scope.goto = function(link, c, a, l, v) {
      $scope.gaClick(c, a, l, v);
      $window.open(link);
    };
    
    $scope.$on('$viewContentLoaded', function(event) {
      $window.ga('send', 'pageview', { page: $location.path() });
    });
    
    $scope.gaClick = function(category, action, label, value) {
      $window.ga('send', 'event', category, action, label, value);
    }
  });

/**
 * @ngdoc function
 * @name devfestApp.controller:SponsorModalCtrl
 * @description
 * # SponsorModalCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('SponsorModalCtrl', function($scope, $uibModalInstance, sponsor) {
    $scope.sponsor = sponsor;
    $scope.err = null;
    
    $scope.saveSponsor = function(sponsor) {
      if (sponsor && sponsor.$id) {
        if ($scope.imageData) {
          sponsor.image = $scope.imageData;
        }
        $uibModalInstance.close({
          'action': 'edit',
          'sponsor': sponsor
        });
      } else if (sponsor) {
        if ($scope.imageData) {
          sponsor.image = $scope.imageData;
        }
        $uibModalInstance.close({
          'action': 'add',
          'sponsor': sponsor
        });
      } else {
        $scope.err = 'Please fill out the form or click Cancel to close.';
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
    
    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
