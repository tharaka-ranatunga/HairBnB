/**
 * Created by tharaka_ra on 7/14/2017.
 */
angular.module('myApp')
    .factory('AuthService',['$localStorage', '$http', function ($localStorage, $http) {
        var isLogin = false;
        var service = {};

        service.Login = login;
        service.Logout = logout;
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

        function login(first_name, email, auth_token, role, callback) {
            try {
                $localStorage.currentUser = {
                    first_name: first_name,
                    email: email,
                    role: role,
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