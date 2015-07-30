var determinePointsForShot = function () {

    return {
        determineSector: function (hitPoint) {
            var MINIMUM_OBJECTS_ON_CANVAS = 3,
            sectors = stage.getAllIntersections(hitPoint),
                lemonColors = {'gray': 1, 'yellow': 2, 'cyan': 3, 'orange': 4, 'green': 5},
                pointsToSubstract = 0,
                isInLemon,
                isInInnerCircle,
                isInOuterEye,
                isInBullsEye,
                isInTarget,
                lemonPoints;

            // Check which sectors intersect with the hitpoint, based on their fill color

            isInLemon = sectors.some(function (value) {
                var isInLemon = value.attrs.fill === 'brown';

                // Check which lemon the hitpoint is in, based on it's stroke color

                if (isInLemon) {
                    lemonPoints = lemonColors[value.attrs.stroke];
                }

                return isInLemon;
            });

            isInInnerCircle = sectors.some(function (value) {
                return value.attrs.fill === 'red';
            });

            isInOuterEye = sectors.some(function (value) {
                return value.attrs.fill === 'white';
            });

            isInBullsEye = sectors.some(function (value) {
                return value.attrs.fill === 'black';
            });

            isInTarget = sectors.length > MINIMUM_OBJECTS_ON_CANVAS;

            // Based on sector priority, return the points for substraction for the player.

            if (isInBullsEye) {
                pointsToSubstract = 12;
            } else if (isInOuterEye) {
                pointsToSubstract = 10;
            } else if (isInLemon && isInInnerCircle) {
                pointsToSubstract = lemonPoints * 2;
            } else if (isInLemon && isInTarget) {
                pointsToSubstract = lemonPoints * 3;
            } else if (isInInnerCircle) {
                pointsToSubstract = 5;
            } else if (isInTarget) {
                pointsToSubstract = 7;
            }

            return pointsToSubstract;
        }
    }
}();