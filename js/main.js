var startX = 75;
var startY = 35;

var xNum = 18;
var yNum = 7;

var xOffset = 60;
var yOffset = 80;

var s = 0;
var h = 0;
var m = 0;

var main = document.getElementById("main");
main.isPlay = true;

var win = document.getElementById("win");
win.style.scale = 0;

var preSelected = null;

var randoms = [
  "#ff0000",
  "#ffa200",
  "#f2ff00",
  "#40ff00",
  "#00ffff",
  "#2200ff",
  "#bb00ff",
];

var colors = [];
var number = 0;

document.getElementById("x").value = 2;
document.getElementById("y").value = 2;

function Start() {
  xNum = document.getElementById("x").value;
  yNum = document.getElementById("y").value;
  if ((yNum * xNum) % 2 != 0) {
    alert("x + y must divided by 2");
  } else {
    startX = (1200 - 30 * xNum - 30 * (xNum - 1)) / 2;
    startY = (600 - 50 * yNum - 30 * (yNum - 1)) / 2;
    document.getElementById("start").style.scale = 0;
    document.getElementById("start").style.top = 150;
    document.getElementById("start").style.left = 450;
    for (var i = 0; i < xNum; i++) {
      for (var j = 0; j < yNum; j++) {
        var x = startX + xOffset * i;
        var y = startY + yOffset * j;
        var item = document.createElement("div");
        item.className = "item";
        item.style.left = x;
        item.style.top = y;
        number++;
        if (number <= (xNum * yNum) / 2) {
          var num = Math.floor(Math.random() * randoms.length);
          colors.push(num);
        } else {
          k = Math.floor(Math.random() * colors.length);
          var num = colors[k];
          colors.splice(k, 1);
        }
        item.color = randoms[num];
        item.num = num;
        item.clicked = false;
        item.setAttribute("onCLick", "OnClick(this)");
        main.appendChild(item);
      }
    }
  }
  StartTimer();
}

function StartTimer() {
  var timer = document.getElementById("timer");
  timer.innerHTML = "00:00:00";
  const innnnn = setInterval(function () {
    s++;
    if (s >= 60) {
      s = 0;
      m++;
    }
    if (m >= 60) {
      m = 0;
      h++;
    }
    var value =
      (h < 10 ? "0" : "") +
      h +
      ":" +
      (m < 10 ? "0" : "") +
      m +
      ":" +
      (s < 10 ? "0" : "") +
      s;
    timer.innerHTML = value;
    if (!main.isPlay) {
      timer.innerHTML = "";
      clearInterval(innnnn);
    }
  }, 1000);
}

function OnClick(item) {
  if (!item.clicked) {
    item.clicked = true;
    item.style.backgroundColor = item.color;
    item.style.height = 70;
    item.style.width = 50;
    item.style.left = parseInt(item.style.left) - 10;
    item.style.top = parseInt(item.style.top) - 10;
    if (preSelected != null) {
      setTimeout(function () {
        if (preSelected.num == item.num) {
          Remove(preSelected, item);
        } else {
          Off(preSelected);
          Off(item);
        }
      }, 300);
    } else {
      preSelected = item;
    }
  } else {
    Off(item);
  }
}

function Off(item) {
  preSelected = null;
  item.style.backgroundColor = "#000000";
  item.clicked = false;
  item.style.height = 50;
  item.style.width = 30;
  item.style.left = parseInt(item.style.left) + 10;
  item.style.top = parseInt(item.style.top) + 10;
}

function Remove(item1, item2) {
  preSelected = null;
  DelItem(item1);
  DelItem(item2);
}

function DelItem(item) {
  preSelected = null;
  item.clicked = false;
  item.style.height = 0;
  item.style.width = 0;
  item.style.left = parseInt(item.style.left) + 25;
  item.style.top = parseInt(item.style.top) + 25;
  number--;
  if (number == 0) {
    main.style.display = "none";
    win.style.scale = 1;
    console.log(win.style.scale);
    main.isPlay = false;
    var value =
      (h < 10 ? "0" : "") +
      h +
      ":" +
      (m < 10 ? "0" : "") +
      m +
      ":" +
      (s < 10 ? "0" : "") +
      s;
    document.getElementById("winTime").innerHTML = "You spended " + value;
  }
}

function ReStart() {
  location.reload();
}

function InputOnChange(id) {
  var v = document.getElementById(id);
  if (id == "x") {
    if (v.value > 18) {
      v.value = 18;
    }
  } else {
    if (v.value > 7) {
      v.value = 7;
    }
  }
  if (v.value < 2) {
    v.value = 2;
  }
}
