//can be changed later. This values are for testing
var targetRadius = 250,
    targetCenterX = 500,
    targetCenterY = 300,
    stage,
    bgLayer,
    secondLayer,
    boardImage,
    targetImage,
    targerLayer,
    soundImage,
    isSoundOn = true,
    finalSound;
    
stage = new Kinetic.Stage({
    container: 'container',
    width: 1355,
    height: 600
});

// On the first layer there will be the picture with the Darts board
bgLayer = new Kinetic.Layer();

// On the second layer there will be the moving circle
secondLayer = new Kinetic.Layer();

targerLayer = new Kinetic.Layer();

//Adding the dartboard image on the first layer
boardImage = new Image();
boardImage.onload = function () {
    var board = new Kinetic.Image({
        x: 0,
        y: 0,
        image: boardImage,
        width: stage.width(),
        height: stage.height()
    });
    bgLayer.add(board);
    bgLayer.draw();
};

//Adding the target image in the second layer
targetImage = new Image();
targetImage.onload = function () {
    var target = new Kinetic.Image({
        x: 13,
        y: -78,
        width: 1000,
        height: 760,
        image: targetImage
    });
    targerLayer.add(target);
    targerLayer.draw();
};


boardImage.src = 'images/background.png';   
targetImage.src = 'images/target.png';
boardCanvas.drawBoard(targetCenterX, targetCenterY, targetRadius);
stage.add(bgLayer);
stage.add(targerLayer);
stage.add(secondLayer);

var backgroundMusic = new Audio('music/background.mp3');
backgroundMusic.play();