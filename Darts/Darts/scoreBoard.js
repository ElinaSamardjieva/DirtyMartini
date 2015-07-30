function svgDisplay(x, y, width, height, nameOnePlayer, nameTwoPlayer, playerObjectOne, playerObjectTwo) {
    var paper,
        player1 = playerObjectOne,
        player2 = playerObjectTwo,
        scorePlayerOne,
        scorePlayerTwo,
        board,
        verticalLine,
        horziontalLine,
        path1,
        path2,
        playerOneName,
        playerTwoName,
        playerOneScores,
        playerTwoScores;

    function create() {
        paper = Raphael(x, y, width, height);
        board = paper.rect(0, 0, width, height,50);
        board.attr('fill','rgba(200,200,200,0.7)');
        board.attr({'stroke-width': 0,'stroke': "#fff"});
        path1 = "M0 50 H" + width;
        path2 = "M" + width / 2 + " 0 V" + height;
        horziontalLine = paper.path(path1);
        horziontalLine.attr('stroke', '#fff');
        verticalLine = paper.path(path2);
        verticalLine.attr('stroke', '#fff');
        addPlayerName(nameOnePlayer, 1);
        addPlayerName(nameTwoPlayer, 2);
        scorePlayerOne = addPlayerScore(1);
        scorePlayerTwo = addPlayerScore(2);
    }

    function update() {
        scorePlayerOne.attr('text', player1.score);
        scorePlayerTwo.attr('text', player2.score);
        requestAnimationFrame(update);
    }

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

    create();
    update();
}

playerOneName = 'Michael'; //playerOneName;
playerTwoName = 'Pesho';//playerTwoName;
playerOneScores = {score: 12};
playerTwoScores = {score: 10};


svgDisplay(1012, 10, 348, 595, playerOneName, playerTwoName, playerOneScores, playerTwoScores);