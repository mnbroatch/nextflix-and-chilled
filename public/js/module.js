"use strict;"

var app = angular.module('appName', ['ui.bootstrap','ui.router','xeditable']); 
app.config(function($stateProvider, $urlRouterProvider){


    $stateProvider
      .state('admin', {url: '/admin', templateUrl: 'html/admin.html', controller: 'adminController'})


	.state('home', {
		url: '/', 
		templateUrl: 'html/home.html', 
		controller: 'homeCtrl',
		// params: {output: null}
	})   	

	.state('match', {
		url: '/match', 
		templateUrl: 'html/match.html', 
		controller: 'matchCtrl',
		params: {output: null}
	})    

	// .state('admin', {
	// 	url: '/admin', 
	// 	templateUrl: 'html/admin.html', 
	// 	controller: 'adminCtrl'
	// })   

	$urlRouterProvider.otherwise('/');

});

