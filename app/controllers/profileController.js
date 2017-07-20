myApp.controller('ProfileController',['$scope','$http','AuthService', function ($scope, $http,AuthService) {

    $scope.sub=function () {
        var user = AuthService.getUser();
        var email = user.email;
        var description = $scope.description;
        var stylistfee = $scope.stylistfee;
        var educatorfee = $scope.educatorfee;
        var assistantfee = $scope.assistantfee;
        console.log(email, description, stylistfee, educatorfee, assistantfee);
        // var req = {
        //     method: 'POST',
        //     url: 'http://localhost:3000/signup',
        //     data: {
        //         first: this.first,
        //         last: this.last,
        //         email: this.email,
        //         password:this.password,
        //         role:userRole,
        //         promotion:this.promotion
        //
        //     }
        // };
        // $http(req).then(
        //     function(resData){
        //         if(resData.data.status=='fail'){
        //             $scope.exists = true;
        //
        //         }else{
        //             $('#signin').modal('hide');
        //             window.location.reload();
        //         }
        //     });
    };




}]);
