'use strict';

angular.module('myApp.controllers', [])
.controller('mainController', ['$scope', '$rootScope' , function($scope) {
	init();
	function init(){

  
	$scope.introText = 'Online practice and assessments for fine motor skills';
	$scope.about = 'Leaprapy is an web application which interacts with the Leap Motion.\
          Consumers will practice different motor skills through some practices in the web site.\
          Moreover, the website provides users with some assessment where users can assess their motor skills.\
          Consumers can view their assessment report in the reports section.';
    $scope.contact = 'Feel free to email us to provide some feedback on our exercise practices. If \
          there are some activities or assessments that you want to recommend, please contact us directly.';
      };
}])
.controller('loginController', function($scope, $http ,$location, $routeParams, userAuth, $rootScope){
	  $scope.modalShown = false;

    // $scope.formAction = '/login';
    // $scope.formMethod = 'POST';
  	$scope.toggleModal = function() {
      	$scope.modalShown = !$scope.modalShown;
    };
    
    $scope.loginSubmit = function(){
      // I can access the username and password through
         // construct an HTTP request
         $scope.userLoginCredentials = {
          username:   $scope.customerUsername,
          password:   $scope.customerPassword
         }
         $scope.test = 1;
         $scope.test ++;
         $scope.loading = true;

         // Store the data to the function
         userAuth.postLogin($scope.userLoginCredentials)
          .success(function(user, message){
              $scope.loading = false;
              if (user != null){
                //$rootScope.userData = user;
                window.location = "http://localhost:3000/";
              }
              else{
                $scope.message = message; 

              } 
              $scope.userLoginCredentials = {};
          });



    };
})
.controller('activivityController', ['$scope', function($scope){
  // Download the picture from the database
  // $http.get(...)
  // Store the desscription of the activities here
  $scope.slingshot = "Using your hand to pickup a ball and throw at the target;\
                  Throw the ball to the target by releasing your hand;\
                  You will recive a score at the end of the activity;"
  $scope.targetShooter = "Shoot some targets by using your hand as the gun;\
                    Create a gun using your left or right hand, point the gun to the screen;\
                    Trigger the hand by touching your thumb to your hand;"
  $scope.palmSphere = "Open and close your hand to manipulate a sphere."
}])
.controller('assessmentController', ['$scope', function($scope){
  // Download the picture from the database
  // $http.get(...)
  // Store the desscription of the assessments here 
  $scope.point2point = "Point 2 Point is an assessment where user will link two seperate\
                  points using their fingers. There are some calculations will be performed on \
                  the assessments. Base on these calculations, we can determind their level of \
                  accuracy which is shown in the report section";
}])
.controller('navController', function($scope, $http, $rootScope, $routeParams, userAuth) {
  

    $scope.userAuthenticated = false;
    
     userAuth.getLogin().success(function(user){
      $scope.user = user;
    });
 
  
  if ($scope.users != null)
    {
      $scope.userAuthenticated = true;
    }
})
;