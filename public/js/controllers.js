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


app.controller('matchCtrl', function($scope, Beer, $stateParams, movieService, $state) {
	// console.log($stateParams.output);
	var placeholder = 'http://vignette3.wikia.nocookie.net/lego/images/a/ac/No-Image-Basic.png/revision/latest?cb=20130819001030';

	if ($stateParams.output === null) {
		$state.go('home');
	}
	$scope.loading = false;

	init();

	function init() {

		$scope.movie = $stateParams.output.movie;
		$scope.beer = $stateParams.output.beer.data;
		console.log('   $scope.beer', $scope.beer);
		$scope.beer.description = $scope.beer.description || $scope.beer.style.description;

		$scope.weight = $stateParams.output.weight;

		if ($scope.beer.labels) {
			$scope.beerImage = $scope.beer.labels.large;
		} else {
			$scope.beerImage = placeholder;
		}
		console.log($scope.beerImage);

		$scope.desiredBAC = Beer.calculateDesiredBAC($scope.movie.imdbRating);
		$scope.adjustedABV = $scope.beer.abv/100 || .05;
		$scope.ABVToDisplay = $scope.beer.abv || "Unknown ";
		$scope.numberBeers = Beer.calculateNumberDrinks($scope.adjustedABV, $stateParams.output.weight, $stateParams.output.sex, +$scope.desiredBAC, +$scope.movie.runtime);


	}
	let moviePromise = movieService.getRandom();
	let beerPromise = Beer.getRandomBeer();

	$scope.reRoll = () => {
		$scope.loading = true;

		Promise.all([moviePromise, beerPromise])
		.then((res) => {
			let movie = res[0].data;
			let beer = res[1].data.data;
			console.log(beer);
			$scope.movie = movie;
			$scope.beer = beer;
			$scope.beer.description = beer.description || beer.style.description;

			$scope.desiredBAC = Beer.calculateDesiredBAC($scope.movie.imdbRating);
			$scope.adjustedABV = $scope.beer.abv/100 || .05;
			$scope.ABVToDisplay = $scope.beer.abv || "Unknown ";
			$scope.numberBeers = Beer.calculateNumberDrinks($scope.adjustedABV, $stateParams.output.weight, $stateParams.output.sex, +$scope.desiredBAC, +$scope.movie.runtime);

			// output.weight = $scope.weight;
			console.log(beer.labels);
			if (beer.labels) {
				$scope.beerImage = beer.labels.large;
			} else {
				$scope.beerImage = placeholder;
			}

			console.log($scope.beerImage);
			$scope.loading = false;
			moviePromise = movieService.getRandom();
			beerPromise = Beer.getRandomBeer();
		})

	};

	$scope.restart = () => {
		$state.go('home');
	}
})


app.controller('homeCtrl', function($scope, $state, Beer, movieService, $stateParams) {
	let output = {};
	let movie;
	let beer;
	let loaded = false;
	let clicked = false;

	let moviePromise = movieService.getRandom()

	let beerPromise = Beer.getRandomBeer()

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
