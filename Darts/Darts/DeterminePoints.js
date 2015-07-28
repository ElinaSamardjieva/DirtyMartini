var determinePointsForShot = function () {

    return {
        determineSector: function (hitPoint) {
            var sectors = stage.getAllIntersections(hitPoint),
                pointsToSubstract,
                isInLemon,
                isInInnerCircle,
                isInOuterEye,
                isInBullsEye,
                isInTarget;

            isInLemon = sectors.some(function (value) {
                return value.fill === 'brown';
            });

            isInInnerCircle = sectors.some(function (value) {
                return value.fill === 'red';
            });

            isInOuterEye = sectors.some(function (value) {
                return value.fill === 'white';
            });

            isInBullsEye = sectors.some(function (value) {
                return value.fill === 'black';
            });

            isInTarget = sectors.length > 0;

            if (isInBullsEye) {
                pointsToSubstract = 25;
            } else if (isInOuterEye) {
                pointsToSubstract = 15;
            } else if (isInLemon && isInInnerCircle) {
                pointsToSubstract = 10;
            } else if (isInLemon) {
                pointsToSubstract = 20;
            } else if (isInInnerCircle) {
                pointsToSubstract = 5;
            } else if (isInTarget) {
                pointsToSubstract = 10;
            }
            return pointsToSubstract;
        }
    }
}();