// makes the animation of the arrow hitting the target
var Shooting = (function () {
	return {
		shoot: function (hitPointX, hitPointY) {
                       
			// making arrow bakcground
            var arrowBackground = new Image();
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
			});
			
			var deltaX = (hitPointX - arrow.getX()) / 120,
                deltaY = (hitPointY - arrow.getY()) / 120,
                deltaScale = 0.99; // coeff of arrow getting smaller
			
            secondLayer.add(arrow);
                 
            function animation() {
                if (arrow.getX() - (hitPointX - arrow.height() / 2 ) < 1) { // when arrow hits targetPoint
                    return;
                }
                else {
                    arrow.setX(arrow.getX() + deltaX);
                    arrow.setY(arrow.getY() + deltaY);
                    arrow.width(arrow.width() * deltaScale);
                    arrow.height(arrow.height() * deltaScale);
                    arrow.fillPatternScaleX(arrow.fillPatternScaleX() * deltaScale);
                    arrow.fillPatternScaleY(arrow.fillPatternScaleY() * deltaScale);
                }
                 
                secondLayer.draw();
                requestAnimationFrame(animation);
            };
            
            animation();
		}
	}
}());