"use strict;"

var app = angular.module('appName', ['ui.bootstrap','ui.router','xeditable']); 
app.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
	.state('home', {
		url: '/', 
		templateUrl: 'html/home.html', 
		controller: 'homeCtrl'
	})    

	.state('admin', {
		url: '/admin', 
		templateUrl: 'html/admin.html', 
		controller: 'adminCtrl'
	})   

	$urlRouterProvider.otherwise('/');

});

