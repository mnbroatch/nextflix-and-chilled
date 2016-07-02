"use strict;"

var app = angular.module('appName', ['ui.bootstrap','ui.router','xeditable']); 
app.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('state1', {url: '/', templateUrl: 'html/state1.html', controller: 'state1Controller'})

    $urlRouterProvider.otherwise('/');

});

