const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-color");

const range = document.getElementById("jsRange");
const fill = document.getElementById("jsMode");
const reset = document.getElementById("jsReset");
const save = document.getElementById("jsSave");
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 530;

const INITIAL_COLOR = "#2c2c2c";

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.strokeStyle = "#INITIAL_COLOR";
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;
 
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function handleColor(event){
   const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleSave() {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "My_Canvas_Iamge";
    link.click();
  }

function rangeChange(event){

    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;

}

function chagePaint(){

    if(filling === true){
        filling = false;
        fill.innerHTML = "Fill";
    }else{
        filling = true;
        fill.innerHTML = "Paint";
    }
}

function handleCanvasClick(){

    if(filling){
    ctx.fillRect(0,0, CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}


function canvasReset() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}


Array.from(colors).forEach((color) => color.addEventListener("click", handleColor));

if(range){
    range.addEventListener("input", rangeChange);
}

if(fill){
    fill.addEventListener("click", chagePaint);
}

if(reset){
    reset.addEventListener("click", canvasReset);
}

if (save) {
    save.addEventListener("click", handleSave);
}