"use strict;"

let app = angular.module('appName');

app.controller('mainController', function($scope, Beer) {


  $scope.getBeer = () => {

    Beer.getRandomBeer() 
      .then(res => {
        $scope.beers = res;
      })
  }
});


app.controller('matchCtrl', function($scope, Beer, $stateParams) {

})


app.controller('homeCtrl', function($scope, Beer, movieService, $stateParams) {


  


})