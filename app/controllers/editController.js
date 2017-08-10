/**
 * Created by tharaka_ra on 8/9/2017.
 */


myApp.controller('EditController',
    ['$scope','$http','AuthService','$location',
        function ($scope,$http,AuthService,$location) {
            $scope.job_types = [{name: "Stylist", value: false}, {name: "Educator", value: false},
                {name: "Assistant", value: false}];

            $scope.skill_types = [{name: "Barber",value: false}, {name: "Freeehand",value: false}, {name: "Razor",value: false},
                {name: "Shaving",value: false}, {name: "Scissor over comb",value: false}, {name: "Texturing",value: false},
                {name: "Clipper work",value: false}, {name: "Classics",value: false}, {name: "Dry cutting",value: false},
                {name: "Wig cutting",value: false}, {name: "Long hair",value: false}, {name: "Short hair",value: false},
                {name: "Makeup",value: false}, {name: "Hair coloring",value: false}, ];

            $scope.submitted = false;       //Error showing only after submit button clicked
            $scope.isComplete = false;      //Check all the fields are filled

            //-------------------------Show Success/Danger alert boxes
            $scope.success = false;
            $scope.danger = false;
            $scope.message = '';




            $scope.skills_jobtypes = function () {

                var user = AuthService.getUser();
                if(user){
                    $http({
                        method: "GET",
                        url: "http://localhost:3000/profile/getEditProfile"
                    }).then(function (resData){
                        console.log('Getting user saved information');
                        console.log(resData);
                        var jobtypes = resData.data.jobtypes;
                        var skilltypes = resData.data.skilltypes;
                        $scope.description = resData.data.stylist[0].description;
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

            };


            // $scope.onInit = function () {
            //     $scope.success = false;
            //     $scope.danger = false;
            //     $http({
            //         method: "GET",
            //         url: "http://localhost:3000/profile/getEditProfile"
            //     }).then(function (resData){
            //         //Profile Found
            //         $scope.accDescription = true;
            //         $scope.accSkills = true;
            //
            //         $http({
            //             method: "GET",
            //             url: "http://localhost:3000/profile/getEditProfile"
            //         }).then(function (resData) {
            //             //Profile Found
            //
            //             $scope.characters = (1000-$scope.description.length);
            //         },function (error) {
            //             console.log('Sever error occurred, redirecting to home');
            //             $location.path('/');
            //         });
            //     },function (error){
            //         if(error.status===404){
            //             //No Profile found
            //             $scope.accDescription = false;
            //             $scope.accSkills = false;
            //         }else {
            //             console.log('Sever connection error occurred, redirecting to home');
            //             $location.path('/');
            //         }
            //     });
            // };

            // $scope.saveProfile = function () {
            //     $scope.des_error = false;
            //     if($scope.description.length===0 || typeof $scope.description==='undefined'){
            //         $scope.des_error = true;
            //     }
            //     if(!($scope.des_error) && !($scope.chrLengthError)) {
            //         $http({
            //             method: "POST",
            //             url: "http://localhost:3000/profile/updateProfile",
            //             data: {description: $scope.description}
            //         }).then(function (resData) {
            //             $scope.success = true;
            //             $scope.message = 'Profile updated successfully!';
            //         }, function (error) {
            //             console.log('Error: ' + error);
            //         });
            //     }
            // };


            $scope.saveSkillsJobTypes = function () {
                var i;
                $scope.job_type_err = true;
                for(i=0; i<$scope.job_types.length; i++){
                    if($scope.job_types[i].value){$scope.job_type_err = false;break;}
                }
                $scope.skill_error = true;
                for(i=0; i<$scope.skill_types.length; i++){
                    if($scope.skill_types[i].value){$scope.skill_error = false;break;}
                }

                if(!($scope.job_type_err) && !($scope.skill_error)){
                    // console.log('Can Update');
                    var skill_types_arr = [];
                    for(i=0; i<$scope.skill_types.length; i++){
                        if($scope.skill_types[i].value){skill_types_arr.push(i+1);}
                    }
                    var job_types_arr = [];
                    for(i=0; i<$scope.job_types.length; i++){
                        if($scope.job_types[i].value){
                            var tmp = [];
                            tmp.push(i+1, $scope.job_types[i].price);
                            job_types_arr.push(tmp);
                        }
                    }
                    $http({
                        method: "POST",
                        url: "http://localhost:3000/profile/updateProfile",
                        data: {job_types_arr: job_types_arr, skill_types_arr: skill_types_arr, description: $scope.description}
                    }).then(function (resData){
                        // console.log(resData);
                        if(resData.status===200){
                            $scope.success = true;
                            $scope.message = "Profile updated successfully!";
                            $scope.danger = false;
                        }
                    },function (error){
                        $scope.success = false;
                        $scope.danger = true;
                        $scope.message = "Server Error";
                    });
                }
            };

        }
    ]);

