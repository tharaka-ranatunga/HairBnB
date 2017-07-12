/**
 * Created by tharaka_ra on 7/12/2017.
 */
angular
    .module('signUp')
    .component('signUp',{
        templateUrl:'../sign-up/sign-up.template.html',
        controller:function SignUpController($scope,$http) {
            $scope.exists = false;
            this.tick = false;
            this.change=function () {
                if(angular.equals(this.password,this.confirm)){
                    this.tick = true;
                }else{
                    this.tick= false;
                }
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
                    url: 'http://localhost:3000/insert',
                    data: {
                        first: this.first,
                        last: this.last,
                        email: this.email,
                        password:this.password,
                        role:userRole,
                        promotion:this.promotion

                    }
                };
                console.log(this.promotion)
                $http(req).then(
                    function(resData){
                        if(resData.data.status=='fail'){
                            $scope.exists = true;
                            console.log(resData.data.status);

                        }else{
                            $scope.exists = false;
                        }


                    });
            };
        }
    }
    );
