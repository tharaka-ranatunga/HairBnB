/**
 * Created by tharaka_ra on 7/17/2017.
 */
myApp.config(['$routeProvider', function($routeProvider){
    console.log('asdasdasdasd');
    $routeProvider
    .when("/profile", {
        //Search Page
        templateUrl : "profile.html"
    })

}]);