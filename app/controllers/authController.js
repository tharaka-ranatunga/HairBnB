/**
 * Created by tharaka_ra on 7/14/2017.
 */
myApp.controller('MainController',['$scope','$http','AuthService', function ($scope, $http, AuthService) {
    $scope.authenticated = false;
    $scope.user_salon = false;

    var user = AuthService.getUser();
    if (user) {
        $scope.username = user.first_name;
        $scope.useremail = user.email;
        if(user.role == 1){
            $scope.user_salon=true;
        }
    }else {
        $scope.username = '';
    }

    $scope.$watch(AuthService.isLoginStatus, function (newValue) {
        $scope.authenticated = newValue;
    },true);

    $scope.sign_out = function () {
        AuthService.Logout();
    };





}]);

//Run when refresh the page
myApp.run(['$localStorage','AuthService', '$http',function ($localStorage,AuthService, $http) {
    if ($localStorage.currentUser) {
        AuthService.setIsLogin(true);
        $http.defaults.headers.common.Authorization = 'JWT ' + $localStorage.currentUser.token;
    }
}]);