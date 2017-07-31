myApp.controller('ProfileController',['$scope','$http','AuthService','$location', function ($scope, $http,AuthService,$location) {
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.email = '';
    $scope.description = '';

    $scope.skill1 = false; $scope.skill4 = false; $scope.skill7 = false; $scope.skill9 = false;
    $scope.skill2 = false; $scope.skill5 = false; $scope.skill8 = false; $scope.skill10 = false;
    $scope.skill3 = false; $scope.skill6 = false; $scope.skill11 = false;

    $scope.type1 = false; $scope.type2 = false; $scope.type3 = false;

    $scope.onInit = function () {
        var user = AuthService.getUser();
        if(user){

            $http({
                method: "GET",
                url: "http://localhost:3000/profile/getProfile"
            }).then(function (resData){
                console.log('Server response :');
                console.log(resData);
                $scope.bio = resData.data.description;
                for(var i=0; i<resData.data.job_types.length; i++){
                    if(resData.data.job_types[i]===1){$scope.type1=true; $scope.price1=resData.data.price[i];}
                    if(resData.data.job_types[i]===2){$scope.type2=true; $scope.price2=resData.data.price[i];}
                    if(resData.data.job_types[i]===3){$scope.type3=true; $scope.price3=resData.data.price[i];}
                }


                for(var j=0; j<resData.data.skills.length; j++){
                    if(resData.data.skills[j]===1){$scope.skill1=true;}
                    if(resData.data.skills[j]===2){$scope.skill2=true;}
                    if(resData.data.skills[j]===3){$scope.skill3=true;}
                    if(resData.data.skills[j]===4){$scope.skill4=true;}
                    if(resData.data.skills[j]===5){$scope.skill5=true;}
                    if(resData.data.skills[j]===6){$scope.skill6=true;}
                    if(resData.data.skills[j]===7){$scope.skill7=true;}
                    if(resData.data.skills[j]===8){$scope.skill8=true;}
                    if(resData.data.skills[j]===9){$scope.skill9=true;}
                    if(resData.data.skills[j]===10){$scope.skill10=true;}
                    if(resData.data.skills[j]===11){$scope.skill11=true;}
                    if(resData.data.skills[j]===12){$scope.skill12=true;}
                    if(resData.data.skills[j]===13){$scope.skill13=true;}
                    if(resData.data.skills[j]===14){$scope.skill14=true;}
                }
            },function (error){
                $location.path('/');
                console.log('Error occurred: ' + error);
            });

        }else{
            $location.path('/');
        }
    };

    $scope.sub=function () {
        var user = AuthService.getUser();
        var email = user.email;
        var description = $scope.description;
        var job_types = [];
        var price_job_types = [];
        var skills = [];

        var description = $scope.description;

        if($scope.job1){job_types.push(1);price_job_types.push($scope.price1);}
        if($scope.job2){job_types.push(2);price_job_types.push($scope.price2);}
        if($scope.job3){job_types.push(3);price_job_types.push($scope.price3);}

        if($scope.skill1){skills.push(1);}
        if($scope.skill2){skills.push(2);}
        if($scope.skill3){skills.push(3);}
        if($scope.skill4){skills.push(4);}
        if($scope.skill5){skills.push(5);}
        if($scope.skill6){skills.push(6);}
        if($scope.skill7){skills.push(7);}
        if($scope.skill8){skills.push(8);}
        if($scope.skill9){skills.push(9);}
        if($scope.skill10){skills.push(10);}
        if($scope.skill11){skills.push(11);}
        if($scope.skill12){skills.push(12);}
        if($scope.skill13){skills.push(13);}
        if($scope.skill14){skills.push(14);}
        var req = {
            method: 'POST',
            url: 'http://localhost:3000/profile/createProfile',
            data: {
                description: description,
                skills: skills,
                job_types: job_types,
                payment_email:"tharaka@gmail.com",
                price_job_types: price_job_types

            }
        };
        $http(req).then(
            function(resData){
                console.log(resData);
                $location.path('/profile');

            });
    }
}]);
