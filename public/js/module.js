"use strict;"

var app = angular.module('appName', ['ui.bootstrap','ui.router','xeditable']); 
app.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('main', {url: '/', templateUrl: 'html/main.html', controller: 'mainController'})
      .state('admin', {url: '/admin', templateUrl: 'html/admin.html', controller: 'adminController'})

    $urlRouterProvider.otherwise('/');

});

