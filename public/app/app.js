'use strict';


 angular.module('myApp', 
  ['ngRoute',
  'myApp.directives',
  'myApp.services',
  'myApp.controllers'
  ]).

//This configures the routes and associates each route with a view and a controller
config(['$routeProvider',function($routeProvider) {
// At the end of each route. You need to have a semi-colon
    // $routeProvider.when('/login',
    //         {
    //             controller: 'loginController',
    //             // put the login URL here
    //             templateUrl: 'public/app/particals/login.html'
    //         });

    $routeProvider.when('/',
      {
        controller: 'mainController',
        templateUrl: 'public/app/particals/main.html' 
      })
    $routeProvider.when('/login',
      {
        controller: 'loginController',
        templateUrl: 'public/app/particals/login1.html' 
      })
    $routeProvider.when('/activities',
      {
        controller: 'activivityController',
        templateUrl: 'public/app/particals/activity.html'
      });   
    $routeProvider.when('/assessments',
      {
        controller: 'assessmentController',
        templateUrl: 'public/app/particals/assessment.html'
      });
    $routeProvider.otherwise({ redirectTo: '/' });
}]);

