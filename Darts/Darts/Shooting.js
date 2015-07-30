// makes the animation of the arrow hitting the target
var Shooting = (function () {
	return {
		shoot: function (hitPointObject) {
            var deferred = Q.defer(),
                arrowBackground = new Image(); // making arrow background
            arrowBackground.src = 'images/olive.png';
            if (isSoundOn) {                
                var splashSound = new Audio('music/splash.mp3');
                setTimeout(function(){ splashSound.play(); }, 500);
            }            
			
			// initial position is down right from target
			var arrow = new Kinetic.Circle({
    				x: TARGET_CENTER_X + TARGET_RADIUS,
    				y: TARGET_CENTER_Y + TARGET_RADIUS / Math.sqrt(2),
    				radius: 70,
                    fillPatternImage: arrowBackground,
                    fillPatternOffset: { x: 250, y: 250},
                    fillPatternScale: {x: 0.27, y: 0.27},
    			}),
                DELTA_X = (hitPointObject.x - arrow.getX()) / 60,
                DELTA_Y = (hitPointObject.y - arrow.getY()) / 60,
                DELTA_SCALE = 0.975; // coeff of arrow getting smaller
			
            secondLayer.add(arrow);
                 
            function animation() {
                if (arrow.getX() - hitPointObject.x < 1) { // when arrow hits targetPoint
                    deferred.resolve(hitPointObject);
                    return;
                }
                else {
                    arrow.setX(arrow.getX() + DELTA_X);
                    arrow.setY(arrow.getY() + DELTA_Y);
                    arrow.radius(arrow.radius() * DELTA_SCALE);
                    arrow.fillPatternScaleX(arrow.fillPatternScaleX() * DELTA_SCALE);
                    arrow.fillPatternScaleY(arrow.fillPatternScaleY() * DELTA_SCALE);
                }
                 
                secondLayer.draw();
                requestAnimationFrame(animation);
            };
            
            animation();
            return deferred.promise;
		}
	}
}());