/**
 * Created by tharaka_ra on 7/17/2017.
 */
myApp.config(['$routeProvider', function($routeProvider){

    $routeProvider
    .when("/profile", {
        //Profile Page
        templateUrl : "profile.html"
    })
        .when("/", {
            //Search Page
            templateUrl : "home.html"
        })
        .when("/create", {
            //Crate Profile
            templateUrl : "create_profile.html"
        })
    

}]);