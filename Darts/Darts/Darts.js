var stage = new Kinetic.Stage({
    container: 'container',
    width: 1000,
    height: 600
});

// On the first layer there will be the picture with the Darts board
var layer = new Kinetic.Layer();
// On the second layer there will be the moving circle
var secondLayer = new Kinetic.Layer();

// Adding the dartboard image on the first layer
var boardImage = new Image();

boardImage.onload = function () {
    var board = new Kinetic.Image({
        x: 0,
        y: 0,
        image: boardImage,
        width: 600,
        height: 400
    });
    layer.add(board);
    // TO DO: Fix bug: The layer of the picture goes over the layer with the circle and blocks it!!!
    // I tried, but I can not fix it. Even when I change the layers the result is the same!!!
    //stage.add(layer);
}

var orbit = new Kinetic.Circle({
    x: 500,
    y: 300,
    radius: 120,
    stroke: 'black'
});

var circle = new Kinetic.Circle({
    x: orbit.getX() + orbit.getRadius(),
    y: orbit.getY(),
    radius: 5,
    fill: 'green'
});

// The start angle with which the ball is going to change it's position
var angle = 0;

function calculateXForMovingTheBallInTheOrbit(){
    return orbit.getX() + orbit.getRadius() * Math.cos(angle);
}
function calculateYForMovingTheBallInTheOrbit() {
    return orbit.getY() + orbit.getRadius() * Math.sin(angle);
}

var // When SPACE is pressed the ball will stop on some position on the orbit of the board and 
    // the will start to move up and down across the board.
    isSpacePressed = false,
    // When ENTER is pressed the ball will stop on some position on the board and 
    // the slider with the speed will start moving.
    isEnterPressed = false,
    // When SHIFT is pressed the slider will stop on given speed and the dart will hit the board
    // on some sector with points.
    isShiftPressed = false;

function animation() {
    if (isSpacePressed) {
        //TO DO: Logic to move the ball up and down across the board
        return;
    }
    else if (isEnterPressed) {
        // TO DO: Logic to start moving the slider with the speed of the arrow
        return;
    }
    else {
        // Moving the ball in the orbit of the Darts Board
        circle.setX(calculateXForMovingTheBallInTheOrbit());
        circle.setY(calculateYForMovingTheBallInTheOrbit());
        // Updating the angle to change the position of the ball on the orbit
        angle += Math.PI / 54;
    }
    secondLayer.draw();
    requestAnimationFrame(animation);
};

// I tried with addEventListener, but nothing happend
window.onkeydown = function (event) {
    if (event.keyCode === 32) {
        isSpacePressed = true;
    }
    else if (event.keyCode === 13) {
        isEnterPressed = true;
    }
    else if (event.keyCode === 16) {
        isShiftPressed = true;
    }
}

// Adding the orbit and the circle on the second layer
secondLayer.add(orbit);
secondLayer.add(circle);
stage.add(secondLayer);
animation();

boardImage.src = 'dartboard.jpg';