/**
 * Created by tharaka_ra on 7/14/2017.
 */
myApp.controller('MainController',['$scope','$http','AuthService', function ($scope, $http, AuthService) {
    $scope.authenticated = false;
    $scope.isStylist = false;
    $scope.user_salon = false;
    $scope.username = '';
    $scope.lastname = '';
    $scope.become = false;

    var user = AuthService.getUser();
    if (user) {
        $scope.username = user.first_name;
        $scope.last_name = user.last_name;
        $scope.useremail = user.email;
        $scope.user_salon=true;
    }

    $scope.$watch(AuthService.isLoginStatus, function (newValue) {
        $scope.authenticated = newValue;
    },true);

    $scope.$watch(AuthService.getStylist, function (newValue) {
        if (newValue){
            $scope.isStylist = true;
        }
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

    $http({
        method: "GET",
        url: "http://localhost:3000/profile/getProfileStatus"
    }).then(function (resData){
        AuthService.setStylist(true);
    },function (error){
        AuthService.setStylist(false);
    });
}]);