function myFunction() {
    var x = document.getElementById("cat").value;//获取用户输入的玩家数为x
    var y = Math.floor(x/3);//杀手数量==玩家/3
    var z = (x - y);//平民数量==玩家-杀手数量
    if (x == 1){//判定输入一时清空input
        document.getElementById("kunka").innerHTML ="";
        document.getElementById("chaoxi").innerHTML ="";
    }
    if (x >= 6 && x <= 18){//判定玩家数量为6-18
        document.getElementById("kunka").innerHTML = y;//更改HTML中杀手值
        document.getElementById("chaoxi").innerHTML = z;//更改HTML中平民值
    }
}
function herFunction() {
    var inputCat = document.getElementById("cat").value;//获取用户输入的玩家数为inputCat
    if (inputCat >= 6 && inputCat <= 18) {//判定玩家数量为6-18
    }
    else {//否则弹出"请输入正确的人数6~18"
        alert("请输入正确的人数6~18");
    }
}