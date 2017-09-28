/**
 * Created by admin on 2017/4/8.
 */
var arr, num = 0;
function getData() {
    arr = sessionStorage.getItem('trans');
    arr = JSON.parse(arr);
    for(var i = arr.length;i > 1; i--)
    {
        num++;
    }
}
var timer = 1;
function checkID() {
    var id = Math.ceil((timer / 2) - 1);
    timer++;
    if(timer <=  (num * 2 + 1))//在查看和传递之间循环
    {
        if(timer % 2 ===1)
        {
            var ji = Math.ceil(timer / 2);
            document.getElementById('fanpai').style.display='block';//翻牌和身份信息互换隐藏
            document.getElementById('info').style.opacity='0';
            document.getElementById('button').value = "查看" + ji + "号身份";
        }else
        {
            var ou = timer / 2 + 1;
            document.getElementById('fanpai').style.display='none';
            document.getElementById('info').style.opacity='1';
            document.getElementById('button').value = "隐藏并传递给" + ou + "号";
        }
        }else if(timer == num *2 + 2)//倒数第二次事件，显示法官查看
    {
        document.getElementById('fanpai').style.display='none';
        document.getElementById('info').style.opacity='1';
        document.getElementById('button').value = "法官查看";
    }else//最后一次按钮事件，转换页面
    {
        window.location.href="js-4.html";
    }
    document.getElementById('pageNumber').value = Math.ceil(timer / 2);
    document.getElementById('identity').value = arr[id];
}