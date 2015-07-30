(function () {
    var showInsertPlayerNamesFields,
        startGame,
        showRules,
        showCredits,
        sayGoodbye,
        showMenu,
        startNewGame,
        exitTheEndScreen,
        endGameScreen,
        startButton,
        rulesButton,
        creditsButton,
        exitButton,
        newGameButton,
        exitEndScreen;

    showInsertPlayerNamesFields = function () {
        var navigation = document.getElementById('navigation'),
            menu = document.getElementById('menu'),
            text = $('<h3 id="insertNames"/>').text('Insert player names:').appendTo('#menu'),
            firstPlayer = $('<input type="text" value="Player 1" id="player-one"></input>').appendTo('#menu'),
            secondPlayer = $('<input type="text" value="Player 2" id="player-two"></input>').appendTo('#menu'),
            playButton = $('<button id="playButton" />').text('Play').appendTo('#menu'),
            backButton = $('<button id="backButton" />')
                .text('Back')
                .css({ "margin-left": "40px", "float": "left" })
                .appendTo('#menu');

        menu.style.backgroundImage = 'none';
        navigation.style.display = 'none';

        playButton.on('click', startGame);
        backButton.on('click', showMenu);
    };

    startGame = function () {
        var menu = document.getElementById('menu'),
            container = document.getElementById('container'),
            firstPlayerName = $("#player-one").val(),
            secondPlayerName = $("#player-two").val();
        
        menu.style.display = 'none';
        container.style.display = 'block';
        gameLoop.gameInit(firstPlayerName, secondPlayerName);
    };

    showRules = function () {
        var navigation = document.getElementById('navigation'),
            menu = document.getElementById('menu'),
            rulesDiv = $('<div id="rules"><h3>Rules:</h3><strong>Welcome to the Dirty Martiny Darts Game!</strong><br/></div>')
                         .appendTo('#menu'),
            rulesParagraph = $('<p />').text('The game is played by two players. The object of the game is one of the players' +
                                             ' to be the first to reach zerofrom starting total of 301. Each round every player' +
                                             ' has 3 darts to throw at the board and the score he hits is substracted of his current' +
                                             'score. Example: If player one has 30 points left he must hit exactly 30 to win ' +
                                             '(25 and 5, three times 10 etc.). If he hits more than 30 points with his three darts,' +
                                             ' his score remains to be 30 and gives the turn to the second player. In simple terms,' +
                                             'after three darts are thrown, the throwing player subtracts the total score from his' +
                                             ' current total until he reaches zero.').appendTo('#rules'),
            backButton1 = $('<button id="backButton" />')
            .text('Back')
            .appendTo('#menu');

        menu.style.backgroundImage = 'none';
        navigation.style.display = 'none';

        backButton.addEventListener('click', showMenu);
    };

    showCredits = function () {
        var navigation = document.getElementById('navigation'),
            menu = document.getElementById('menu'),
            creditsDiv = $('<div id="credits"><h2>Credits:</h2></div>').appendTo('#menu'),
            creditsParagraph = $('<p><h3>Participant - GitHub profile</h3>Nikolay Novkirishki - Novkirishki' +
                                 '<br/>Ivan Vasilev - ivanvasilev<br/>Elina Samardzhieva - ElinaSamardjieva' +
                                 '<br/>Vladimir Dimov - VladimirDimov<br/>Boris Stoyanov - TemplarRei' +
                                 '<br/>Bozhko Bozhkov - bbojkov<br/>Andrey Kirov - Andro0<br/></p>').appendTo('#credits'),
            backButton1 = $('<button id="backButton" />').text('Back').appendTo('#menu');

        menu.style.backgroundImage = 'none';
        navigation.style.display = 'none';

        backButton.addEventListener('click', showMenu);
    };

    sayGoodbye = function () {
        var navigation = document.getElementById('navigation'),
            menu = document.getElementById('menu'),
            goodbyeDiv = $('<div id="goodbye"><h1>Bye bye!</h1></div>').appendTo('#menu'),
            oliveImage = $('<img src="images/arrow.png"/>').appendTo('#goodbye');

        navigation.style.display = 'none';
        menu.style.backgroundImage = 'none';
    };

    showMenu = function () {
        var menu = document.getElementById('menu'),
            navigation = document.getElementById('navigation'),
            backButton = $('#backButton').remove(),
            rules = $('#rules').remove(),
            credits = $('#credits').remove(),
            insertPlayersText = $('#insertNames').remove(),
            playersInputFields = $('input').remove(),
            playButton = $('#playButton').remove();

        menu.style.display = 'block';
        menu.style.backgroundImage = null;
        navigation.style.display = 'block';
    };

    startNewGame = function(){
        var endGameScreen = document.getElementById('endGameScreen'),
            menu = document.getElementById('menu');

        endGameScreen.style.display = 'none';
        menu.style.display = 'block';
        finalSound.pause();
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
    };

    exitTheEndScreen = function () {
        var endMessages = document.getElementById('endMessages'),
            fireworks = document.getElementById('fireworks'),
            goodbyeDiv = $('<div id="goodbye"><h1>Bye bye!</h1></div>').appendTo('#endGameScreen'),
            oliveImage = $('<img id="olive" src="images/arrow.png"/>').appendTo('#endGameScreen');

        endMessages.style.display = 'none';
        fireworks.style.display = 'none';
    };

    startButton = document.getElementById('startButton');
    startButton.addEventListener('click', showInsertPlayerNamesFields);

    rulesButton = document.getElementById('rulesButton');
    rulesButton.addEventListener('click', showRules);

    creditsButton = document.getElementById('creditsButton');
    creditsButton.addEventListener('click', showCredits);

    exitButton = document.getElementById('exitButton');
    exitButton.addEventListener('click', sayGoodbye);

    newGameButton = document.getElementById('newGame');
    newGameButton.addEventListener('click', startNewGame);

    exitEndScreen = document.getElementById('exit');
    exitEndScreen.addEventListener('click', exitTheEndScreen);
}());