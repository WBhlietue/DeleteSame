var timer = document.getElementById("timer")

var main = document.getElementById("main")

let s = 0;
const innnnn = setInterval(function(){
    s++;
    timer.innerHTML =s;
    if(!main.isPlay){
        clearInterval(innnnn);
    }
}, 1000);

function T(){
    s++;
    timer.innerHTML= s;
    // clearInterval();
    // setInterval(T, 1000);
}
