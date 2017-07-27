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
                            AuthService.Login(resData.data.first_name, resData.data.email, resData.data.token, resData.data.role, function (callback) {
                                $('#signin').modal('hide');
                                window.location.reload();
                            });
                        },function (resData) {
                            $scope.signin_message = resData.data.error

                        });
                };

            }
        }
    );