var startGame = function () {
    var menu = document.getElementById('menu');
    var container = document.getElementById('container');
    menu.style.display = 'none';
    container.style.display = 'block';
}

var showRules = function () {
    var navigation = document.getElementById('navigation');
    navigation.style.display = 'none';
    var rules = document.getElementById('rules');
    rules.style.display = 'block';
    var menu = document.getElementById('menu');
    menu.style.backgroundImage = 'none';
    var backButton = document.getElementById('backButton');
    backButton.style.display = 'block';
}

var showCredits = function () {
    var navigation = document.getElementById('navigation');
    navigation.style.display = 'none';
    var credits = document.getElementById('credits');
    credits.style.display = 'block';
    var menu = document.getElementById('menu');
    menu.style.backgroundImage = 'none';
    var backButton = document.getElementById('backButton');
    backButton.style.display = 'block';
}

var sayGoodbye = function () {
    var navigation = document.getElementById('navigation');
    navigation.style.display = 'none';
    var menu = document.getElementById('menu');
    menu.style.backgroundImage = 'none';
    var goodbyeText = document.getElementById('goodbye');
    goodbyeText.style.display = 'block';
}

var showMenu = function () {
    var menu = document.getElementById('menu');
    menu.style.display = 'block';
    menu.style.backgroundImage = null;
    var navigation = document.getElementById('navigation');
    navigation.style.display = 'block';
    var backButton = document.getElementById('backButton');
    backButton.style.display = 'none';
    var rules = document.getElementById('rules');
    rules.style.display = 'none';
    var rules = document.getElementById('credits');
    rules.style.display = 'none';
}

var startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);

var rulesButton = document.getElementById('rulesButton');
rulesButton.addEventListener('click', showRules);

var creditsButton = document.getElementById('creditsButton');
creditsButton.addEventListener('click', showCredits);

var exitButton = document.getElementById('exitButton');
exitButton.addEventListener('click', sayGoodbye);

var backButton = document.getElementById('backButton');
backButton.addEventListener('click', showMenu);