/**
 * Created by tharaka_ra on 7/12/2017.
 */
angular
    .module('signUp')
    .component('signUp',{
        templateUrl:'../sign-up/sign-up.template.html',
        controller:function SignUpController($scope,$http) {
            $scope.exists = false;
            $scope.suc = false;
            $scope.yes = "sdf";
            $scope.email_error = false;
            this.tick = false;
            this.passw = false;
            this.change=function () {
                if(angular.equals(this.password,this.confirm)){
                    this.tick = true;
                }else{
                    this.tick= false;
                }
            };
            $scope.testt=function () {
                $scope.email_error = true;
            };
            this.pass=function () {
                this.passw = true;
            };
            this.submit=function () {
                var userRole;
                if((this.stylist&&this.salon)==1){
                    userRole=3;
                }else if(this.stylist==1){
                    userRole=2;
                }else{
                    userRole=1;
                }
                var req = {
                    method: 'POST',
                    url: 'http://localhost:3000/signup',
                    data: {
                        first: this.first,
                        last: this.last,
                        email: $scope.email,
                        password:this.password,
                        role:userRole,
                        promotion:this.promotion

                    }
                };
                $http(req).then(
                    function(resData){
                        if(resData.data.status=='fail'){
                            $scope.exists = true;

                        }else{
                            $('#signin').modal('hide');
                            window.location.reload();
                        }
                    });
            };
        }
    }
    );
