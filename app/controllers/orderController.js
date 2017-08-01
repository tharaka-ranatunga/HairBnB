/**
 * Created by tharaka_ra on 8/1/2017.
 */
myApp.controller('OrderController',
    ['$scope','$http','AuthService','$location','OrderService',
        function ($scope,$http,AuthService,$location, OrderService) {
            $scope.job_types_arr = [{id: 1, name:"Stylist", value: false, price:0}, {id: 2, name:"Educator",value: false, price:0}, {id: 3, name:"Assistant",value: false, price:0}];

            $scope.type1; $scope.type2; $scope.type3;
            $scope.price1 ; $scope.price2 ; $scope.price3 ;

            $scope.onInit = function(){
                var stylist = OrderService.getStylist();
                if(stylist){
                    $scope.job_types_arr[0].value = stylist.job.job1;
                    $scope.job_types_arr[1].value = stylist.job.job2;
                    $scope.job_types_arr[2].value = stylist.job.job3;
                    $scope.job_types_arr[0].price = stylist.price.price1;
                    $scope.job_types_arr[1].price = stylist.price.price2;
                    $scope.job_types_arr[2].price = stylist.price.price3;
                }
                console.log(stylist.job.job1);
            };

        }
    ]);