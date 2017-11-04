// var n = document.getElementById("userName");
// var p = document.getElementById("passWord");
// console.log(n.value);
// function login() {
//     console.log(n.value);
//     console.log(p.value);
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.open("Post","/carrots-admin-ajax/a/login",true);
//     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xmlhttp.send("name=" + n.value + "&pwd=" + p.value);
//     xmlhttp.onreadystatechange = function()
//     {
//         if (xmlhttp.readyState === 4) {
//             if (xmlhttp.status === 200) {
//                 var jsons = JSON.parse(xmlhttp.responseText);
//                 console.log(jsons);
//                 if (jsons.code === 0) {
//                     window.location.href = "admin.html"
//                 } else {
//                     alert("账号或密码错误")
//                 }
//             }
//         }
//     };
//
// }
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
    $scope.name = "admin";
    $scope.psw = "123456";
    $scope.login=function () {
        $http({
            method:'POST',
            url:'/carrots-admin-ajax/a/login',
            header:{"Content-Type":"application/x-www-form-urlencoded"},
            params:{name:$scope.name,pwd:$scope.psw}
        })
            .then(function successCallback(response) {
                console.log(response);
                    if (response.data.message === "success"){
                        alert("登陆成功");
                        window.location.href = "admin.html"
                    }
                },
                function errorCallback(response) {
                    alert("账号或密码错误")
                });
    }
});


