const item = document.getElementById("animation");
let runtime;
let width = getWidth();
const freq = 0.01;
const amp = 35;
const startP = 133;

const colors = ["red","orange","yellow","green","blue","purple"];

function createItems(range, pos, canvas, item) {
  let itemSet = [];
  for(let i = 0; i < 6; i++) {
    itemSet[i] = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    
    itemSet[i].style.height = "10px";
    itemSet[i].style.width = "30px";
    itemSet[i].style.x = range;
    itemSet[i].style.y = pos + i*10;
    itemSet[i].style.fill = colors[i];
    itemSet[i].style.stroke = colors[i];
    itemSet[i].style.zIndex = 100;
    
    canvas.insertBefore(itemSet[i], item);
  }
};

item.style.x = "0px";
item.style.y = "50%";

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,  
    document.documentElement.offsetWidth,  
    document.documentElement.clientWidth
  );
}

//could be made smoother
function fly(item, range = -30, counter = 0) {
  let pos = startP +(Math.sin(range*freq)*amp*1);
  let canvas = document.getElementById("canvas");
  item.style.y = pos-35;
  item.style.x = range;
  item.style.zIndex = 1000;
  
  if(counter == 30) {
    
    createItems(range, pos, canvas, item)

    counter = 0;
    } else {
    counter++;
    }
  
  if (range < width) {
    runtime = setTimeout(fly, 1, item, range + 1, counter);
  } else {
    clearTimeout(runtime);
  }
};

fly(item);