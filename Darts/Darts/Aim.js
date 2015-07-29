// aiming logic
var Aiming = (function () {
    var hindsight,
        powerBar,
        powerSlider;

    function calculateHitPoint() {
        var hitPointX = hindsight.getX(),
            power = stage.height() / 2 - powerSlider.getY(),
            hitPointY = hindsight.getY() - power +
                (hindsight.getHeight() / 2) +
                (hindsight.getWidth() / 2);

        return { x: hitPointX, y: hitPointY };
    }

    return {
        initialize: function initialize() {
            var HINDSIGHT_RADIUS = 21,
                HINDSIGHT_IMAGE_SCALE = 0.08,
                HINDSIGHT_IMAGE_OFFSET = 250,
                POWERSLIDER_HEIGHT = 5;

            hindsight = new Kinetic.Circle({
                x: 0,
                y: 0,
                radius: HINDSIGHT_RADIUS
            });
            
            // making hindsight bakcground
            var hindsightBackground = new Image();
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
            }


            powerBar = new Kinetic.Rect({
                x: stage.getWidth() * 90 / 100,
                y: stage.getHeight() * 20 / 100,
                width: stage.getWidth() * 5 / 100,
                height: stage.getHeight() * 60 / 100,
                fillLinearGradientStartPoint: { x: 0, y: 0 },
                fillLinearGradientEndPoint: { x: 0, y: stage.getHeight() * 60 / 100 },
                fillLinearGradientColorStops: [0, 'red', 0.5, 'rgb(37,204,4)', 1, 'yellow'],
                stroke: 'black'
            });

            powerSlider = new Kinetic.Rect({
                x: powerBar.getX() - 5,
                y: stage.height() / 2,
                width: powerBar.width() + 10,
                height: POWERSLIDER_HEIGHT,
                fill: 'black',
                stroke: 'black'
            });

            secondLayer.add(powerBar);
            secondLayer.add(powerSlider);

            return Q();
        },
        // This function animates hindsight movement around the target and stops it on keypress
        setAngle: function setAngle() {
            var ORBIT_ADDITIONAL_RADIUS = 38,
                HINDSIGHT_MOVING_SPEED = 50,
                deferred = Q.defer(),
                orbit = new Kinetic.Circle({
                    x: targetCenterX,
                    y: targetCenterY,
                    radius: targetRadius + ORBIT_ADDITIONAL_RADIUS,
                    stroke: 'lightblue',
                    opacity: 0
                }),
                angle = 0, // The start angle with which the ball is going to change it's position
                isSpacePressed = false;

            secondLayer.add(orbit);
            secondLayer.add(hindsight);

            function calculateXForMovingTheBallInTheOrbit() {
                return orbit.getX() + orbit.getRadius() * Math.cos(angle);
            }

            function calculateYForMovingTheBallInTheOrbit() {
                return orbit.getY() + orbit.getRadius() * Math.sin(angle);
            }

            function animation() {
                if (isSpacePressed) {
                    // call the next function and stop this one
                    // return;
                    deferred.resolve();
                }
                else {
                    hindsight.setX(calculateXForMovingTheBallInTheOrbit());
                    hindsight.setY(calculateYForMovingTheBallInTheOrbit());
                       
                    // Updating the angle to change the position of the ball on the orbit
                    angle += Math.PI / HINDSIGHT_MOVING_SPEED;
                }

                secondLayer.draw();
                requestAnimationFrame(animation);
            };

            window.addEventListener("keydown", function (event) {
                if (event.keyCode === 32) {
                    isSpacePressed = true;
                }
            });

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
                    hindsight.remove();
                    // call function for animating arrow movement
                    deferred.resolve(hitPoint);
                }
                else {
                    powerSlider.setY(calculateYForMovingThePowerSlider());
                }

                secondLayer.draw();
                requestAnimationFrame(animation);
            };

            window.addEventListener("keydown", function (event) {
                if (event.keyCode === 32) {
                    isSpacePressed = true;
                }
            });

            animation();
            return deferred.promise;
        },
        // This function animates hindsight movement across the target and stops it on keypress
        setPosition: function setPosition() {
            var HINDSIGHT_MOVING_SPEED = 0.03,
                deferred = Q.defer(),
                startPointX = hindsight.getX(),
                startPointY = hindsight.getY(),
                endPointX = targetCenterX * 2 - startPointX,
                endPointY = targetCenterY * 2 - startPointY,
                isSpacePressed = false,
                line = new Kinetic.Line({
                    points: [startPointX, startPointY, endPointX, endPointY],
                    stroke: 'lightblue',
                    opacity: 0
                });

            secondLayer.add(line);
            secondLayer.add(hindsight);
                
            // moving logic
            function calculateXForMovingTheHindsightOnTheLine() {
                var hindsightDistanceFromStartingPoint =
                    Math.sqrt(
                        Math.pow(hindsight.getX() - startPointX, 2)
                        + Math.pow(hindsight.getY() - startPointY, 2));
                            
                // if hindsight gets to the end change direction
                if (hindsightDistanceFromStartingPoint >= 2 * (targetRadius + 20)) {
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
                }
                else {
                    hindsight.setX(calculateXForMovingTheHindsightOnTheLine());
                    hindsight.setY(calculateYForMovingTheHindsightOnTheLine());
                }

                secondLayer.draw();
                requestAnimationFrame(animation);
            };

            window.addEventListener("keydown", function (event) {
                if (event.keyCode === 32) {
                    isSpacePressed = true;
                }
            });

            animation();
            return deferred.promise;
        }
    }
} ());