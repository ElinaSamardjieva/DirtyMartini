// aiming logic
var Aiming = (function() {
    return {
        aim: function (targetCenterX, targetCenterY, targetRadius, callback) {
        
            var hindsight = new Kinetic.Circle({
                x: 0,
                y: 0,
                radius: 21,
            });
            
            //making hindsight bakcground
            var hindsightBackground = new Image();
            hindsightBackground.src = 'images/olive.png';
            hindsightBackground.onload = function() {
                hindsight.setFillPatternImage(hindsightBackground);
                hindsight.fillPatternScale({
                    x: 0.08,
                    y: 0.08
                });
                
                hindsight.fillPatternOffset({
                  x: 250,
                  y: 250
                });
            }
                                   
            var powerBar = new Kinetic.Rect({
                x: stage.getWidth() * 90/100,
                y: stage.getHeight() * 20/100,
                width: stage.getWidth() * 5/100,
                height: stage.getHeight() * 60/100,
                fillLinearGradientStartPoint: {x: 0, y: 0},
                fillLinearGradientEndPoint: {x: 0,y: stage.getHeight() * 60/100},
                fillLinearGradientColorStops: [0, 'red', 0.5, 'rgb(37,204,4)', 1, 'yellow'],
                stroke: 'black'
            });
                    
            var powerSlider = new Kinetic.Rect({
                x: powerBar.getX() - 5,
                y: stage.height() / 2,
                width: powerBar.width() + 10,
                height: 5,
                fill: 'black',
                stroke: 'black'
            });
               
            secondLayer.add(powerBar);
            secondLayer.add(powerSlider);
            
            // This function animates hindsight movement around the target and stops it on keypress
            function setAngle (resolve, reject) {  
                
                var orbit = new Kinetic.Circle({
                    x: targetCenterX,
                    y: targetCenterY,
                    radius: targetRadius + 20,
                    stroke: 'lightblue'
                });
                
                var angle = 0, // The start angle with which the ball is going to change it's position
                    isSpacePressed = false;     
                
                secondLayer.add(orbit); 
                secondLayer.add(hindsight);
                
                function calculateXForMovingTheBallInTheOrbit(){
                    return orbit.getX() + orbit.getRadius() * Math.cos(angle);
                }
                
                function calculateYForMovingTheBallInTheOrbit() {
                    return orbit.getY() + orbit.getRadius() * Math.sin(angle);
                }
                     
                function animation() {
                    if (isSpacePressed) {
                        // call the next function and stop this one
                        setPosition();
                        return;
                    }
                    else {
                       hindsight.setX(calculateXForMovingTheBallInTheOrbit());
                       hindsight.setY(calculateYForMovingTheBallInTheOrbit());
                       
                       // Updating the angle to change the position of the ball on the orbit
                       angle += Math.PI / 50;
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
            }
            
            // This function animates hindsight movement across the target and stops it on keypress
            function setPosition () {
                var startPointX = hindsight.getX(),
                    startPointY = hindsight.getY(),
                    endPointX = targetCenterX * 2 - startPointX,
                    endPointY = targetCenterY * 2 - startPointY,
                    isSpacePressed = false;
                 
                var line = new Kinetic.Line({
                    points: [startPointX, startPointY, endPointX, endPointY],
                    stroke: 'lightblue',
                });     
                
                secondLayer.add(line);
                secondLayer.add(hindsight);
                
                // moving logic
                function calculateXForMovingTheHindsightOnTheLine(){           
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
                    
                    return hindsight.getX() + (endPointX - startPointX) * 0.03;
                }
                
                function calculateYForMovingTheHindsightOnTheLine() {
                    return hindsight.getY() + (endPointY - startPointY)* 0.03;
                }
                     
                function animation() {
                    if (isSpacePressed) {
                        setPower();
                        return;
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
            }
            
            // This function animates power bar movement and stops it on keypress
            function setPower () {
                var powerBarTop = powerBar.getY(),
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
                    
                    return powerSlider.getY() + ((powerBarTop - powerBarBottom) * 0.03) * direction;
                }
                     
                function animation() {
                    if (isSpacePressed) {
                        // aiming is done and returns target coordinates
                        var hitPoint = calculateHitPoint();
                        console.log(hitPoint);
                        // call function for calculating points according to hitPoint
                        // TODO
        				// callback();
                        return;
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
            }
            
            function calculateHitPoint() {
                var hitPointX = hindsight.getX(),
                    power = stage.height() / 2 - powerSlider.getY(),
                    hitPointY = hindsight.getY() - power * 2;
                 
                return {x: hitPointX, y: hitPointY};
            }
            
            setAngle(); 
        }
    }
}())