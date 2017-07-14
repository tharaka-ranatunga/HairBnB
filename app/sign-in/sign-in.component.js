/**
 * Created by tharaka_ra on 7/12/2017.
 */
angular
    .module('signIn')
    .component('signIn',{
            templateUrl:'../sign-in/sign-in.template.html',
            controller:function SignInController($scope,$http,AuthService) {
                this.change=function () {
                    $scope.signin_message = ""
                };
                this.submit=function () {
                    var req = {
                        method: 'POST',
                        url: 'http://localhost:3000/signin',
                        data: {
                            email: this.email,
                            password:this.password
                        }
                    };
                    $http(req).then(
                        function(resData){
                            AuthService.Login(resData.data.email, resData.data.token, function (callback) {
                                console.log(callback);
                            });
                            console.log(resData.data.token)
                        },function (resData) {
                            $scope.signin_message = resData.data

                        });
                };

            }
        }
    );