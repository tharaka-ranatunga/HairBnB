/**
 * Created by tharaka_ra on 8/1/2017.
 */
angular.module('myApp')
    .factory('OrderService',['$localStorage', '$http', function ($localStorage, $http) {
        var service = {};

        service.getStylist = getStylist;
        service.order = order;

        return service;


        function getStylist(){
            if($localStorage.orderStylist){
                return $localStorage.orderStylist;
            }else{
                return null;
            }
        }


        function order(stylist_id, stylist_name,job1, job2, job3, price1, price2, price3, done){
            try{
                $localStorage.orderStylist = {
                    stylist_id : stylist_id,
                    stylist_name : stylist_name,
                    job : {
                        job1: job1,
                        job2: job2,
                        job3 : job3
                    },
                    price: {
                        price1 : price1,
                        price2 : price2,
                        price3 : price3
                    }

                };
                $http.defaults.headers.common.Authorization = 'JWT ' + auth_token;
                done();
            }catch (err){
                return err;
            }
        }

    }]);