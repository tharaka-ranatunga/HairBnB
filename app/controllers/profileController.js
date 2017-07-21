myApp.controller('ProfileController',['$scope','$http','AuthService', function ($scope, $http,AuthService) {

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
            url: 'http://localhost:3000/createprofile',
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
                // if(resData.data.status=='fail'){
                //     $scope.exists = true;
                //
                // }else{
                //     $('#signin').modal('hide');
                //     window.location.reload();
                // }
            });
    };




}]);
