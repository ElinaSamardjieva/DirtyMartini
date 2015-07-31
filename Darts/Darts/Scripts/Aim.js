// aiming logic
var Aiming = (function () {
    var HINDSIGHT_RADIUS = 21,
        HINDSIGHT_IMAGE_SCALE = 0.08,
        HINDSIGHT_IMAGE_OFFSET = 250,
        POWERSLIDER_HEIGHT = 5,
        hindsightBackground,
        hindsight,
        powerBar = new Kinetic.Rect({
            stroke: 'black',
            fillLinearGradientColorStops: [0, 'red', 0.5, 'rgb(37,204,4)', 1, 'yellow']
        }),
        powerSlider = new Kinetic.Rect({
            fill: 'black',
            stroke: 'black'
        });



    hindsight = new Kinetic.Circle({
        x: 0,
        y: 0,
        radius: HINDSIGHT_RADIUS
    });
        
    // making hindsight bakcground
    hindsightBackground = new Image();
    hindsightBackground.src = 'images/olive.png';
    hindsightBackground.onload = function () {
        hindsight.setFillPatternImage(hindsightBackground);
        hindsight.fillPatternScale({
            x: HINDSIGHT_IMAGE_SCALE,
            y: HINDSIGHT_IMAGE_SCALE
        });

        hindsight.fillPatternOffset({
            x: HINDSIGHT_IMAGE_OFFSET,
            y: HINDSIGHT_IMAGE_OFFSET
        });
    };

    function calculateHitPoint() {
        var hitPointX = hindsight.getX(),
            power = stage.height() / 2 - powerSlider.getY(),
            hitPointY = hindsight.getY() - power;

        return { x: hitPointX, y: hitPointY };
    }

    return {
        initialize: function initialize() {

            powerBar.x(stage.getWidth() * 67 / 100);
            powerBar.y(stage.getHeight() * 20 / 100);
            powerBar.width(stage.getWidth() * 4 / 100);
            powerBar.height(stage.getHeight() * 60 / 100);
            powerBar.fillLinearGradientStartPoint({ x: 0, y: 0 });
            powerBar.fillLinearGradientEndPoint({ x: 0, y: stage.getHeight() * 60 / 100 });

            powerSlider.x(powerBar.getX() - 5);
            powerSlider.y(stage.height() / 2);
            powerSlider.width(powerBar.width() + 10);
            powerSlider.height(POWERSLIDER_HEIGHT);

            secondLayer.clear();
            secondLayer.add(hindsight);
            secondLayer.add(powerBar);
            secondLayer.add(powerSlider);

            hindsight.opacity(1);

            return Q();
        },
        // This function animates hindsight movement around the target and stops it on keypress
        setAngle: function setAngle() {
            var ORBIT_RADIUS = TARGET_RADIUS + 38,
                HINDSIGHT_MOVING_SPEED = 50,
                deferred = Q.defer(),
                angle = 0, // The start angle with which the ball is going to change it's position
                isSpacePressed = false;

            function calculateXForMovingTheBallInTheOrbit() {
                return TARGET_CENTER_X + ORBIT_RADIUS * Math.cos(angle);
            }

            function calculateYForMovingTheBallInTheOrbit() {
                return TARGET_CENTER_Y + ORBIT_RADIUS * Math.sin(angle);
            }

            function animation() {
                if (isSpacePressed) {
                    deferred.resolve();
                    return;
                }
                else {
                    hindsight.setX(calculateXForMovingTheBallInTheOrbit());
                    hindsight.setY(calculateYForMovingTheBallInTheOrbit());
                       
                    // Updating the angle to change the position of the ball on the orbit
                    angle += Math.PI / HINDSIGHT_MOVING_SPEED;

                    secondLayer.draw();
                }

                requestAnimationFrame(animation);
            }

            window.addEventListener("keydown", function (event) {
                if (event.keyCode === 32) {
                    isSpacePressed = true;
                }
            });
            
            $('#container').on('click', function(){
                isSpacePressed = true;
            });
            
            // document.addEventListener("click", function (event) {
            //     isSpacePressed = true;
            // });

            animation();
            return deferred.promise;
        },
        // This function animates power bar movement and stops it on keypress
        setPower: function setPower() {
            var POWERSLIDER_MOVING_SPEED = 0.03,
                deferred = Q.defer(),
                powerBarTop = powerBar.getY(),
                powerBarBottom = powerBar.getY() + powerBar.height(),
                isSpacePressed = false,
                direction = -1;

            function calculateYForMovingThePowerSlider() {
                var hasPowerSliderReachedPowerBarEnd =
                    ((powerSlider.getY() <= powerBarTop) || (powerSlider.getY() >= powerBarBottom));

                if (hasPowerSliderReachedPowerBarEnd) {
                    // change moving direction
                    direction *= -1;
                }

                return powerSlider.getY() + ((powerBarTop - powerBarBottom) * POWERSLIDER_MOVING_SPEED) * direction;
            }

            function animation() {
                if (isSpacePressed) {
                    // aiming is done and returns target coordinates
                    var hitPoint = calculateHitPoint();
                    // remove olive   
                    hindsight.opacity(0);
                    deferred.resolve(hitPoint);
                    return;
                }
                else {
                    powerSlider.setY(calculateYForMovingThePowerSlider());
                }

                secondLayer.draw();
                requestAnimationFrame(animation);
            }

            window.addEventListener("keydown", function (event) {
                if (event.keyCode === 32) {
                    isSpacePressed = true;
                }
            });
            
            $('#container').on('click', function(){
                isSpacePressed = true;
            });
            
            // window.addEventListener("click", function (event) {
            //     isSpacePressed = true;
            // });
                       
            animation();
            return deferred.promise;
        },
        // This function animates hindsight movement across the target and stops it on keypress
        setPosition: function setPosition() {
            var HINDSIGHT_MOVING_SPEED = 0.03,
                deferred = Q.defer(),
                startPointX = hindsight.getX(),
                startPointY = hindsight.getY(),
                endPointX = TARGET_CENTER_X * 2 - startPointX,
                endPointY = TARGET_CENTER_Y * 2 - startPointY,
                isSpacePressed = false;

            secondLayer.add(hindsight);
                
            // moving logic
            function calculateXForMovingTheHindsightOnTheLine() {
                var hindsightDistanceFromStartingPoint =
                    Math.sqrt(
                        Math.pow(hindsight.getX() - startPointX, 2)
                        + Math.pow(hindsight.getY() - startPointY, 2));
                            
                // if hindsight gets to the end change direction
                if (hindsightDistanceFromStartingPoint >= 2 * (TARGET_RADIUS + 20)) {
                    var bufferX = startPointX,
                        bufferY = startPointY;
                    startPointX = endPointX;
                    startPointY = endPointY;
                    endPointX = bufferX;
                    endPointY = bufferY;
                }

                return hindsight.getX() + (endPointX - startPointX) * HINDSIGHT_MOVING_SPEED;
            }

            function calculateYForMovingTheHindsightOnTheLine() {
                return hindsight.getY() + (endPointY - startPointY) * HINDSIGHT_MOVING_SPEED;
            }

            function animation() {
                if (isSpacePressed) {
                    deferred.resolve();
                    return;
                }
                else {
                    hindsight.setX(calculateXForMovingTheHindsightOnTheLine());
                    hindsight.setY(calculateYForMovingTheHindsightOnTheLine());
                }

                secondLayer.draw();
                requestAnimationFrame(animation);
            }

            window.addEventListener("keydown", function (event) {
                if (event.keyCode === 32) {
                    isSpacePressed = true;
                }
            });
            
            // window.addEventListener("click", function (event) {
            //     isSpacePressed = true;
            // });
            
            $('#container').on('click', function(){
                isSpacePressed = true;
            });

            animation();
            return deferred.promise;
        }
    }
} ());