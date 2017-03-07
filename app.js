(function() {
  'use strict';

  var app = angular.module('contactsApp', []);

  app.controller('contactsController', function($scope, $http) {
  	 $scope.contacts = [];
    $http.get('http://localhost:3001/api/contacts')
      .then(function(response) {
        $scope.contacts = response.data;
        console.log($scope.contacts);
      });
    
    $scope.saveContact = function(contact) {
      $http.post('http://localhost:3001/api/contacts', contact)
        .then(function(response) {
          $scope.contacts.push(response.data);
          console.log(response.data);
      });
    };

  });
})();
