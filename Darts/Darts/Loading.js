var stage=new Kinetic.Stage({
    container:'container',
    width:1000,
    height:600
});

//logo layer
var logoLayer = new Kinetic.Layer();
stage.add(logoLayer);
var img = new Image();
img.src='./images/DirtyMartiniPresents.png';
img.onload = function() {
    var logo = new Kinetic.Image({
        x: 0,
        y: 0,
        image: img,
        width: 1000,
        height: 269
    });
    logoLayer.add(logo);
    logoLayer.draw();
};


//lemon
var lemonLayer=new Kinetic.Layer();
var lemon=new Kinetic.Shape({
    x: 100,
    y: -150,
    drawFunc: function(context) {
        context.beginPath();
        context.moveTo(200, 50);
        context.arc(200,50, 50,0.6*Math.PI, 2.1*Math.PI, false);
        context.lineTo(200,50);
        context.moveTo(200, 50);
        context.arc(200,50, 45,0.6*Math.PI,0.85*Math.PI, false);
        context.lineTo(200,50);
        context.moveTo(200, 50);
        context.arc(200,50, 45,0.85*Math.PI,1.1*Math.PI, false);
        context.lineTo(200,50);
        context.moveTo(200, 50);
        context.arc(200,50, 45,1.1*Math.PI,1.35*Math.PI, false);
        context.lineTo(200,50);
        context.moveTo(200, 50);
        context.arc(200,50, 45,1.35*Math.PI,1.6*Math.PI, false);
        context.lineTo(200,50);
        context.moveTo(200, 50);
        context.arc(200,50, 45,1.6*Math.PI,1.85*Math.PI, false);
        context.lineTo(200,50);
        context.moveTo(200, 50);
        context.arc(200,50, 45,1.85*Math.PI,2.1*Math.PI, false);
        context.lineTo(200,50);
        context.closePath();
        context.fillStrokeShape(this);
    },
    fill: 'yellow',
    stroke: 'black',
    strokeWidth: 2
});
lemonLayer.add(lemon);
stage.add(lemonLayer);
var tweenLemon = new Kinetic.Tween({
    node: lemon,
    duration:.5,
    x: 200,
    y:300
});
setTimeout(function () {
    tweenLemon.play();
}, 5000);

//straw layer
var layerStraw=new Kinetic.Layer();
var straw = new Kinetic.Line({
    x: 450,
    y: 0,
    points: [250, -200, 350, -350],
    stroke: '#009922',
    strokeWidth:4
});

layerStraw.add(straw);
stage.add(layerStraw);

var tweenStraw = new Kinetic.Tween({
    node: straw,
    duration: 1,
    x: 250,
    y:200,
    points: [245, 245, 345, 115]
});

setTimeout(function () {
    tweenStraw.play();
}, 5000);


//olive and hole layer
var group = new Kinetic.Group({
    x: 46,
    y: -200
});

var layerOlive=new Kinetic.Layer();
var olive = new Kinetic.Ellipse({
    x: 350,
    y: 100,
    radius: {
        x: 20,
        y: 15
    },
    fill: 'green',
    stroke: 'black',
    strokeWidth: 2
}).rotate(60);

var hole= new Kinetic.Circle({
    x: 355,
    y: 110,
    radius: 6,
    fill: 'purple',
    stroke: 'black',
    strokeWidth: 1
});

group.add(olive);
group.add(hole);
layerOlive.add(group);
stage.add(layerOlive);

var tweenGroup = new Kinetic.Tween({
    node: group,
    duration:.75,
    x: 146,
    y:322
});

setTimeout(function () {
    tweenGroup.play();
}, 4500);


//full glass line
var layerFill=new Kinetic.Layer();
var line = new Kinetic.Line({
    x: 250,
    y: 200,
    points: [250, 250, 250, 250],
    stroke: 'red',
    strokeWidth:4
});

layerFill.add(line);
stage.add(layerFill);
var tweenLine = new Kinetic.Tween({
    node: line,
    duration: 5,
    x: 250,
    y:200,
    points: [178, 175, 322, 175]
});

setTimeout(function () {
    tweenLine.play();
}, 200);






//glass layer
var layerGlass=new Kinetic.Layer();
var glassPoints=[400,325,350,350,450,350,400,325,400,250,300,150,500,150,400,250]
//400,325,  350,350,  450,350,  400,325,  400,250,  300,150,  500,150,  400,250
var glass = new Kinetic.Line({
    x:100,
    y:200,
    points:glassPoints,
    stroke: 'black',
    strokeWidth:5
});
layerGlass.add(glass);
stage.add(layerGlass);


// loading percents
var loadingLayer=new Kinetic.Layer();
var loadTimeText = new Kinetic.Text({
    x: 482,
    y: 532,
    text: "0%",
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black'
});
var loadingText = new Kinetic.Text({
    x: 454,
    y: 550,
    text: "Loading",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: 'black',
    align: 'right'
});

loadingLayer.add(loadTimeText);
loadingLayer.add(loadingText);
stage.add(loadingLayer);

setInterval(function () { onUpdateTime() }, 50);

var loadIndex=0;
function onUpdateTime() {

    if(loadIndex<=100) {
        loadTimeText.setText(loadIndex + '%');

        if(loadIndex%2!==0){
            loadingText.setText('Loading...');
        }
        else {
            loadingText.setText('Loading');
        }
        if(loadIndex===100){
            loadingText.setText('Loaded');
        }
    }
    else {
        return
    }
    loadingLayer.draw();
    loadIndex++;
console.log(loadIndex);
}




