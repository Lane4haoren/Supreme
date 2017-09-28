/**
 * Created by admin on 2017/4/10.
 */
var countChange = 0, countDay = 0,killer = 0,citizen = 0,
currentPlayerId,currentPlayerNum = -1,arr1,result = [];
window.onload = function () {
    var insertCon = document.getElementById('vote');
    var inset = '';
    arr = sessionStorage.getItem('trans');
    arr1 = JSON.parse(arr);
    function getData() {
        for(var i = 0; i < arr1.length; i++)
        {
            inset += '<div class="info"><div class="up"><input type="button"  id="box' + i + '" value="' + arr1[i] + '" onclick="return change(this.id)"></input></div><div class="down"><span>' + (i+1)+ '</span></div> </div>'
        }
        return inset;
    }
    getData();
    insertCon.innerHTML  = inset;
    document.getElementById('headerWord').innerHTML = '法官查看';
    for(i=0; i<arr1.length;i++){
        if(arr1[i] == '杀手'){
            killer++;
        }else {
            citizen++;
        }
    };
    $('#choice').css('display', 'none');
    $('#journal').css('display', 'none');
    console.log(killer,citizen);
}
//换页按钮
function turnPage(){
    console.log(currentPlayerNum);
    if((currentPlayerNum>=0 && currentPlayerNum<18) || currentPlayerNum == -1){
        var numberDead = (parseInt(currentPlayerNum) + 1);
        document.getElementById('button').value = '投票杀人';
        //死亡人判断
        if(currentPlayerNum>=0 && currentPlayerNum<18){
            document.getElementById(currentPlayerId).style.background = 'red';
            if(arr1[currentPlayerNum] == '杀手'){
                killer--;
            }else {
                citizen--;
            };
            if(countChange % 2 == 0){
                result[(countChange-1)] = '白天：'+numberDead+'号玩家被投死，他的身份是'+arr1[currentPlayerNum]
            }else{
                result[(countChange-1)] = '黑夜：'+numberDead+'号玩家被杀死，他的身份是'+arr1[currentPlayerNum]
            }
        }
        console.log(result);
        if(killer == 0){//游戏是否结束判断

            $('#journal').append('平民获胜');
            check();
        }else if(citizen <= killer){
            $('#journal').append('杀手获胜');
            check();
        }else {
            $('#button').css('display','none');
            $('#vote').css('display', 'none');
            $('#choice').css('display', 'block');
            document.getElementById('headerWord').innerHTML = '法官台本';
            if (countChange % 2 == 0) {//新的一天
                countDay++;
                countChange++;
                $('#killed').hide();
                $('#killed').empty();
                document.getElementById('step1').style.background = 'white';
                document.getElementById('step2').style.background = 'white';
                document.getElementById('step3').style.background = 'white';
                document.getElementById('step4').style.background = 'white';
                $('#days').append('<button class="buttonOfDays" id="dp'+countDay+'">第' + countDay + '天</button>');
                 var dp = "#dp"+ (countDay-1);
                console.log(countDay);
                $(dp).after('<p>'+result[result.length-2]+'</p>');
                $(dp).after('<input type="button" class="sk" value="投票">');
                $(dp).after('<input type="button" class="sk" value="所有玩家发表">');
                $(dp).after('<input type="button" class="sk" value="亡灵发表遗言">');
                $(dp).after('<p>'+result[result.length-1]+'</p>');
                $(dp).after('<input type="button" class="sk" value="杀手杀人">');
                $(".sk,p").hide();
                $(dp).click(function(){
                    $(".sk,p").toggle();
                });

                currentPlayerNum = -2;
            }else{//继续之前那天
                countChange++;
                $('#killed').show();
                $('#killed').append(numberDead+'号玩家被杀死，他的身份是'+arr1[currentPlayerNum]);
                currentPlayerNum = -2;
            }
        }
    }else {
        alert('请选择一个玩家')
    }

}

//法官页面转投票页面时候信息更改
function changePageInfo(){
    $('#button').css('display', 'block');
    $('#choice').css('display', 'none');
    $('#vote').css('display', 'block');
    if(countChange/countDay == 2){
        document.getElementById('headerWord').innerHTML = '投票杀人';
    }else {
        document.getElementById('headerWord').innerHTML = '杀手杀人';
    }
}

//白天四个步骤判断
$('#step1').click(function () {
    if(document.getElementById('step1').style.background == 'white'){
        document.getElementById('step1').style.background = 'orange';
        changePageInfo();
    }else {
        console.log(document.getElementById('step1').style.background);
        alert('按步骤点啊！傻么？')
    }
});
$('#step2').click(function () {
    if (document.getElementById('step1').style.background =='orange' && document.getElementById('step2').style.background == 'white'){
        alert('请死者发言');
        document.getElementById('step2').style.background = 'orange';
    }else {
        console.log(document.getElementById('step1').style.background,document.getElementById('step2').style.background)
        alert('按步骤点啊！傻么？');
    }
})
$('#step3').click(function () {
    if (document.getElementById('step2').style.background =='orange' && document.getElementById('step3').style.background == 'white'){
        alert('请玩家发言');
        document.getElementById('step3').style.background = 'orange';
    }else {
        alert('按步骤点啊！傻么？');
    }
})
$('#step4').click(function () {
    if (document.getElementById('step3').style.background =='orange' && document.getElementById('step4').style.background == 'white'){
        document.getElementById('step4').style.background = 'orange';
        changePageInfo();
    }else {
        alert('按步骤点啊！傻么？');
    }
})
//点击法官日记
function check() {
    $('#journal').append('<p>死亡记录</p>');
    $('#choice').hide();
    $('#journal').show();
    if(killer==0 || killer>=citizen){
        $('#vote').hide();
        $('#button').hide();
    }
    for(var i=0,j=1;i<result.length;i++){
        if(i%2==0){
            $('#journal').append('<p>第'+j+'天：</p>');
            j++;
        }
        $('#journal').append('<p>'+result[i]+'</p>');
    }
    $('#journal').append('<input type="button" class="button" id="button2" value="返回台本" onclick="back()">');
}

function back() {
    if(killer==0 || killer>=citizen){

    }else {
        $('#journal').hide();
        $('#choice').show();
        $('#journal').empty();
    }
}
//点击玩家按钮判断
function change(id) {
    // for(var j=0;j<arr1.length;j++){
    //     var q = 'box'+j;
    //     document.getElementById(q).style.background = 'orange'
    // }
    // document.getElementById(id).style.background="blue";
    // console.log(arr1[currentPlayer],id);

    if(countDay == 0){ //判断是哪一次（开始，杀人，投票）
        alert('点击下方开始游戏')
    }else if(countChange/countDay == 2){  //投票页面
        if(document.getElementById(id).style.background == 'red'){ //判断人的状态（死人，活人）
            alert('该玩家已死亡！')
        }else {
            for(var j=0;j<arr1.length;j++){  //清除前一个点击颜色
                var q = 'box'+j;
                if(document.getElementById(q).style.background == 'blue'){
                    document.getElementById(q).style.background = 'orange'
                }
            }
            document.getElementById(id).style.background="blue"  //点击上色
            currentPlayerId = id;  //当前点击玩家的id
            currentPlayerNum = id.slice(3);
        }
    }else{  //杀手杀人
        if(document.getElementById(id).style.background == 'red'){ //判断人的状态（死人，活人，杀手）
            alert('该玩家已死亡！');
        }else if(arr1[id.slice(3)] == '杀手'){
            alert('自杀局？滚蛋！这不是狼人杀');
        }else  {
            for(var j=0;j<arr1.length;j++){  //清除前一个点击颜色
                var q = 'box'+j;
                if(document.getElementById(q).style.background == 'blue'){
                    document.getElementById(q).style.background = 'orange';
                    console.log(document.getElementById(q).style.background)
                }
            }
            document.getElementById(id).style.background="blue";  //点击上色
            currentPlayerId = id;  //当前点击玩家的id
            currentPlayerNum = parseInt(id.slice(3));
        }
    }
}
