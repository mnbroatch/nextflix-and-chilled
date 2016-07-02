"use strict;"

app = angular.module('appName');

app.controller('mainController', function($scope, Beer) {


  $scope.getBeer = () => {

    Beer.getRandomBeer() 
      .then(res => {
        $scope.beers = res;
      })
  }
});


app.controller('matchCtrl', function($scope, Beer, $stateParams) {
  console.log($stateParams.output);

})


app.controller('homeCtrl', function($scope, $state, Beer, movieService, $stateParams) {
	let output = {};
  let movie;
  let beer;

    movieService.getRandom()
    .then((res) => {
      movie = res.data;
      // console.log('movie', res.data);
      // $state.go('match', {output: output});
      return Beer.getRandomBeer();
    })
    .then((res) => {
      beer = res.data;
      // console.log('beer and movie', output);
       // $state.go('match', {output: output});


    })


	$scope.getMatch = () => {
    if(beer && movie) {
      output.movie = movie;
      output.beer = beer;
      console.log(output);

      $state.go('match', {output: output});

    }
	}
  


})