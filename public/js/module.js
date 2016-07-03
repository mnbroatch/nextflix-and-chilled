"use strict;"

var app = angular.module('appName', ['ui.bootstrap','ui.router','xeditable', 'ngAnimate', 'anim-in-out']); 
app.config(function($stateProvider, $urlRouterProvider){


	$stateProvider
	.state('admin', {url: '/admin', templateUrl: 'html/admin.html', controller: 'adminController'})


	.state('home', {
		url: '/', 
		templateUrl: 'html/home.html', 
		controller: 'homeCtrl',
	})   	

	.state('match', {
		url: '/match', 
		templateUrl: 'html/match.html', 
		controller: 'matchCtrl',
		params: {output: null}
	})    

		$urlRouterProvider.otherwise('/');

});

