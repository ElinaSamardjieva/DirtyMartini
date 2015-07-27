var stage = new Kinetic.Stage({
    container: 'container',
    width: 1000,
    height: 600
});

// On the first layer there will be the picture with the Darts board
var bgLayer = new Kinetic.Layer();
// On the second layer there will be the moving circle
var secondLayer = new Kinetic.Layer();

// Adding the dartboard image on the first layer
var boardImage = new Image();

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
}

// can be changed later. This values are for testing
var targetRadius = 250,
    targetCenterX = 500,
    targetCenterY = 300; 


stage.add(bgLayer);
stage.add(secondLayer);
Aiming.aim(targetCenterX, targetCenterY, targetRadius);
boardImage.src = 'images/background.png';  