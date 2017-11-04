// var app = angular.module('myApp', []);
// app.controller('validateCtrl', function($scope) {
//     console.log('jjjjjjjjjjjjjjjj')
    /*var E = window.wangEditor;
    var editor = new E('#editor');
// 或者 var editor = new E( document.getElementById('#editor') )
    editor.create();

    function xmTanUploadImg(obj) {
        var file = obj.files[0];
        console.log(obj);console.log(file);
        //     console.log("file.size = " + file.size);  //file.size 单位为byte
        var reader = new FileReader();
        //读取文件过程方法
//        reader.onloadstart = function (e) {
//            console.log("开始读取....");
//        };
//        reader.onprogress = function (e) {
//            console.log("正在读取中....");
//        };
//        reader.onabort = function (e) {
//            console.log("中断读取....");
//        };
//        reader.onerror = function (e) {
//            console.log("读取异常....");
//        };
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
        var xhr= new XMLHttpRequest();
        xhr.open("POST", "/carrots-admin-ajax/a/u/img/task", true);
        console.log(file);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === "success"){
                alert(xhr.responseText);
            }
        }();
        xhr.send(formdata);
    }*/
// });
