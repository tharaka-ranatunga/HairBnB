/**
 * Created by tharaka_ra on 8/9/2017.
 */
myApp.controller('EditController',
    ['$scope','$http','AuthService','$location',
        function ($scope,$http,AuthService,$location) {
            $scope.job_types = [{name: "Stylist", value: false}, {name: "Educator", value: false},
                {name: "Assistant", value: false}];

            $scope.skill_types = [{name: "Freeehand",value: false}, {name: "Razor",value: false},
                {name: "Shaving",value: false}, {name: "Scissor over comb",value: false}, {name: "Texturing",value: false},
                {name: "Clipper work",value: false}, {name: "Classics",value: false}, {name: "Dry cutting",value: false},
                {name: "Wig cutting",value: false}, {name: "Long hair",value: false}, {name: "Short hair",value: false},
                {name: "Makeup",value: false}, {name: "Hair coloring",value: false}, ];

            $scope.submitted = false;       //Error showing only after submit button clicked
            $scope.isComplete = false;      //Check all the fields are filled
            $scope.repass = false;          //Check password match only after user retype password
            $scope.des_error = false;       //Check account description is empty or not

            //-------------------------Show Success/Danger alert boxes
            $scope.success = false;
            $scope.danger = false;
            $scope.message = '';

            //-------------------------Show Sections
            $scope.password_reset_section = false;
            $scope.profile_reset_section = true;
            $scope.skills_jobtype_section = false;
            $scope.payment_section = false;

            //-------------------------Password Character Error
            $scope.new_password_chr_error = false;

            //Description character count
            $scope.desLength= 0;
            $scope.characters = 1000;
            $scope.chrLengthError = false;




            $scope.skills_jobtypes = function () {
                $scope.profile_reset_section = false;
                $scope.password_reset_section = false;
                $scope.skills_jobtype_section = true;
                $scope.payment_section = false;

                var user = AuthService.getUser();
                if(user){
                    $http({
                        method: "GET",
                        url: "http://localhost:3000/profile/getEditProfile"
                    }).then(function (resData){
                        console.log('Getting user saved information');
                        // console.log(resData);
                        var jobtypes = resData.data.jobtypes;
                        var skilltypes = resData.data.skilltypes;
                        var i=0;
                        for(i=0; i<$scope.job_types.length; i++){
                            $scope.job_types[i].value = false;
                        }
                        for(i=0; i<jobtypes.length; i++){
                            $scope.job_types[(jobtypes[i].job_id)-1].value = true;
                            $scope.job_types[(jobtypes[i].job_id)-1].price = jobtypes[i].price;
                        }
                        for(i=0; i<$scope.skill_types.length; i++){
                            $scope.skill_types[i].value = false;
                        }
                        for(i=0; i<skilltypes.length; i++){
                            $scope.skill_types[(skilltypes[i].skill_id)-1].value = true;
                        }
                    },function (error){
                        $location.path('/');
                        console.log('Error occurred: ' + error);
                    });

                }else{
                    $location.path('/');
                }

            }}
    ])

