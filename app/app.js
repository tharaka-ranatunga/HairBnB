/**
 * Created by tharaka_ra on 6/30/2017.
 */
var login = angular.module('login',[]);
login.controller('logctrl', function($scope,$http){
            $scope.sample = false;

            $scope.change=function(){
                if(angular.equals($scope.password,$scope.confirm)){
                    $scope.sample = true;
                }else{
                    $scope.sample= false;
                }
            };
            $scope.submit = function(){
                var req = {
                    method: 'POST',
                    url: 'http://localhost:3000/insert',
                    data: {
                        first:$scope.first,
                        last:$scope.last,
                        email:$scope.email,
                        password:$scope.password
                    }
                };

                $http(req).then(function(){ console.log("yes")}, function(){console.log("no")});
            }


    });
