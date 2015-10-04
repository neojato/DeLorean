'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:SpeakersCtrl
 * @description
 * # SpeakersCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('SpeakersCtrl', function ($scope, Ref, $firebaseArray, $timeout, $window, Config) {
    $scope.site = Config;
    $scope.speakers = $firebaseArray(Ref.child('speakers'));
    $scope.showModal = false;
    $scope.showInfoModal = false;
    $scope.speaker = {
      'id': null,
      'name': null,
      'company': null,
      'title': null,
      'bio': null,
      'image': null,
      'google': null,
      'facebook': null,
      'twitter': null,
      'github': null,
      'website': null
    };

    $scope.toggleModal = function() {
      $scope.showModal = !$scope.showModal;
    };

    $scope.toggleInfoModal = function(speaker) {
      $scope.showInfoModal = !$scope.showInfoModal;
      $scope.speaker = speaker;
    };

    $scope.addSpeaker = function() {
      if ($scope.imageData) {
        $scope.speaker.image = $scope.imageData;
      }
      $scope.speakers.$add($scope.speaker).catch(alert);
      $scope.toggleModal();
    };

    $scope.editSpeaker = function(speaker) {
      $scope.toggleInfoModal();
      $scope.speaker = speaker;
      $scope.toggleModal();
    };

    $scope.saveSpeaker = function() {
      if ($scope.speaker.id !== null) {
        delete $scope.speaker.id;
        if ($scope.imageData) {
          $scope.speaker.image = $scope.imageData;
        }
        $scope.speakers.$save($scope.speaker);
        $scope.toggleModal();
      } else {
        $scope.addSpeaker();
      }
    };

    $scope.deleteSpeaker = function(speaker) {
      if (confirm('Are you sure you want to delete this speaker?')) {
        $scope.speakers.$remove(speaker);
        $scope.toggleInfoModal();
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
    
    $scope.$watch('speakerForm', function() {
      document.getElementById('image').addEventListener('change', $scope.handleImageAdd, false);
    }, true);
    
    $scope.socialLink = function(network, profile) {
      var link = '';
      
      switch(network) {
        case 'google_plus':
          link = 'https://plus.google.com/' + profile;
          break;
        case 'facebook':
          link = 'https://www.facebook.com/' + profile;
          break;
        case 'twitter':
          link = 'https://twitter.com/' + profile;
          break;
        case 'github':
          link = 'https://github.com/' + profile;
          break;
      };
      
      $window.open(link, '_blank');
      return false;
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
