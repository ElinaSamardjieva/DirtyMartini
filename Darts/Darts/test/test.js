var expect = require('chai').expect;
var gameCreator = require('../gameCreator');

var newGame = gameCreator.createNewGame();

describe('gameCreator tests', function() {
	it('Should be able to create new game', function() {
		expect(newGame).to.exist;
	});

	it('Should throw when when try to create second game', function() {
		expect(function() {
			var secondGame = gameCreator.createNewGame();
		}).to.throw();
	});

	it('Should be able to add new player', function() {
		newGame.addPlayer('Pesho');
		expect(newGame._players.length).to.equal(1);
	});

	it('Should be able to add more than one players', function() {
		newGame.addPlayer('gosho');
		newGame.addPlayer('ivan');
		expect(newGame._players.length).to.equal(3);
	});

	it('Should throw when empty player name is passed', function() {
		expect(function() {
			newGame.addPlayer('');
		}).to.throw();
	});

	it('Should throw when short player name is passed', function() {
		expect(function() {
			newGame.addPlayer('A');
		}).to.throw();
	});

	it('Should throw when more than 10 characters player name is passed', function() {
		expect(function() {
			newGame.addPlayer('Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		}).to.throw();
	});

	it('Each player must start with 50 points', function() {
		var checkPoints = true;
		newGame.startGame();
		for (var i = 0; i < newGame._players.length; i++) {
			if (newGame._players[i].score !== 50) {
				checkPoints = false;
				break;
			};
		};
		expect(checkPoints).to.be.true;
	});

	it('Should subtract points corectly', function() {
		newGame._players[0]._score = 50;
		newGame._players[0].substractScore(20);
		expect(newGame._players[0].score).to.equal(30);
	});

	it('Should throw when negative points are being substracted', function() {
		expect(function() {
			newGame._players[0].substractScore(-20);
		}).to.throw();
	});

	Array.prototype.sum = function() {
		var sum = 0;
		for (var i = 0; i < this.length; i++) {
			sum += this[i];
		}

		return sum;
	}

	it('Should return correct winning shots combinations', function() {
		newGame._players[0]._score = 30;
		newGame._players[0].shotsLeft = 3;
		var winningShots = newGame._players[0].getWinningShots();
		var isSumCorrect = true;

		for (var i = 0; i < winningShots.length; i++) {
			if (winningShots[i].sum() !== 30) {
				isSumCorrect = false;
				break;
			};
		}

		expect(isSumCorrect).to.be.true;
	});
});