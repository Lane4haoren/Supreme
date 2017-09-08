var io = document.getElementsByClassName("box1");
function flash() {
    cat();
    for (i=0;i<io.length;i++) {
        var a = Math.floor(Math.random() * 9);
        var b = Math.floor(Math.random() * 9);
        var c = Math.floor(Math.random() * 9);
        if (a != b && a != c && c != b) {
            break;
        }
    }
    function randomRgbColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + ',' + g + ',' + b + ")"
    }
    io[a].style.background =randomRgbColor();
    io[b].style.background =randomRgbColor();
    io[c].style.background =randomRgbColor();
}
var time;
function test(){
    time=setInterval( "flash()",1000);
}
var dog = 1;
function star() {
    if(dog==1){
        clearInterval(time);
        test();
        dog=2;
    }
}
function end() {
    dog=1;
    clearInterval(time);
    cat();
}
function cat() {
    var sf = document.getElementsByClassName("box1");
    var i;
    for (i = 0; i < sf.length; i++) {
        sf[i].style.background = "orange";
    }
}