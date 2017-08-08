/**
 * Created by tharaka_ra on 7/27/2017.
 */
myApp.controller('SearchController',
    ['$scope','$http','AuthService','$location','SearchService',
        function ($scope,$http,AuthService,$location, SearchService) {

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
                        if(index===0){jobtypes = 'all';}else{jobtypes=(index);}
                        break;
                    }
                }
                for(index=0; index<$scope.skill_types.length; index++){
                    if($scope.skill_types[index].name===skill){
                        if(index===0){skilltype = 'all';}else{skilltype=(index);}
                        break;
                    }
                }

                SearchService.clearDynamicHistory();
                SearchService.writeSearchHistory(jobtypes,skilltype,function (callback) {
                    if(callback){
                        $location.path('/search').search({jobtype: jobtypes, skilltype: skilltype});
                    }else{
                        console.log('Error detected when writing to local storage');
                        $location.path('/search').search({jobtype: jobtypes, skilltype: skilltype});
                    }
                });
                $location.path('/search').search({jobtype: jobtypes, skilltype: skilltype});


                // var jobtypes, skilltype;
                // console.log(skill + '    ' + jobtype);
                // if($scope.job_types.indexOf(jobtype)===0){jobtypes = 'all'}
                // else{jobtypes = ($scope.job_types.indexOf(jobtype))}
                // if($scope.skill_types.indexOf(skill)===0){skilltype = 'all'}
                // else{skilltype = ($scope.skill_types.indexOf(skill))}

            };

            $scope.viewProfile = function (id) {
                var jobtypes_d = [], skilltype_d = [], i=0;
                for(i=0; i<$scope.job_types.length; i++){
                    if($scope.job_types[i].value){jobtypes_d.push(i);}
                }
                for(i=0; i<$scope.skill_types.length; i++){
                    if($scope.skill_types[i].value){skilltype_d.push(i);}
                }
                if(jobtypes_d.length!==0 && skilltype_d.length!==0) {
                    SearchService.writeDynamicSearchHistory(jobtypes_d, skilltype_d, function (callback) {
                        if (callback) {console.log('History logged to local storage')}
                        else {console.log('Error detected when writing to local storage');}
                    });
                }

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

            $scope.init_options = function () {
                var history = SearchService.getSearchHistory();
                if(history){
                    try {
                        $scope.selectedName = $scope.job_types[(history.type_id) - 1].name;
                        $scope.selectedSkillName = $scope.skill_types[(history.skill_id) - 1].name;
                    }catch (err){console.log('Error on reading local storage'); SearchService.clearHistory();}
                }
            };

            $scope.search_results = [];
            $scope.onInit = function () {
                var dynamic_history = SearchService.getDynamicSearchHistory();
                if(dynamic_history){
                    try {
                        var jobtypes_d = dynamic_history.type_id, skilltype_d = dynamic_history.skill_id, i=0;
                        for(i=0; i<jobtypes_d.length; i++){
                            $scope.job_types[parseInt(jobtypes_d[i])].value =true;
                        }
                        for(i=0; i<skilltype_d.length; i++){
                            $scope.skill_types[parseInt(skilltype_d[i])].value =true;
                        }
                        $scope.dynamicSearch();
                        return;
                    }catch (err){console.log('Error on reading local storage');SearchService.clearDynamicHistory();}
                }
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
                        var price=0;
                        for(var j=0; j<userTypes.length; j++){
                            try {
                                if (typeof userTypes[j].user_id === 'undefined') {
                                    user_id = userTypes[j][0].user_id;
                                    job_id = userTypes[j][0].job_id;
                                } else {
                                    user_id = userTypes[j].user_id;
                                    job_id = userTypes[j].job_id;
                                }

                                if (user_id === id) {
                                    if(typeof userTypes[j].price==='undefined'){
                                        if(price===0){price = parseInt(userTypes[j][0].price);}
                                        else{if(price>(parseInt(userTypes[j][0].price))){price = parseInt(userTypes[j][0].price);}}
                                    }else {
                                        if(price===0){price = parseInt(userTypes[j].price);}
                                        else{if(price>(parseInt(userTypes[j].price))){price = parseInt(userTypes[j].price);}}
                                    }
                                    if (types === '') {
                                        types = $scope.job_types[(job_id) - 1].name;
                                    } else {
                                        types = types + ', ' + $scope.job_types[(job_id) - 1].name;
                                    }
                                }
                            }catch (err){}
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
                            price: price,
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

            $scope.dynamicSearch = function () {
                var i;
                var job_types=[];
                for(i=0; i<$scope.job_types.length; i++){
                    if($scope.job_types[i].value){
                        job_types.push(i);
                    }
                }
                var skill_types=[];
                for(i=0; i<$scope.skill_types.length; i++){
                    if($scope.skill_types[i].value){
                        skill_types.push(i);
                    }
                }
                $http({
                    method: "GET",
                    url: "http://localhost:3000/dynamicSearch?jobtype="+ job_types + "&skilltype=" + skill_types
                }).then(function (resData){
                    // console.log(resData);
                    console.log('Dynamic search triggered');
                    var users = resData.data.users;
                    var stylists = resData.data.stylists;
                    var jobtypes = resData.data.jobtypes;
                    $scope.search_results = [];
                    for(var i=0; i<users.length; i++){
                        var description = '';
                        for(var j=0; j<stylists.length; j++){
                            if(users[i][0].id===stylists[j].user_id){
                                description = stylists[j].description;
                                break;
                            }
                        }
                        if(description.length>200){
                            description = description.substring(0,200) + '....';
                        }
                        var disable = false;
                        var user = AuthService.getUser();
                        if(user) {
                            if (user.email === users[i][0].email) {disable = true;}
                            else {disable = false;}
                        }
                        var types= '';
                        for(var k=0; k<$scope.job_types.length; k++){
                            if($scope.job_types[k].value){
                                if(types===''){types=$scope.job_types[k].name}
                                else{types = types + ', ' + $scope.job_types[k].name}
                            }
                        }
                        var price = 0.0;
                        for(var l=0; l<stylists.length; l++){
                            if(users[i][0].id===stylists[l].user_id){
                                for(var p=0; p<jobtypes.length; p++){
                                    if(jobtypes[p][0]===stylists[l].id){
                                        if (price===0){
                                            price=jobtypes[p][1];
                                        }else{
                                            if(price>jobtypes[p][1]){
                                                price=jobtypes[p][1];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        $scope.search_results.push({
                            firstname: users[i][0].firstname,
                            lastname: users[i][0].lastname,
                            acctypes: types,
                            email: users[i][0].email,
                            id: users[i][0].id,
                            price: price,
                            rates: "0.0",
                            location: "Sidney",
                            description: description,
                            disable: disable
                        });
                    }
                    console.log($scope.search_results);
                    if($scope.search_results.length===0){
                        $scope.empty_results = true;
                    }else{$scope.empty_results = false;}
                },function (error){
                    $scope.isLoading = false;
                    console.log('Error on searching profile: ' + error);
                });
            };

        }
    ]);