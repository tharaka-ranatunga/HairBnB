/**
 * Created by tharaka_ra on 7/12/2017.
 */
angular
    .module('signIn')
    .component('signIn',{
            templateUrl:'../sign-in/sign-in.template.html',
            controller:function SignInController($http) {
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
                        function(){
                            console.log("success");
                        });
                };
            }
        }
    );