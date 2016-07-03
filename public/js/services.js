"use strict;"

app = angular.module('appName');

app.service('movieService', function($http){


	this.getRandom = () => {
		return $http({
			method:'GET',
			url: '/api/movies/random'
		})
		.catch(err => {
			console.log('err: ', err);
		});
	}

	this.getAll = () => {
		return $http({
			method:'GET',
			url: '/api/movies'
		})
		.then( res => {
			if (res.data.length)
				return res.data;
		})
		.catch(err => {
			console.log('err: ', err);
		});
	}

	this.addOne = (movie) => {
		return $http({
			method:'POST',
			url: '/api/movies',
			data: movie
		})
		.then( res => {
			if (res.data){
				console.log(res.data);
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}

	this.removeOne = (movie) => {
		return $http({
			method:'DELETE',
			url: '/api/movies/' + movie._id
		});
	}

	this.editOne = (movie) => {
		return $http({
			method:'PUT',
			url: '/api/movies/' + movie._id,
			data: movie
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}


});

app.service('Beer', function($http) {

	this.getRandomBeer = () => {
		return $http.get('/api/beers')
		.catch(err => {
			console.log(err);
		})
	}

	this.calculateGramsToDrink = function(weightLbs,gender,desiredBAC,runtime){
		let genderConstant = (gender == "male")? .68 : .55 ;
		let adjustedBAC = desiredBAC + runtime / 60 * .015;
		return adjustedBAC * (weightLbs / .0022046) / (100 * genderConstant);
	}

	this.calculateNumberDrinks = function (abv, weight,gender,desiredBAC,runtime){
	console.log(abv,weight,gender,desiredBAC,runtime);
		let gramsToDrink = this.calculateGramsToDrink(weight,gender,desiredBAC,runtime);
		let fiveOzBeers = gramsToDrink / 14;
		return fiveOzBeers * (.05/abv);
	}

	this.calculateDesiredBAC = function(movieScore){
		return .008 * (10 - movieScore) + .04;
	}

});

