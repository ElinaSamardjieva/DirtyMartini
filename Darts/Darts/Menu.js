(function () {
    var showInsertPlayerNamesFields = function () {
        var navigation = document.getElementById('navigation');
        navigation.style.display = 'none';
        var menu = document.getElementById('menu');
        menu.style.backgroundImage = 'none';
        var text = $('<h3 id="insertNames"/>').text('Insert player names:').appendTo('#menu');
        var firstPlayer = $('<input type="text" value="Player 1"></input>').appendTo('#menu');
        var secondPlayer = $('<input type="text" value="Player 2"></input>').appendTo('#menu');
        var playButton = $('<button id="playButton" />').text('Play').appendTo('#menu');
        var backButton = $('<button id="backButton" />').text('Back').css({ "margin-left": "40px", "float": "left" }).appendTo('#menu');
        playButton.on('click', startGame);
        backButton.on('click', showMenu);
    }

    var startGame = function () {
        var menu = document.getElementById('menu');
        var container = document.getElementById('container');
        menu.style.display = 'none';
        container.style.display = 'block';
    };

    var showRules = function () {
        var navigation = document.getElementById('navigation');
        navigation.style.display = 'none';
        var menu = document.getElementById('menu');
        menu.style.backgroundImage = 'none';
        var rulesDiv = $('<div id="rules"><h3>Rules:</h3><strong>Welcome to the Dirty Martiny Darts Game!</strong><br/></div>')
                         .appendTo('#menu');
        var rulesParagraph = $('<p />').text('The game is played by two players. The object of the game is one of the players' +
                                             ' to be the first to reach zerofrom starting total of 301. Each round every player' +
                                             ' has 3 darts to throw at the board and the score he hits is substracted of his current' +
                                             'score. Example: If player one has 30 points left he must hit exactly 30 to win ' +
                                             '(25 and 5, three times 10 etc.). If he hits more than 30 points with his three darts,' +
                                             ' his score remains to be 30 and gives the turn to the second player. In simple terms,' +
                                             'after three darts are thrown, the throwing player subtracts the total score from his' +
                                             ' current total until he reaches zero.').appendTo('#rules');
        var backButton1 = $('<button id="backButton" />').text('Back').appendTo('#menu');
        backButton.addEventListener('click', showMenu);
    };

    var showCredits = function () {
        var navigation = document.getElementById('navigation');
        navigation.style.display = 'none';
        var menu = document.getElementById('menu');
        menu.style.backgroundImage = 'none';
        var creditsDiv = $('<div id="credits"><h2>Credits:</h2></div>').appendTo('#menu');
        var creditsParagraph = $('<p><h3>Participant - GitHub profile</h3>Nikolay Novkirishki - Novkirishki' +
                                 '<br/>Ivan Vasilev - ivanvasilev<br/>Elina Samardzhieva - ElinaSamardjieva' +
                                 '<br/>Vladimir Dimov - VladimirDimov<br/>Boris Stoyanov - TemplarRei' +
                                 '<br/>Bozhko Bozhkov - bbojkov<br/>Andrey Kirov - Andro0<br/></p>').appendTo('#credits');
        var backButton1 = $('<button id="backButton" />').text('Back').appendTo('#menu');
        backButton.addEventListener('click', showMenu);
    };

    var sayGoodbye = function () {
        var navigation = document.getElementById('navigation');
        navigation.style.display = 'none';
        var menu = document.getElementById('menu');
        menu.style.backgroundImage = 'none';
        var goodbyeDiv = $('<div id="goodbye"><h1>Bye bye!</h1></div>').appendTo('#menu');
        var oliveImage = $('<img src="images/arrow.png"/>').appendTo('#goodbye');
    };

    var showMenu = function () {
        var menu = document.getElementById('menu');
        menu.style.display = 'block';
        menu.style.backgroundImage = null;
        var navigation = document.getElementById('navigation');
        navigation.style.display = 'block';
        var backButton = $('#backButton').remove();
        var rules = $('#rules').remove();
        var credits = $('#credits').remove();
        var insertPlayersText = $('#insertNames').remove();
        var playersInputFields = $('input').remove();
        var playButton = $('#playButton').remove();
    };

    var startNewGame = function(){
        var endGameScreen = document.getElementById('endGameScreen');
        var menu = document.getElementById('menu');
        endGameScreen.style.display = 'none';
        menu.style.display = 'block';
    }

    var exitTheEndScreen = function () {
        var endMessages = document.getElementById('endMessages');
        endMessages.style.display = 'none';
        var fireworks = document.getElementById('fireworks');
        fireworks.style.display = 'none';
        var goodbyeDiv = $('<div id="goodbye"><h1>Bye bye!</h1></div>').appendTo('#endGameScreen');
        var oliveImage = $('<img id="olive" src="images/arrow.png"/>').appendTo('#endGameScreen');
    };

    var startButton = document.getElementById('startButton');
    startButton.addEventListener('click', showInsertPlayerNamesFields);

    var rulesButton = document.getElementById('rulesButton');
    rulesButton.addEventListener('click', showRules);

    var creditsButton = document.getElementById('creditsButton');
    creditsButton.addEventListener('click', showCredits);

    var exitButton = document.getElementById('exitButton');
    exitButton.addEventListener('click', sayGoodbye);

    var newGameButton = document.getElementById('newGame');
    newGameButton.addEventListener('click', startNewGame);

    var exitEndScreen = document.getElementById('exit');
    exitEndScreen.addEventListener('click', exitTheEndScreen);
}());