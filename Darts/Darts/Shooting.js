// makes the animation of the arrow hitting the target
var Shooting = (function () {
	return {
		shoot: function (hitPointObject) {
            var deferred = Q.defer(),
                arrowBackground = new Image(); // making arrow background
            arrowBackground.src = 'images/olive.png';
			
			// initial position is down right from target
			var arrow = new Kinetic.Rect({
    				x: targetCenterX + targetRadius / Math.sqrt(2),
    				y: targetCenterY + targetRadius/ Math.sqrt(2),
    				width: 77,
    				height: 77,
                    fillPatternImage: arrowBackground,
                    fillPatternOffset: { x: 0, y: 0},
                    fillPatternScale: {x: 0.15, y: 0.15},
    			}),
                DELTA_X = (hitPointObject.x - arrow.getX()) / 120,
                DELTA_Y = (hitPointObject.y - arrow.getY()) / 120,
                DELTA_SCALE = 0.99; // coeff of arrow getting smaller
			
            secondLayer.add(arrow);
                 
            function animation() {
                if (arrow.getX() - (hitPointObject.x - arrow.height() / 2) < 1) { // when arrow hits targetPoint
                    deferred.resolve(hitPointObject);
                }
                else {
                    arrow.setX(arrow.getX() + DELTA_X);
                    arrow.setY(arrow.getY() + DELTA_Y);
                    arrow.width(arrow.width() * DELTA_SCALE);
                    arrow.height(arrow.height() * DELTA_SCALE);
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