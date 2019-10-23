/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he or she whishes. Each result gets added to his or her ROUND score
- if the player rolls a 1 or two sixes, all of that players round score and saved score is lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that their ROUND score gets added to their GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points or whatever is set as the winning amount wins the game

*/

var scrores, roundScore, activePlayer, dice, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

  if (gamePlaying) {

    // 1. Random numbers for dice
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result (dice image)
    var diceDOM = document.querySelector('.dice');
    var diceDOM2 = document.querySelector('.dice2');

    diceDOM.style.display = 'block';
    diceDOM.src = 'images/dice-' + dice + '.png';

    diceDOM2.style.display = 'block';
    diceDOM2.src = 'images/dice-' + dice2 + '.png';

    // 3. Update the round score if one of the rolled numbers is not a 1 or two sixes
    if (dice === 1 && dice2 === 1) {

      // alert message for when snake eyes are rolled
      alert('You have rolled snake eyes You lose your current rolled score');

      // reset the dice and previousRoll varialbes for the next player's turn
      dice = 0;
      dice2 = 0;

      nextPlayer();

    } else if (dice === 6 && dice2 === 6) {

      // alert message for when two sixes are rolled consecutively
      alert('You have rolled double sixes. You lose your total score');

      // erase the current players total score
      scores[activePlayer] = 0;

      // update the UI to show the user lost their total score
      document.querySelector('#score-' + activePlayer).textContent = 0;

      // reset the dice and previousRoll varialbes for the next player's turn
      dice = 0;
      dice2 = 0;

      nextPlayer();

    } else {

      // Add score
      roundScore += dice + dice2;

      // display active player's current round score
      document.querySelector('#current-' + activePlayer).textContent = roundScore;

    }// end of else for else if (dice === 6 && dice2 === 6)

  }// end of if (gamePlaying)

})// end of document.querySelector('.btn-roll').addEventListener('click', function()

document.querySelector('.btn-hold').addEventListener('click', function() {

  // only run code if the game state variable (gamePlaying) is set
  if (gamePlaying) {

    // Add current scrore to global score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // getting the value of the input field
    var input = document.querySelector('.score-limit').value;

    // variable used to hold the value from the input field
    var winningScore;

    // Undefined, 0, null, or "" are coerced to false, and anything else is coerced to true.
    // check to see if the input variable is empty
    if (input) {

      winningScore = input;

    } else {

      winningScore = 100;

    }

    // Check if the player won the game
    if (scores[activePlayer] >= winningScore) {

      document.querySelector('#name-' + activePlayer).textContent = 'Winner';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

      gamePlaying = false;
      alert(activePlayer+'WINNER');

    } else {

      nextPlayer();

    }// end of else for if (scores[activePlayer] >= winningScore)

  }// end of if (gamePlaying)

});// end of document.querySelector('.btn-hold').addEventListener('click', function() {

function nextPlayer() {

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

}// end of nextPlayer() function

document.querySelector('.btn-new').addEventListener('click', init);

function init() {

  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true

  document.querySelector('.score-limit').value = '';
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}// end of init() function
