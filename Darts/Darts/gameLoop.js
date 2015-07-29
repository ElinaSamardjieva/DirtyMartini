var gameLoop = (function () {
    return {
        gameInit: function () {
            var newGame = gameCreator.createNewGame();
            newGame.addPlayer('Pesho'); // Add logic for naming players when it's done
            newGame.startGame();

            aimSequence();

            function aimSequence() {
                Aiming.initialize()
                    .then(Aiming.setAngle)
                    .then(Aiming.setPosition)
                    .then(Aiming.setPower)
                    .then(Shooting.shoot)
                    .then(function (hitPointsObject) {
                        var pointsToSubstract = determinePointsForShot.determineSector(hitPointsObject);
                        newGame._playerOnMove.substractScore(pointsToSubstract);
                        if (newGame._playerOnMove._score === 0) {
                            endGame();
                        }
                        newGame._playerOnMove.shotsLeft -= 1;
                        // print score on SVG
                        console.log(newGame._playerOnMove._score);
                        if (newGame._playerOnMove.shotsLeft <= 0) {
                            newGame.nextPlayer();
                        }

                        aimSequence();
                    })
                    .done();
            }

            function endGame() {
                // do stuff?
            }

        }
    }
}());
