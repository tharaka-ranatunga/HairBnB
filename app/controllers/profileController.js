myApp.controller('ProfileController',['$scope','$http','AuthService', function ($scope, $http,AuthService) {

    $scope.sub=function () {
        var user = AuthService.getUser();
        var email = user.email;
        var description = $scope.description;
        var stylistfee = $scope.stylistfee;
        var educatorfee = $scope.educatorfee;
        var assistantfee = $scope.assistantfee;
        console.log(email, description, stylistfee, educatorfee, assistantfee);
        var req = {
            method: 'POST',
            url: 'http://localhost:3000/createprofile',
            data: {
                description: description,
                skills: [2,3],
                job_types: [3,4],
                payment_email:"tharaka@gmail.com",
                price_job_types:[2,3]

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
