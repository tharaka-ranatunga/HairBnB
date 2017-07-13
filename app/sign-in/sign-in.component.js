/**
 * Created by tharaka_ra on 7/12/2017.
 */
angular
    .module('signIn')
    .component('signIn',{
            templateUrl:'../sign-in/sign-in.template.html',
            controller:function SignUpController() {
                this.submit=function () {
                    var req = {
                        email: this.email,
                        password:this.password,
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