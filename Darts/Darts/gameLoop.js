var gameLoop = (function () {
    return {
        gameInit: function () {
            var newGame = gameCreator.createNewGame();
            newGame.addPlayer('Ivancho');
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
                        if (newGame._playerOnMove._score <= 1) {
                            endGame(newGame._playerOnMove.name);
                            return;
                        }
                        newGame._playerOnMove.shotsLeft -= 1;
                        console.log(newGame._playerOnMove.shotsLeft);
                        // print score on SVG
                        console.log(newGame._playerOnMove._score);
                        if (newGame._playerOnMove.shotsLeft <= 0) {
                            newGame.nextPlayer();
                            console.log(newGame._playerOnMove.name);
                        }

                        aimSequence();
                    })
                    .done();
            }

            function endGame(winner) {
                var container = $("#container"),
                    endGameScreen = $('#endGameScreen'),
                    winnerName = $("#winner-name");

                container.hide();
                winnerName.text(winner);
                endGameScreen.show();
            }
        }
    }
}());
