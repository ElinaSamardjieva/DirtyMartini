var gameLoop = (function () {
    return {
        gameInit: function (firstPlayerName, secondPlayerName) {
            var newGame = gameCreator.createNewGame();
            newGame.addPlayer(firstPlayerName);
            newGame.addPlayer(secondPlayerName); // Add logic for naming players when it's done
            newGame.startGame();
            scoreBoard.create(newGame._players[0], newGame._players[1]);
            scoreBoard.update(newGame._playerOnMove);
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
                        
                        if (newGame._playerOnMove._score <= 0) {
                            endGame(newGame._playerOnMove.name);
                            return;
                        }
                        
                        newGame._playerOnMove.shotsLeft -= 1;
                        if (newGame._playerOnMove.shotsLeft <= 0) {
                            newGame.nextPlayer();
                            secondLayer.removeChildren();
                        }
                        
                        scoreBoard.update(newGame._playerOnMove);             
                        aimSequence();
                    })
                    .done();
            }

            function endGame(winner) {
                var container = $("#container"),
                    endGameScreen = $('#endGameScreen'),
                    winnerName = $("#winner-name");

                container.hide();
                secondLayer.removeChildren();
                scoreBoard.clearPaper();
                winnerName.text(winner);
                endGameScreen.show();
                
                if (isSoundOn) {                   
                    finalSound = new Audio('music/final.mp3');
                    backgroundMusic.pause();
                    finalSound.play();
                }
            }
        }
    }
}());
