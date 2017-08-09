/**
 * Created by tharaka_ra on 7/28/2017.
 */
myApp.controller('ViewProfileController',
    ['$scope','$http','AuthService','$location','OrderService',
        function ($scope,$http,AuthService,$location, OrderService) {
            $scope.firstname = '';
            $scope.lastname = '';
            $scope.description = '';
            $scope.stylistId;

            $scope.skill1 = false; $scope.skill4 = false; $scope.skill7 = false; $scope.skill9 = false;
            $scope.skill2 = false; $scope.skill5 = false; $scope.skill8 = false; $scope.skill10 = false;
            $scope.skill3 = false; $scope.skill6 = false; $scope.skill11 = false;$scope.skill12 = false;$scope.skill13 = false;$scope.skill14 = false;

            $scope.type1 = false; $scope.type2 = false; $scope.type3 = false;
            $scope.price1 ; $scope.price2 ; $scope.price3 ;

            $scope.jobs = [{value:false, name:'Stylist', price:0.0},
                {value:false, name:'Educator', price:0.0},
                {value:false, name:'Assistant', price:0.0}];

            $scope.placeOrder = function (id) {
                var user = AuthService.getUser();
                OrderService.order($scope.stylistId, $scope.firstname+" "+$scope.lastname, $scope.jobs[0].value,$scope.jobs[1].value ,$scope.jobs[2].value,$scope.jobs[0].price,$scope.jobs[1].price,$scope.jobs[2].price);
                if(user) {
                    $location.path('/order/place').search({userid: id});
                }else{
                    $('#signin').modal('show');
                }
            };

            $scope.onInit = function () {
                var params = $location.search();
                var user_id = (params.userid);
                $scope.stylistId = user_id;
                $http({
                    method: "GET",
                    url: "http://localhost:3000/profile/getProfilePublic?id="+ user_id
                }).then(function (resData){
                    if(resData){
                        $scope.firstname = resData.data.user[0].firstname;
                        $scope.lastname = resData.data.user[0].lastname;
                        $scope.description = resData.data.stylist[0].description;
                        var jobtypeArr = resData.data.jobtypes[0];

                        for(var i=0; i<jobtypeArr.length; i++){
                            $scope.jobs[jobtypeArr[i].job_id-1].value = true;
                            $scope.jobs[jobtypeArr[i].job_id-1].price = jobtypeArr[i].price;
                        }
                        // for(var i=0; i<jobtypeArr.length; i++){
                        //     if(jobtypeArr[i].job_id===1){$scope.type1=true; $scope.price1 = jobtypeArr[i].price;}
                        //     if(jobtypeArr[i].job_id===2){$scope.type2=true; $scope.price2 = jobtypeArr[i].price;}
                        //     if(jobtypeArr[i].job_id===3){$scope.type3=true; $scope.price3 = jobtypeArr[i].price;}
                        // }
                        var skilltypeArr = resData.data.skilltypes[0];
                        for(var j=0; j<skilltypeArr.length; j++){
                            if(skilltypeArr[j].skill_id===1){$scope.skill1=true;}
                            if(skilltypeArr[j].skill_id===2){$scope.skill2=true;}
                            if(skilltypeArr[j].skill_id===3){$scope.skill3=true;}
                            if(skilltypeArr[j].skill_id===4){$scope.skill4=true;}
                            if(skilltypeArr[j].skill_id===5){$scope.skill5=true;}
                            if(skilltypeArr[j].skill_id===6){$scope.skill6=true;}
                            if(skilltypeArr[j].skill_id===7){$scope.skill7=true;}
                            if(skilltypeArr[j].skill_id===8){$scope.skill8=true;}
                            if(skilltypeArr[j].skill_id===9){$scope.skill9=true;}
                            if(skilltypeArr[j].skill_id===10){$scope.skill10=true;}
                            if(skilltypeArr[j].skill_id===11){$scope.skill11=true;}
                            if(skilltypeArr[j].skill_id===12){$scope.skill12=true;}
                            if(skilltypeArr[j].skill_id===13){$scope.skill13=true;}
                            if(skilltypeArr[j].skill_id===14){$scope.skill14=true;}
                        }
                    }
                },function (error){
                    if(error.status===504){
                        console.log('404 Not Found [id: ' + user_id);
                    }
                    console.log('Error on searching profile: ' + error);
                });
            }
        }
    ]);