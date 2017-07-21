/**
 * Created by tharaka_ra on 7/17/2017.
 */
myApp.config(['$routeProvider', function($routeProvider){

    $routeProvider

        .when("/", {
            //Search Page
            templateUrl : "home.html"
        })

        .when("/profile/create", {
            //Profile Create Page
            templateUrl : "create_profile.html",
            controller: 'MainController',
            resolve:{
                init :function(AuthService, $location, $http){
                    if(AuthService.getUser()===null){
                        console.log('Unauthorized url request');
                        $location.path('/');
                    }else{
                        $http({
                            method: "GET",
                            url: "http://localhost:3000/getProfile"
                        }).then(function (resData){
                            console.log('Return Data: ' + resData);
                            $location.path('/profile');
                        },function (error){
                            if(error.status===404){
                                $location.path('/profile/create');
                                console.log('No profile found for user, creating now');
                            }else {
                                console.log('Sever connection error occurred, redirecting to home');
                                $location.path('/');
                            }
                        });
                    }
                }
            }
        })
        .when("/profile", {
            //Profile View Page [Edit]
            templateUrl : "profile.html",
            controller: 'MainController',
            resolve:{
                init :function(AuthService, $location, $http){
                    if(AuthService.getUser()===null){
                        console.log('Unauthorized url request');
                        $location.path('/');
                    }else{
                        $http({
                            method: "GET",
                            url: "http://localhost:3000/getProfileStatus"
                        }).then(function (resData){
                            console.log('Server status [/profile]: ' + resData.status);
                        },function (error){
                            if(error.status===404){
                                $location.path('/profile/create');
                                console.log('No profile found for user, creating now');
                            }else {
                                console.log('Sever connection error occurred, redirecting to home');
                                $location.path('/');
                            }
                        });
                    }
                }
            }
        })



}]);