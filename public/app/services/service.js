angular.module('myApp.services', [])

	// super simple service
	// each function returns a promise object 
	.factory('userAuth', function($http) {
		return {
			// The get login I do not quite see the usage
			getLogin : function() {
				return $http.get('/loginREST');
			},
			// Used to authenticate use
			postLogin : function(userLoginInfo) {
				return $http.post('/loginREST', userLoginInfo);
			},

			// This one to register information
			postRegister : function(userRegisterInfo) {
				return $http.post('/register' + userRegisterInfo);
			}
		}
	});