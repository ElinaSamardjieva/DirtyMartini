var gameCreator = (function() {
	var playerStartingScore = 50,
		possibleShots = [2, 3, 4, 6, 8, 9, 10, 12, 15],
		maxShot = 15,
		shotsPerRound = 3,
		validators,
		game;

	validators = {
		validateNonNullableString: function(value, variableName) {
			if (value === null || typeof(value) !== 'string') {
				throw new Error(variableName + ' must be a valid string.');
			}
		},
		validateStringLength: function(value, minLength, maxLength, variableName) {
			this.validateNonNullableString(value, variableName);
			if (value.length < minLength || value.length > maxLength) {
				throw new Error(variableName + ' length must be between ' + minLength + ' and ' + maxLength + ' characters.');
			}
		},
		validateNumber: function(value, variableName) {
			if (typeof(value) !== 'number') {
				throw new Error(variableName + ' must be a number.');
			}
		},
		validateNonNegativeNumber: function(value, variableName) {
			this.validateNumber(value, variableName);
			if (value < 0) {
				throw new Error(variableName + ' cannot be negative.');
			}
		}
	};

	game = (function() {
		var playerOnMoveIndex = 0,
			game = {
				init: function() {
					this._players = [];
					this._playerOnMove = null;

					return this;
				},

				get playerOnMove() {
					return this._playerOnMove;
				},

				set playerOnMove(value) {
					if (player === null) {
						throw new Error('Invalid null player cannot be set as current player on move');
					}

					this._playerOnMove = value;
				},

				get players(){
					return this._players;
				},

				addPlayer: function(name) {
					validators.validateStringLength(name, 2, 10, 'Player name');
					var numberOfPalyers = this._players.Length;
					if (numberOfPalyers > 0) {
						for (var i = 0; i < numberOfPalyers; i++) {
							if (value === this._players[i]) {
								throw new Error('A plyer with name ' + name + ' already exist');
							}
						}
					}
					this._players.push(player.get(name));
				},

				// Sets the first added player as playerOnMove
				startGame: function() {
					var numberOfPlayers = this._players.length;

					if (numberOfPlayers === 0) {
						throw new Error('No players in the game.');
					}

					playerOnMoveIndex = 0;

					this.playerOnMove = this._players[playerOnMoveIndex];
				},

				// Sets the next player as playerOnMove (rotates the players list);
				// Resets the player shots left.
				nextPlayer: function() {
					if (this._playerOnMove === null) {
						throw new Error('No active player.');
					}

					playerOnMoveIndex = (playerOnMoveIndex + 1) % (this._players.length);
					this.playerOnMove = this._players[playerOnMoveIndex];
					this.playerOnMove.shotsLeft = shotsPerRound;
				}
			};

		return {
			get: function() {
				return Object.create(game).init();
			}
		};
	})();

	var player = (function() {
		var player = {
			init: function(name) {
				this.name = name;
				this._score = playerStartingScore;
				this._shotsLeft = 3;
				return this;
			},

			get shotsLeft() {
				return this._shotsLeft;
			},

			set shotsLeft(value) {
				this._shotsLeft = value;
			},

			substractScore: function(value) {
				validators.validateNonNegativeNumber(value);
				if (this._score - value >= 0 && this._score - value !== 1) {
					this._score -= value;
				}
			},

			get score() {
				return this._score;
			},

			// Finds all winning shots combinations for the shots left and returns array
			getWinningShots: function() {
				var winningShots = [];

				validators.validateNonNegativeNumber(this.shotsLeft);

				findWinningShots(this.shotsLeft, this._score, 0, [], winningShots);
				return winningShots;
			}
		};

		function findWinningShots(shotsLeft, score, left, shotCombination, result) {
			if (score === 0) {
				result.push(shotCombination);
			}

			if (shotsLeft === 0) {
				return;
			}

			for (var i = left; i < possibleShots.length; i++) {
				var newScore = score - possibleShots[i],
					newShotCombination = shotCombination.slice();
				newShotCombination.push(possibleShots[i]);
				if (newScore >= 0 && (newScore - shotsLeft * maxShot) <= 0) {
					findWinningShots(shotsLeft - 1, newScore, i, newShotCombination, result);
				} else {
					return;
				}
			}

			return result;
		}

		return {
			get: function(name) {
				return Object.create(player).init(name);
			}
		};
	})();

	return {
		createNewGame: function() {
			return game.get();
		}
	};
})();

module.exports = gameCreator;