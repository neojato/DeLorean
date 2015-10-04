'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:SpeakersCtrl
 * @description
 * # SpeakersCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('SpeakersCtrl', function ($scope, Ref, $firebaseArray, $timeout, $route, $modal, Config) {
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
        console.log(results);
      }, function() {
        console.log('speaker modal closed');
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
        console.log(results);
        if (results.action === 'delete') {
          $scope.delete(results.speaker);
        } else if (results.action === 'edit') {
          $scope.openFormModal(results.speaker);
        }
      }, function() {
        console.log('info modal closed');
      });
    };
  
    $scope.delete = function(speaker) {
      $scope.speakers.$remove(speaker);
    };

    $scope.addSpeaker = function() {
      if ($scope.imageData) {
        $scope.speaker.image = $scope.imageData;
      }
      $scope.speakers.$add($scope.speaker).catch(alert);
      $scope.toggleModal();
      for (var prop in $scope.speaker) $scope.speaker[prop] = null; // reset
      $timeout(function() {
        $route.reload();
      }, 1000);
    };

    $scope.saveSpeaker = function() {
      if ($scope.speaker.id !== null) {
        delete $scope.speaker.id;
        if ($scope.imageData) {
          $scope.speaker.image = $scope.imageData;
        }
        $scope.speakers.$save($scope.speaker);
        $scope.toggleModal();
        for (var prop in $scope.speaker) $scope.speaker[prop] = null; // reset
        $timeout(function() {
          $route.reload();
        }, 1000);
      } else {
        $scope.addSpeaker();
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

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
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
      };
      
      $window.open(link, '_blank');
      return false;
    };
    
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });