'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('ScheduleCtrl', function($scope, Ref, $firebaseArray, $timeout, $uibModal, $window, $location, $confirm, Config) {
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
      var modalInstance = $uibModal.open({
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
      $confirm({text: 'Are you sure you want to delete ' + session.title + '? (this cannot be undone)'})
        .then(function() {
          $scope.sessions.$remove(session);
        });
    };
    
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
  .controller('SessionModalCtrl', function($scope, $uibModalInstance, session) {
    $scope.session = session;
    $scope.err = null;
    
    $scope.saveSession = function(session) {
      if (session && session.$id) {
        $uibModalInstance.close({
          'action': 'edit',
          'session': session
        });
      } else if (session) {
        $uibModalInstance.close({
          'action': 'add',
          'session': session
        });
      } else {
        $scope.err = 'Please fill out the form or click Cancel to close.';
      }
    };
    
    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });

