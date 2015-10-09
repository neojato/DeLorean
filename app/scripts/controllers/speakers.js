'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:SpeakersCtrl
 * @description
 * # SpeakersCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('SpeakersCtrl', function ($scope, Ref, $firebaseArray, $timeout, $modal, $window, $location, Config) {
    $scope.site = Config;
    $scope.speakers = $firebaseArray(Ref.child('speakers'));

    $scope.openFormModal = function(speaker) {
      $scope.speaker = speaker;
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'modalSpeakerForm.html',
        controller: 'SpeakerModalCtrl',
        resolve: {
          speaker: function() {
            return $scope.speaker;
          }
        }
      });
      modalInstance.result.then(function(results) {
        if (results.action === 'add') {
          $scope.add(results.speaker);
        } else if (results.action === 'edit') {
          $scope.edit(results.speaker);
        }
      });
    };

    $scope.openInfoModal = function(speaker) {
      $scope.speaker = speaker;
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'modalInfoContent.html',
        controller: 'InfoModalCtrl',
        resolve: {
          speaker: function() {
            return $scope.speaker;
          }
        }
      });
      modalInstance.result.then(function(results) {
        if (results.action === 'delete') {
          $scope.delete(results.speaker);
        } else if (results.action === 'edit') {
          $scope.openFormModal(results.speaker);
        }
      });
    };

    $scope.add = function(speaker) {
      $scope.speakers.$add(speaker);
    };

    $scope.edit = function(speaker) {
      $scope.speakers.$save(speaker);
    };
  
    $scope.delete = function(speaker) {
      $scope.speakers.$remove(speaker);
    };
    
    $scope.$on('$viewContentLoaded', function() {
      $window.ga('send', 'pageview', { page: $location.path() });
    });
  });

/**
 * @ngdoc function
 * @name devfestApp.controller:SpeakerModalCtrl
 * @description
 * # SpeakerModalCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('SpeakerModalCtrl', function ($scope, $modalInstance, speaker) {
    $scope.speaker = speaker;
    $scope.err = null;
    
    $scope.saveSpeaker = function(speaker) {
      if (speaker && speaker.$id) {
        if ($scope.imageData) {
          speaker.image = $scope.imageData;
        }
        $modalInstance.close({
          'action': 'edit',
          'speaker': speaker
        });
      } else if (speaker) {
        if ($scope.imageData) {
          speaker.image = $scope.imageData;
        }
        $modalInstance.close({
          'action': 'add',
          'speaker': speaker
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
    
    $scope.$watch('speakerForm', function() {
      document.getElementById('image').addEventListener('change', $scope.handleImageAdd, false);
    }, true);
    
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

/**
 * @ngdoc function
 * @name devfestApp.controller:InfoModalCtrl
 * @description
 * # InfoModalCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('InfoModalCtrl', function ($scope, $modalInstance, $window, speaker) {
    $scope.speaker = speaker;

    $scope.editSpeaker = function(speaker) {
      $modalInstance.close({
        'action': 'edit',
        'speaker': speaker
      });
    };

    $scope.deleteSpeaker = function(speaker) {
      if (confirm('Are you sure you want to delete this speaker?')) {
        $modalInstance.close({
          'action': 'delete',
          'speaker': speaker
        });
      }
    };
    
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
      }
      
      $window.open(link, '_blank');
      return false;
    };
    
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });