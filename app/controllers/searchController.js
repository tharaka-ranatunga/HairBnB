/**
 * Created by tharaka_ra on 7/27/2017.
 */
myApp.controller('SearchController',
    ['$scope','$http','AuthService','$location',
        function ($scope,$http,AuthService,$location) {

            $scope.job_types = [{name: "Select All", value: false},{name: "Stylist", value: false}, {name: "Educator", value: false},
                {name: "Assistant", value: false}];

            $scope.isLoading = false;
            $scope.search_results = [];

            $scope.skill_types = [{name: "Select All", value: false},{name: "Barber",value: false}, {name: "Freeehand",value: false}, {name: "Razor",value: false},
                {name: "Shaving",value: false}, {name: "Scissor over comb",value: false}, {name: "Texturing",value: false},
                {name: "Clipper work",value: false}, {name: "Classics",value: false}, {name: "Dry cutting",value: false},
                {name: "Wig cutting",value: false}, {name: "Long hair",value: false}, {name: "Short hair",value: false},
                {name: "Makeup",value: false}, {name: "Hair coloring",value: false}, ];

            $scope.selectedName = $scope.job_types[0].name;
            $scope.selectedSkillName = $scope.skill_types[0].name;
            $scope.empty_results = false;

            // $scope.job_types = ["Select All","Stylist", "Educator", "Assistant" ];
            // $scope.skill_types = ["Select All","Barber", "Freehand", "Razor", "Shaving", "Scissor over comb",
            //     "Texturing", "Clipper work", "Classics", "Dry cutting", "Wig cutting", "Long hair", "Short hair", "Makeup", "Hair coloring"];
            $scope.location_list = [{name: "Melbourne",value: false}, {name: "Sydney",value: false}, {name: "Adelaide", value: false}, {name: "Victoria",value: false}, {name: "Queensland", value: false} ];
            // $scope.selectedName = $scope.job_types[0];
            // $scope.selectedSkillName = $scope.skill_types[0];
            // $scope.empty_results = false;

            $scope.beginSearch = function (skill, jobtype) {
                var jobtypes, skilltype, index;
                for(index=0; index<$scope.job_types.length; index++){
                    if($scope.job_types[index].name===jobtype){
                        if(index===0){jobtypes = 'all';}else{jobtypes=(index+1);}
                        break;
                    }
                }
                for(index=0; index<$scope.skill_types.length; index++){
                    if($scope.skill_types[index].name===skill){
                        if(index===0){skilltype = 'all';}else{skilltype=(index+1);}
                        break;
                    }
                }
                console.log('type: ' + jobtypes + ', skill: ' + skilltype );
                $location.path('/search').search({jobtype: jobtypes, skilltype: skilltype});


                // var jobtypes, skilltype;
                // console.log(skill + '    ' + jobtype);
                // if($scope.job_types.indexOf(jobtype)===0){jobtypes = 'all'}
                // else{jobtypes = ($scope.job_types.indexOf(jobtype))}
                // if($scope.skill_types.indexOf(skill)===0){skilltype = 'all'}
                // else{skilltype = ($scope.skill_types.indexOf(skill))}

            };

            $scope.viewProfile = function (id) {
                var user = AuthService.getUser();
                if(user) {
                    if (user.user_id === id) {
                        $location.path('/profile');
                    } else {
                        $location.path('/profile/view').search({userid: id});
                    }
                }else{$location.path('/profile/view').search({userid: id});}
            };

            $scope.placeOrder = function (id) {
                var user = AuthService.getUser();
                if(user) {
                    $location.path('/order/place').search({userid: id});
                }else{
                    $('#signin_model').modal('show');
                }
            };


            $scope.search_results = [];
            $scope.onInit = function () {
                var params = $location.search();
                var job_type = (params.jobtype);
                var skill_type = (params.skilltype);

                var query1 = 'typeid=' + job_type;
                var query2 = 'skillid=' + skill_type;
                console.log("search url: http://localhost:3000/search?"+ query2 + "&" + query1);
                $http({
                    method: "GET",
                    url: "http://localhost:3000/search?"+ query2 + "&" + query1
                }).then(function (resData){
                    console.log(resData);
                    var users = resData.data.users;
                    var stylists = resData.data.stylists;
                    var userTypes = resData.data.user_types;
                    var id; var description;
                    for(var i=0; i<users.length; i++){
                        if(typeof stylists[i].id==="undefined"){id = stylists[i][0].id;}
                        else{ id = stylists[i].id;}
                        if(typeof stylists[i].description==="undefined"){description = stylists[i][0].description;}
                        else{ description = stylists[i].description;}
                        var types= '';
                        var c=0;
                        for(var j=0; j<userTypes.length; j++){
                            if(userTypes[j].user_id===id){
                                if (c===0){c=parseInt(userTypes[j].price);}
                                else{if(parseInt(userTypes[j].price)<c){c = parseInt(userTypes[j].price);}}
                                if(types===''){
                                    types=$scope.job_types[(userTypes[j].job_id)-1];
                                }else{
                                    types=types + ', ' + $scope.job_types[(userTypes[j].job_id)-1];
                                }
                            }
                        }
                        if(description.length>50){
                            description = description.substring(0,50) + '....';
                        }

                        var disable = false;
                        var user = AuthService.getUser();
                        if(user) {
                            if (user.user_id === users[i][0].id) {disable = true;}
                            else {disable = false;}
                        }

                        $scope.search_results.push({
                            firstname: users[i][0].firstname,
                            lastname: users[i][0].lastname,
                            acctypes: types,
                            id: users[i][0].id,
                            price: c,
                            rates: "0.0",
                            location: "Sidney",
                            description: description,
                            disable: disable
                        });
                    }
                    if($scope.search_results.length===0){
                        $scope.empty_results = true;
                    }else{$scope.empty_results = false;}
                },function (error){
                    console.log('Error on searching profile: ' + error);
                });
            };

        }
    ]);