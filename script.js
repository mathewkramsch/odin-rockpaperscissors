// script.js

// Global Variables
let scoreBoard = document.querySelector('#scoreBoard');
let choiceMssg = document.querySelector('#choiceMssg');
let winnerMssg = document.querySelector('#winnerMssg');
const gameButtonContainer = document.querySelector('.gameButtonContainer');

let playerChoice = '';
let setupAlready = false;
let playerWinCount=0, compWinCount=0, round=1;

// ui part
let startButton = document.querySelector('#startButton');
startButton.addEventListener('click', setupGame);

// sets up the three rock/paper/scissor buttons and starts game
function setupGame() {
	scoreBoard.textContent = '0 - 0';
	choiceMssg.textContent = 'rock, paper, or scissors?';
	winnerMssg.textContent = 'chose one.';
	playerWinCount = 0;
	compWinCount = 0;
	round = 1;

	if (!setupAlready) {
		const buttonNames = ['rock','paper','scissors'];
		buttonNames.forEach(setupGameButtons);
		gameButtonContainer.removeChild(startButton);
		setupAlready = true;
	}
}

// adds 3 rock/paper/scissor buttons, clicking one of them will play a round
function setupGameButtons(buttonName) {
	const button = document.createElement('button');
	button.textContent = buttonName;
	button.setAttribute('value', buttonName);
	button.classList.add('gameButton');
	gameButtonContainer.appendChild(button);

	let playerChoice = button.getAttribute('value');
	button.addEventListener('click', ()=>{ playRound(playerChoice) });
}

// plays a round of the game, displays a message of outcome
function playRound(playerChoice) {
	let computerChoice = computerPlay();
	let winner = getRoundWinner(playerChoice, computerChoice);

	if (winner=='player') playerWinCount++;
	else if (winner=='computer') compWinCount++;

	printMssgs(playerChoice, computerChoice, winner);

	if (round > 5) addPlayAgainButton();
}

// function updates messages about score, player choices, & winner
function printMssgs(playerChoice, computerChoice, winner) {
	scoreBoard.textContent = `${playerWinCount} - ${compWinCount}`;
	choiceMssg.textContent = `you chose ${playerChoice}, I chose ${computerChoice}`;

	if (winner=='tie') {
		winnerMssg.textContent = `tie for round ${round}`;
	} else {
		winner = winner=='player'? 'you' : 'i';  // changes name of winner for conversational flow
		winnerMssg.textContent = `${winner} won round ${round++}. ${getSaltyMssg(winner)}.`;
	}

	if (round > 5) {
		const gameWinner = playerWinCount>compWinCount? 'you' : 'i';
		const endMssg = gameWinner=='you'? 'gg man' : 'i am victorious';
		winnerMssg.textContent = `round 5 thats game, ${gameWinner} win, ${endMssg}`;
	}
}

// generate random saltyMssg
function getSaltyMssg(winner) {
	const loseSaltMssgs = ['you got lucky','cheater',"ok I'll start trying now"]
	const winSaltMssgs = ['ha you suck','u r trash','lol']
	const randIndex = Math.round(Math.random()*(loseSaltMssgs.length-1));
	const saltyMssg = winner=='you'? loseSaltMssgs[randIndex] : winSaltMssgs[randIndex];
	return saltyMssg;
}

// plays a single round of rock paper scissors
// returns a string declaring winner
function getRoundWinner(playerSelection, computerSelection) {
	// player win cases
	if ( (playerSelection=='rock' && computerSelection=='scissors') ||
		(playerSelection=='paper' && computerSelection=='rock') ||
		(playerSelection=='scissors' && computerSelection=='paper') )
		return 'player';

	// computer win cases
	else if ( (computerSelection=='rock' && playerSelection=='scissors') ||
		(computerSelection=='paper' && playerSelection=='rock') ||
		(computerSelection=='scissors' && playerSelection=='paper') )
		return 'computer';

	// tie cases
	else if (computerSelection==playerSelection) return 'tie';
	else return 'error';
}

// randomly returns either rock/paper/scissors
function computerPlay() {
	const choice = Math.random()*3;  // rand num btwn 1&3
	if (choice<=1) return 'rock';
	else if (choice<=2) return 'paper';
	return 'scissors';
}

// removes rock/paper/scissor buttons, adds button to play game again
function addPlayAgainButton() {
	const buttons = document.querySelectorAll('.gameButton');
	buttons.forEach( (button)=>{ gameButtonContainer.removeChild(button) });

	const playAgainButton = document.createElement('button');
	playAgainButton.textContent = 'play again';
	playAgainButton.classList.add('gameButton');
	playAgainButton.addEventListener('click', setupGame);
	setupAlready = false;
	startButton = playAgainButton;
	gameButtonContainer.appendChild(playAgainButton);
}
