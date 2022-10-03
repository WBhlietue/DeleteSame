var startX = 75;
var startY = 35;

var xNum = 18;
var yNum = 7;

var xOffset = 60;
var yOffset = 80;

var main = document.getElementById("main");
main.isPlay = true;

var preSelected = null;

var randoms = [
  "#ff0000",
  "#ffa200",
  "#f2ff00",
  "#40ff00",
  "#00ffff",
  "#2200ff",
  "#bb00ff",
  "#ff7af4",
  "#632727",
  "#688781",
];

var colors = [];
var number = 0;

for (var i = 0; i < xNum; i++) {
  for (var j = 0; j < yNum; j++) {
    var x = startX + xOffset * i;
    var y = startY + yOffset * j;
    var item = document.createElement("div");
    item.className = "item";
    item.style.left = x;
    item.style.top = y;
    number++;
    if(number <= xNum * yNum/2){
        var num = Math.floor(Math.random() * randoms.length);
        colors.push(num);
    }else{
        k = Math.floor(Math.random() * colors.length)
        var num = colors[k];
        colors.splice(k, 1);
    }
    item.color = randoms[num];
    // item.style.backgroundColor = randoms[num];
    item.num = num;
    item.clicked = false;
    item.setAttribute("onCLick", "OnClick(this)");
    main.appendChild(item);
  }
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
  if(number == 0){
      main.isPlay = false;
  }
}
