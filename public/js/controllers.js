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


app.controller('matchCtrl', function($scope, Beer, $stateParams, movieService,$state) {
  // console.log($stateParams.output);

  if($stateParams.output === null) {
    $state.go('home');
  }
  $scope.loading=false;

  init();
  var placeholder = 'http://vignette3.wikia.nocookie.net/lego/images/a/ac/No-Image-Basic.png/revision/latest?cb=20130819001030';

  function init() {

    $scope.movie = $stateParams.output.movie;
    $scope.beer = $stateParams.output.beer.data;
    $scope.beer.description = $scope.beer.description || $scope.beer.style.description;

    $scope.weight = $stateParams.output.weight;

    if ($scope.beer.labels) {
      $scope.beerImage = $scope.beer.labels.large;
    } else {
      $scope.beerImage = placeholder;
    }

    $scope.numberBeers = Beer.calculateBeersToDrink($stateParams.output.weight, $stateParams.output.sex,$scope.movie.runtime,+$scope.movie.imdbRating,+$scope.beer.abv);

  }
  let moviePromise = movieService.getRandom();
  let beerPromise = Beer.getRandomBeer();


  $scope.reRoll = () => {
    $scope.loading = true;

    Promise.all([moviePromise, beerPromise])
      .then((res) => {
        let movie = res[0].data;
        // debugger;
        let beer = res[1].data.data;
        console.log(beer);
        $scope.movie = movie;
        $scope.beer = beer;
        $scope.beer.description = beer.description || beer.style.description;

        $scope.numberBeers = Beer.calculateBeersToDrink($stateParams.output.weight, $stateParams.output.sex,$scope.movie.runtime,+$scope.movie.imdbRating,+$scope.beer.abv);
        // output.weight = $scope.weight;
        if (beer.labels) {
          $scope.beerImage = beer.labels.large;
        } else {
          $scope.beerImage = placeholder;
        }
        $scope.loading = false;
        moviePromise = movieService.getRandom();
        beerPromise = Beer.getRandomBeer();
      })


  }



})


app.controller('homeCtrl', function($scope, $state, Beer, movieService, $stateParams) {
  let output = {};
  let movie;
  let beer;
  let loaded = false;
  let clicked = false;
  // $scope.$watch('loaded', function(newValue, oldValue) {
  //   // debugger;
  //   console.log('jfdslkaj')
  //   if (newValue !== oldValue) {
  //     console.log('changes!')
  //     if (clicked) {
  //       output.movie = movie;
  //       output.beer = beer;
  //       console.log(output);
  //       $state.go('match', { output: output });

  //     }
  //   }
  // })


  let moviePromise = movieService.getRandom()
    //   .then((res) => {
    //   movie = res.data;
    //   // console.log('movie', res.data);
    //   // $state.go('match', {output: output});
    // })

  let beerPromise = Beer.getRandomBeer()
    //   .then((res) => {
    //   beer = res.data;
    //   // console.log('beer and movie', output);
    //    // $state.go('match', {output: output});
    // })


  Promise.all([moviePromise, beerPromise])
    .then((res) => {

      output.movie = res[0].data;
      output.beer = res[1].data;
      loaded = true;
      console.log(loaded);
      if (clicked) {
        $state.go('match', { output: output });
      }
    })



  $scope.getMatch = () => {
     output.weight = $scope.weight;
      output.sex = $scope.sex;
    console.log(loaded);
    if (loaded) {

      console.log(output);
      $state.go('match', { output: output });
    } else {
      clicked = true;



    }



  }



})
