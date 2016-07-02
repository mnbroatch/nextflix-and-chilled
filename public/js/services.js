"use strict;"

var app = angular.module('appName')
app.service('movieService', function($http){


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



});

