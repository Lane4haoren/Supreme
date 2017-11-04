app.controller('helloCtrl',function ($scope, $http,$state,$stateParams) {
    var vm = this;
    $scope.pas = $stateParams.id;
    if ($scope.pas) {
        document.getElementById("ArticleTitle").innerHTML="编辑Article";
        console.log($scope.pas);
        $http({
            method: 'GET',
            url: '/carrots-admin-ajax/a/article/' + $scope.pas
        })
            .then(function(res){
                console.log(res);
                var data = res.data.data.article;
                vm.user = data.title;
                console.log(data.type);
                vm.type = data.type.toString();
                vm.industry= data.industry.toString();
                vm.url = data.url;
                vm.print = data.img;
                vm.had= data.title;
                vm.pap=data.img;
                document.getElementById('xmTanImg').src=data.img;
                vm.createAt = data.createAt;
                editor.txt.html(data.content);
                $scope.pp=false;
                // $scope.$apply();
            })
    }
    if ($scope.uu){
        $scope.pp = false
    }else {
        $scope.pp = true;
    }
    $scope.hand = function (alt) {
        if ($scope.pas){
            $http({
                method:'PUT',
                url:'/carrots-admin-ajax/a/u/article/'+$scope.pas,
                params:{
                    "title":vm.user,
                    "type":vm.type,
                    "status":alt,
                    "img":vm.print,
                    "content":editor.txt.html(),
                    "url":vm.url,
                    "industry":vm.industry,
                    "createAt":vm.createAt
                }
            })
                .then(function (){
                    alert("编辑成功");
                    $state.go("computers",{
                        "title":"",
                        "type":"",
                        "status":"",
                        "img":"",
                        "content":"",
                        "url":"",
                        "industry":""
                    },{reload: true})
                })
        }else {
            $http({
                method:'POST',
                url:'/carrots-admin-ajax/a/u/article',
                params:{
                    "title":vm.user,
                    "type":vm.type,
                    "status":alt,
                    "img":$scope.uu,
                    "content":editor.txt.html(),
                    "url":vm.url,
                    "industry":vm.industry
                }
            })
                .then(function (){
                    alert("新增成功");
                    $state.go("computers",{
                        "title":"",
                        "type":"",
                        "status":"",
                        "img":"",
                        "content":"",
                        "url":"",
                        "industry":""
                    },{reload: true})
                })
        }
    };

    $scope.xmTanUploadImg=function () {
        var yy = document.getElementById("xdaTanFileImg");
        var file = yy.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log("成功读取....");

            var img = document.getElementById("xmTanImg");
            img.src = this.result;
            //或者 img.src = this.result;  //e.target == this
        };
        reader.readAsDataURL(file);

        var myForm = document.getElementById("xmTanImg");
        formdata=new FormData(myForm);
        formdata.append("file",file);
        var col= new XMLHttpRequest();
        col.open("POST", "/carrots-admin-ajax/a/u/img/task", true);
        col.send(formdata);
        col.onreadystatechange = function() {
            if (col.readyState == 4 && col.status == 200){
                qq = JSON.parse(col.responseText);
                console.log(col.responseText);
                $scope.uu = qq.data.url;
                console.log($scope.uu);
                $scope.pp=false;
                console.log($scope.pp);
                $scope.$apply();
            }
        };
    };
});
