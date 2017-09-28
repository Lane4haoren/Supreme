/**
 * Created by admin on 2017/4/6.
 */
var people = 4, killer, civil, arr = [];
//获取输入框数字信息
function getNum() {
    arr.splice(0,arr.length);
    people = document.getElementById("number1").value;
    if (4 <= people && 18 >= people && people % 1 === 0)//判定是否为区间内整数
    {
        distribute();//如果是，运行分配函数
        // alert(people);
    }else//如果不是，清空变量并且弹出提示框
    {
        killer = null;
        civil = null;
        alert("请输入正确的玩家数量");
    }
    document.getElementById("killer").value = killer;//算出人数后分别赋值
    document.getElementById("civil").value = civil;
}
//分配杀手、平民人数
function distribute() {
    if(people == 5 || people == 4){
        killer = 1;
    }else if(people <= 8) {
        killer = 2;
    }else  if(people <= 11){
        killer = 3;
    }else if(people <= 15){
        killer = 4;
    }else if(people <= 18){
        killer = 5;
    }else {
        killer = null;
    }
    civil = people - killer;
    putIntoArr();
}
//点击换页
function turnPage() {

    if(killer == null || civil == null)//如果没有分配人数，弹出对话框
    {
        alert("请输入玩家数量");
    }
    else//分配了人数，跳转游戏页面
    {
        sStorage();
        window.location.href="js-3.html";
    }
}
//放入数组后，随机打乱顺序，用sort
function putIntoArr() {
    var k = killer;
    for(var i = (people - 1); i>= 0; i--)
    {
        arr[i] = "平民";
    }
    for(var i = 0; k > 0; k--,i++)
    {
        arr[i] = "杀手";
    }
    arr.sort(function () {//sort判断数组中2个数字的大小
        return 0.5 - Math.random()
    })
}
function sStorage() {
    var str = JSON.stringify(arr);
    if(str != null){
        sessionStorage.setItem('trans', str);
         alert(str);
    }
    else {
        alert("!!!!!!");
    }
}