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
                var req = {
                    method: 'POST',
                    url: 'http://localhost:3000/insert',
                    data: {
                        first: this.first,
                        last: this.last,
                        email: this.email,
                        password:this.password
                    }
                };
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
