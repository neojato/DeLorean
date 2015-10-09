'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('ScheduleCtrl', function ($scope, Ref, $firebaseArray, $timeout, $modal, $window, $location, Config) {
    $scope.sessions = $firebaseArray(Ref.child('sessions'));
    $scope.tab = 1;

    $scope.setTab = function(newTab) {
      $scope.tab = newTab;
    };

    $scope.isTab = function(tabNum) {
      return $scope.tab === tabNum;
    };

    $scope.openFormModal = function(session) {
      $scope.session = session;
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'modalSessionForm.html',
        controller: 'SessionModalCtrl',
        resolve: {
          session: function() {
            return $scope.session;
          }
        }
      });
      modalInstance.result.then(function(results) {
        if (results.action === 'add') {
          $scope.add(results.session);
        } else if (results.action === 'edit') {
          $scope.edit(results.session);
        }
      });
    };

    $scope.add = function(session) {
      $scope.sessions.$add(session);
    };

    $scope.editSession = function(session) {
      $scope.openFormModal(session);
    };

    $scope.edit = function(session) {
      $scope.sessions.$save(session);
    };
  
    $scope.deleteSession = function(session) {
      if (confirm('Are you sure you want to delete this session?')) {
        $scope.sessions.$remove(session);
      }
    };
    
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
    
    $scope.$on('$viewContentLoaded', function() {
      $window.ga('send', 'pageview', { page: $location.path() });
    });
  });

/**
 * @ngdoc function
 * @name devfestApp.controller:SessionModalCtrl
 * @description
 * # SessionModalCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('SessionModalCtrl', function ($scope, $modalInstance, session) {
    $scope.session = session;
    $scope.err = null;
    
    $scope.saveSession = function(session) {
      if (session && session.$id) {
        $modalInstance.close({
          'action': 'edit',
          'session': session
        });
      } else if (session) {
        $modalInstance.close({
          'action': 'add',
          'session': session
        });
      } else {
        $scope.err = 'Please fill out the form or click Cancel to close.';
      }
    };
    
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

