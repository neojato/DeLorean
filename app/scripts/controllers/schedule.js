'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
.controller('ScheduleCtrl', function ($scope, SessionsService) {
  $scope.sessions = SessionsService;
  $scope.showModal = false;
  $scope.tab = 1;
  $scope.session = {
    'id': null,
    'title': null,
    'room': null,
    'time': null,
    'speaker': null,
    'track': null,
    'description': null,
    'faveCounter': 0
  };

  $scope.toggleModal = function() {
    $scope.showModal = !$scope.showModal;
  };

  $scope.setTab = function(newTab) {
    $scope.tab = newTab;
  };

  $scope.isTab = function(tabNum) {
    return $scope.tab === tabNum;
  };
  
  $scope.addSession = function() {
    $scope.sessions.$add($scope.session).catch(alert);
    $scope.toggleModal();
  };
  
  $scope.editSession = function(session) {
    $scope.session = session;
    $scope.session.id = session.$id;
    $scope.toggleModal();
  };
  
  $scope.saveSession = function() {
    if ($scope.session.id != null) {
      delete $scope.session.id;
      $scope.sessions.$save($scope.session);
      $scope.toggleModal();
    } else {
      $scope.addSession();
    }
  };
  
  $scope.deleteSession = function(session) {
    if (confirm('Are you sure you want to delete this session?')) {
      $scope.sessions.$remove(session);
    }
  };

  function alert(msg) {
    $scope.err = msg;
    $timeout(function() {
      $scope.err = null;
    }, 5000);
  }
});
