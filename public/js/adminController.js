"use strict;"

angular.module('appName')
.controller('adminController', function($scope,$http,movieService) {

	$scope.movieArray =[];

	movieService.getAll()
	.then( function(movies){
		if(movies) $scope.movieArray.push(...movies);
	})
	.catch( err => {
		console.log(err);
	});



	$scope.addOneMovie = function(movie){
		movieService.addOne(movie)
		.then( function(newMovie){
			if(newMovie) $scope.movieArray.push(newMovie);
		})
		.catch( err => {
			console.log(err);
		});
	}

	$scope.removeOneMovie = function(movie){
		let index = $scope.movieArray.indexOf(movie);
		movieService.removeOne(movie)
		.then( function(){
			$scope.movieArray.splice(index,1);
		})
		.catch( err => {
			console.log(err);
		});
	}

	//  assumes uuid that doesn't change on edit
	$scope.editOneMovie = function(editedMovie){
	console.log(editedMovie);
		movieService.editOne(editedMovie)
		.then( function(updatedMovie){
			console.log('edited');
		})
		.catch( err => {
			console.log(err);
		});
	}


});



