//can be changed later. This values are for testing
var TARGET_RADIUS = 250,
    TARGET_CENTER_X = 500,
    TARGET_CENTER_Y = 300,
    stage,
    bgLayer,
    secondLayer,
    boardImage,
    targetImage,
    targerLayer,
    soundImage,
    isSoundOn = true,
    finalSound,
    soundMuteImage;
    
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

soundImage = new Image();

soundImage.onload = function() {
    var button = new Kinetic.Image({
        x: 30,
        y: 30,
        height: 50,
        width:50,
        image: soundImage
    });
    bgLayer.add(button);
    bgLayer.draw();
};

soundMuteImage = new Image();

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

targetImage.onclick = function () {

}

soundMuteImage.src = 'images/SpeakerIcon_Mute.png';
boardImage.src = 'images/background.png';   
targetImage.src = 'images/target.png';
soundImage.src = 'images/SpeakerIcon.png';
boardCanvas.drawBoard(TARGET_CENTER_X, TARGET_CENTER_Y, TARGET_RADIUS);
stage.add(bgLayer);
stage.add(targerLayer);
stage.add(secondLayer);

var backgroundMusic = new Audio('music/background.mp3');
backgroundMusic.play();
