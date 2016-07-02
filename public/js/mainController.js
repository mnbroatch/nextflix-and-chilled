"use strict;"

angular.module('appName')
.controller('mainController', function($scope, Beer) {


  $scope.getBeer = () => {

    Beer.getRandomBeer() 
      .then(res => {
        $scope.beers = res;
      })
  }
});



