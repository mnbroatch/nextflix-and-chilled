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


app.controller('matchCtrl', function($scope, Beer, $stateParams, movieService) {
  // console.log($stateParams.output);
  $scope.loading=false;

  init();
  var placeholder = 'http://school4schools.com/blog/wp-content/plugins/lightbox/images/No-image-found.jpg';

  function init() {
    $scope.movie = $stateParams.output.movie;
    $scope.beer = $stateParams.output.beer.data.style || $stateParams.output.beer.data;

    $scope.weight = $stateParams.output.weight;

    if ($stateParams.output.beer.data.labels) {
      $scope.beerImage = $stateParams.output.beer.data.labels.large;
    } else {
      $scope.beerImage = placeholder;
    }

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
        $scope.beer = beer.style || beer;


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
      output.weight = $scope.weight;
      loaded = true;
      console.log(loaded);
      if (clicked) {
        $state.go('match', { output: output });
      }
    })



  $scope.getMatch = () => {
    console.log(loaded);
    if (loaded) {

      console.log(output);
      $state.go('match', { output: output });
    } else {
      clicked = true;



    }



  }



})
