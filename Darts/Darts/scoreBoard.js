var scoreBoard = (function () {
    var paper,
        player1,
        player2,
        scorePlayerOne,
        scorePlayerTwo,
        board,
        verticalLine,
        horziontalLine,
        path1,
        path2,
        x = 1012,
        y = 10,
        width = 348,
        height = 595;

    return {

        create: function create(playerOneObject, playerTwoObject) {
            player1 = playerOneObject;
            player2 = playerTwoObject;
            paper = Raphael(x, y, width, height);
            board = paper.rect(0, 0, width, height, 50);
            board.attr('fill', 'rgba(200,200,200,0.7)');
            board.attr({'stroke-width': 0, 'stroke': "#fff"});
            path1 = "M0 50 H" + width;
            path2 = "M" + width / 2 + " 0 V" + height;
            horziontalLine = paper.path(path1);
            horziontalLine.attr('stroke', '#fff');
            verticalLine = paper.path(path2);
            verticalLine.attr('stroke', '#fff');
            addPlayerName(player1.name, 1);
            addPlayerName(player2.name, 2);
            scorePlayerOne = addPlayerScore(1);
            scorePlayerTwo = addPlayerScore(2);
        },

        update: function update() {
            scorePlayerOne.attr('text', player1.score);
            scorePlayerTwo.attr('text', player2.score);
            requestAnimationFrame(update);
        },

        clearPaper: function clearPaper() {
            paper.clear();
        }
    };

        function addPlayerName(name, playerNumber) {
            var name = paper.text(80 + (playerNumber - 1) * width / 2, 25, name);
            name.attr({"font-size": 28, "font-family": "Broadway"});
            name.attr('fill', '#000');
            name.attr('stroke', '#000');

            return name;
        }

    function addPlayerScore(playerNumber) {
        var t = paper.text(80 + (playerNumber - 1) * width / 2, 90, '0');
        t.attr('text', 0);
        t.attr({"font-size": 28, "font-family": "Broadway"});
        t.attr('fill', '#000');
        t.attr('stroke', '#000');

        return t;
    }

    if (player1.score == undefined) {
        throw new Error('PlayerOne does not have score!');
    }

    if (player2.score == undefined) {
        throw new Error('PlayerTwo does not have score!');
    }
}());