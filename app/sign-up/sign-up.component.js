/**
 * Created by tharaka_ra on 7/12/2017.
 */
angular
    .module('signUp')
    .component('signUp',{
        templateUrl:'../sign-up/sign-up.template.html',
        controller:function SignUpController($scope,$http, AuthService) {
            $scope.exists = false;
            $scope.emailInvalid = false;
            $scope.passwordInvalid = false;
            $scope.suc = false;
            $scope.email_error = false;
            $scope.minLength = 5;
            this.tick = false; // user already exists
            $scope.passw = false;
            $scope.firstNameValid = false;  //firstname is entered
            $scope.lastNameValid = false;   //lastname is entered
            $scope.emailValid = false;      //email is validated
            $scope.passwordValid = false;   //password is valid
            $scope.passwordMatching = false; // password matching
            $scope.registerButton = true ;


            this.change=function () {       //check password and confirmed password matching
                if(angular.equals(this.password,this.confirm)){
                    this.tick = true;
                    $scope.passwordMatching = true;
                }else{
                    this.tick= false;
                    $scope.passwordMatching = false;
                }
            };

            this.validation = function () {

                if(!(this.first === undefined)){
                    if(this.first.length>0){
                        $scope.firstNameValid = true;
                    }else{
                        $scope.firstNameValid = false;
                    }
                }
                if(!(this.last === undefined)){
                    if(this.last.length>0){
                        $scope.lastNameValid = true;
                    }else{
                        $scope.lastNameValid = false;
                    }
                }
                if(!(this.email === undefined)){
                    if(this.email.length>0){
                        $scope.emailValid = true;
                    }else{
                        $scope.emailValid = false;
                    }
                }
                if(!(this.password === undefined)){
                    if(this.password.length>=5){
                        $scope.passwordValid = true;
                        $scope.passw = true;
                    }else{
                        $scope.passw = false;
                        $scope.passwordValid = false;
                    }
                }

            }


            $scope.testt=function () {
                $scope.email_error = true;
            };
            this.pass=function () {

            };
            this.submit=function () {
                var req = {
                    method: 'POST',
                    url: 'http://localhost:3000/signup',
                    data: {
                        first: this.first,
                        last: this.last,
                        email: this.email,
                        password:this.password,
                        promotion:this.promotion

                    }
                };
                $http(req).then(
                    function(resData){
                        AuthService.Login(resData.data.user_id, resData.data.first_name, resData.data.last_name, resData.data.email, resData.data.token, function (callback) {
                            $('#signup').modal('hide');
                            window.location.reload();
                        });
                    },function (resData) {
                        if (resData.data.error === "Email not valid"){
                            $scope.emailInvalid = true;
                            $scope.exists = false;
                            $scope.passwordInvalid = false;
                        }else if(resData.data.error === "Password not valid"){
                            $scope.emailInvalid = false;
                            $scope.exists = false;
                            $scope.passwordInvalid = true;
                        }else if(resData.data.error === "User already exist"){
                            $scope.emailInvalid = false;
                            $scope.exists = true;
                            $scope.passwordInvalid = false;
                    }
                });
            };
        }
    }
    );
