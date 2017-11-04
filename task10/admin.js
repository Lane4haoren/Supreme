var app = angular.module('routingDemoApp',['ui.router','angularFileUpload'])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('/one');
        $stateProvider
            .state('one',{
                url:'/one',
                templateUrl:'hello.html'
            })
            .state('computers',{
                url:'/computers?type&startAt&endAt&status&page',
                templateUrl:'world.html'
            })
            .state('computers.news',{
                url:'/news?id',
                controller:'helloCtrl as vm',
                templateUrl:'news.html'
            })
    }]);
app.controller('customersCtrl', function($scope, $http,$state,$stateParams,FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
        url: '/carrots-admin-ajax/a/u/img/task'
    });
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 1;
        }
    });
    $scope.lll = function () {
        $state.go("computers.news",{
            "type":"",
            "startAt":"",
            "endAt":"",
            "status":"",
            "page":""
        })
    };

    $scope.cler=function() {
        $scope.pp= true;
        var io = document.getElementById("xdaTanFileImg");
        document.getElementById("xmTanImg").src="";
        io.value="";
    };
    var x = "";
    $scope.you = function () {
        // console.log($scope.)
        var time1 ;
        var time2;
        $scope.type = $stateParams.type||"";
        $scope.a = $stateParams.startAt||"";
        $scope.b = $stateParams.endAt||"";
        $scope.status = $stateParams.status||"";
        $scope.page123 = $stateParams.page||"";
        time1 = Date.parse($scope.a)||"";
        time2 = Date.parse($scope.b)||"";
        console.log($scope.a);
        console.log($scope.page123);
        $http({
            method:'GET',
            url:'/carrots-admin-ajax/a/article/search',
            params:{
                "type":$scope.type,
                "startAt":time1,
                "endAt":time2,
                "status":$scope.status,
                "page":$scope.page123
            }
        }).then(function successCallback(result) {
            $scope.names = result.data.data.articleList;
            $scope.ym =Math.ceil(result.data.data.total / 10);
            $scope.newPages=[];
            for(i=1;i<=$scope.ym;i++){
                $scope.newPages.push(i);
            }
             x = result.data.data.page;
            $scope.page123= x ;
             console.log(x);
        });
    }();
    $scope.ye=function (x) {
        console.log(x);
        $scope.page123= x ;
        $state.go("computers",{
            "type":$scope.type,
            "startAt":$scope.a,
            "endAt":$scope.b,
            "status":$scope.status,
            "page":$scope.page123
        });
    };
    console.log(x.id);

    $scope.delete=function(id) {
        $http({
            method: "DELETE",
            url: "/carrots-admin-ajax/a/u/article/" + id,
            header: {"Content-Type": "application/x-www-form-urlencoded"}
        })
            .then(function (){
                alert("删除成功");
                $state.go("computers",{
                    "type":$scope.type,
                    "startAt":$scope.a,
                    "endAt":$scope.b,
                    "status":$scope.status,
                    "page":$scope.page123
                },{reload: true})
            })
    };
    function changePage(x){
     //   console.log(x);
        $scope.page123= x ;
        $state.go("computers",{
            "type":$scope.type,
            "startAt":$scope.a,
            "endAt":$scope.b,
            "status":$scope.status,
            "page":$scope.page123
        });
    }
    $scope.frist=function () {
        if ($scope.page123==1){
            $scope.isDisabled=false;
        }
        else {
            changePage(1)
        }

    };
    $scope.lastpage=function () {
        if ($scope.page123==$scope.ym){
            $scope.isDisabled=false;
        }
        else {
            changePage($scope.ym)
        }
    };
    $scope.skip=function () {
        num = $("#qop").val();
        if (num>=$scope.ym){
            changePage($scope.ym);
        }
        if (num<=0){
            changePage(1)
        }
        console.log(num);
    };
    $scope.last=function(){
      //  console.log($scope.ym);
        console.log($scope.page123);
        if ($scope.page123==1){
            $scope.isDisabled=false;
        }
        else {
            changePage($scope.page123-1);
            $scope.page123 = $scope.page123-1;
        }
    };
    $scope.next=function(){
        console.log($scope.ym);
        if ($scope.page123==$scope.ym){
            $scope.isDisabled=false;
        }
        else {
            changePage($scope.page123+1);
            $scope.page123 = $scope.page123+1;
        }
    };
    $scope.currentPage=function(){
        changePage(x)
    };
    function dog(strtime) {
        var date = new Date(strtime);
        var time3 = Date.parse(date);
        return time3;
    }
    $scope.her = function () {
        $scope.a = $("#ECalendar_date").val();
        $scope.b = $("#ECalendar_date1").val();
        if ($scope.a){
            $scope.startAt1 =  dog($scope.a);
            $scope.startAt2 =  dog($scope.b);
        }
        else {
            $scope.startAt1 ="";
            $scope.startAt2 ="";
        }
   //     console.log(dog(a));
    //    console.log(b);
        $state.go("computers",{
            "type":$scope.type,
            "startAt":$scope.a,
            "endAt":$scope.b,
            "status":$scope.status,
            "page":""
        });console.log($scope.startAt1)
    };
    $scope.she = function () {
        $state.go("computers",{
            "type":"",
            "startAt":"",
            "endAt":"",
            "status":"",
            "page":""
        })
    };
    $scope.change=function(x,y){
        if(x==1){
            x=2
        }else {
            x=1
        }
        console.log(x);
        $http({
            method: 'PUT',
            url: '/carrots-admin-ajax/a/u/article/status',
            params: {
                "id":y,
                "status":x
            }
        })
            .then(function (){
                alert("修改成功");
                $state.go("computers",{
                },{reload: true})
            })
    };
    $scope.editor=function(x) {
        $state.go('computers.news',{
            "id":x
        });
    }
});



app.filter('reverse', function() {
    return function(type) {
        if(type==0){
            type = "首页banner";
            return type
        }
        if(type==1){
            type = "找职位banner";
            return type
        }
        if(type==2){
            type = "找精英banner";
            return type
        }
        if(type==3){
            type = "行业大图";
            return type
        }
    }
});
app.filter('op', function() {
    return function(cat) {
        if(cat==1){
            cat = "草稿";
            return cat
        }
        if(cat==2){
            cat = "上线";
            return cat
        }
    }
});
app.filter('cut',function () {
    return function (ciao) {
        if (ciao==1){
            ciao = "上线";
            return ciao
        }
        if (ciao==2){
            ciao = "下线";
            return ciao
        }
    }
});
