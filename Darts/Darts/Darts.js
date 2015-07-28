var targetRadius = 250,
    targetCenterX = 500,
    targetCenterY = 300;

var stage = new Kinetic.Stage({
    container: 'container',
    width: 1000,
    height: 600
});

// On the first layer there will be the picture with the Darts board
var bgLayer = new Kinetic.Layer();
// On the second layer there will be the moving circle
var secondLayer = new Kinetic.Layer();

 //Adding the dartboard image on the first layer
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
  };

//Adding the target image in the second layer
    var targetImage = new Image();

      targetImage.onload = function() {
        var target = new Kinetic.Image({
          x: 13,
          y: -78,
          width: 1000,
          height: 760,
          image: targetImage
        });
        secondLayer.add(target);
        secondLayer.draw();
     };
targetImage.src = 'images/target.png';

//can be changed later. This values are for testing

boardCanvas.drawBoard(targetCenterX, targetCenterY, targetRadius);
stage.add(bgLayer);
stage.add(secondLayer);
Aiming.aim(targetCenterX, targetCenterY, targetRadius, Shooting.shoot);
boardImage.src = 'images/background.png';