/**
 * Created by tharaka_ra on 7/14/2017.
 */
angular.module('myApp')
    .factory('AuthService',['$localStorage', '$http', function ($localStorage, $http) {
        var isLogin = false;
        var status = false;
        var service = {};

        service.Login = login;
        service.Logout = logout;
        service.setStylist = setStylist;
        service.getStylist = getStylist;
        service.getUser = getUser;
        service.isLogin = isLogin;
        service.setIsLogin = setIsLogin;
        service.isLoginStatus = isLoginStatus;

        return service;

        function isLoginStatus() {
            return isLogin;
        }

        function setIsLogin(flag) {
            isLogin = flag;
        }

        function getUser() {
            if($localStorage.currentUser){
                return $localStorage.currentUser;
            }else{
                isLogin = false;
                return null;
            }
        }

        function setStylist(bool) {
            status=bool;
        }

        function getStylist() {
            return status;
        }

        function login(user_id, first_name, last_name, email, auth_token, callback) {
            try {
                $localStorage.currentUser = {
                    user_id : user_id,
                    first_name: first_name,
                    last_name : last_name,
                    email: email,
                    token: auth_token
                };
                $http.defaults.headers.common.Authorization = 'JWT ' + auth_token;
                setIsLogin(true);
                callback(true);
            }catch  (err){
                setIsLogin(false);
                console.log('error writing local storage');
                callback(false);
            }
        }

        function logout() {
            setIsLogin(false);
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }]);