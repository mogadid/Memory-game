/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


const symbols = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const icons = shuffle(symbols.concat(symbols));

const cardDeck = document.querySelector('.deck');


let openCards = [];
let matchCard = [];

const starsRating = document.querySelector(".stars");
const starList = starsRating.querySelectorAll('i.fa-star');
const scoreRatings = 3;

// rating stars;
let ratThreeStars = 20, ratTwoStars = 30, ratOneStar = 60;

// timer
let gameTimer;

// boolean whether the timer has been started or not
let isTimerActive = false;

// variables to increment game timer
let timerSeconds = 0, timerMinutes = 0, timerHours = 0;


/*
*
* game start
*/

function gameStart(){
	for (let i = 0; i < icons.length; i++) {
		// create li
		const card = document.createElement('li');
		// add class card to li
		card.classList.add('card');
		// add i tag to the li tag
		card.innerHTML = `<i class="${icons[i]}"></i>`; 
		cardDeck.appendChild(card);

		// card click
		cardClick(card);
	}
}



/*
*
* when card is clicked
*/

function cardClick(card) {
	// card show
	card.addEventListener('click', function() {

		startTimer();
		const curCard = this;
		const preCard = openCards[0];

		// we have an opened card
		if (openCards.length === 1) {
 
			card.classList.add("open", "show", "disable");
			openCards.push(this);

			// compare the cards 
			compare(curCard, preCard);

		} else {

			// thtere is no oppend card
			curCard.classList.add("open", "show", "disable");
			openCards.push(this);
		}

	});
}




/*
*
* Stars Rating
*/


function rating(scoreRatings) {

	if (moves > ratThreeStars && moves <= ratTwoStars) {

		starList[2].className = 'fa fa-star-o';
		scoreRatings = 2;
	} else if (moves > ratTwoStars && moves <= ratOneStar) {

		starList[1].className = 'fa fa-star-o';
		scoreRatings = 1;
	} else if (moves > ratOneStar) {

		starList[0].className = 'fa fa-star-o';
		scoreRatings = 0;
	}
		
	return scoreRatings;
	
}


/*
*
* compare the matched cards
*/


function compare(curCard, preCard) {

	if(curCard.innerHTML === preCard.innerHTML){

	curCard.classList.add("match");
	preCard.classList.add("match");

	matchCard.push(curCard, preCard);

	// reset opened cards
	openCards = [];
	const ratings = rating(scoreRatings);
	endGame(moves, ratings);

	} else {

		setTimeout(function() {
			curCard.classList.remove("open", "show", "disable");
			preCard.classList.remove("open", "show", "disable");
			
		}, 400);

		// close opened cards
		openCards = [];
	}

	// add new move
	addMove();
}



/*
*
* Add move
*/

const moveSpan = document.querySelector(".moves");
let moves = 0;
moveSpan.innerHTML = 0;

function addMove() {
	moves++;
	moveSpan.innerHTML = moves;

	rating(moves);
}




/*
*
* Restart the gamescoreRatings
*/

function clean() {

	// del all cards
	cardDeck.innerHTML = "";

	// call gameStart to create new cards
	gameStart();

	// reset any related var's
	matchCard = [];

	location.reload();

 	// stop timer
	rating(moves);
    clearTimeout(gameTimer);
    let timerReset = document.querySelector('.timer').textContent = "00:00:00";

	moves = 0;
	moveSpan.innerHTML = moves;
	starsRating.innerHTML = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
}


function resetGame(){

	const restartButton = document.querySelector(".restart");

	restartButton.addEventListener("click", function(){
		swal({
			title: "are you sure ?",
			text: "your progress will be lost!",
			type: "warning",
			dangerMode: true,
            buttons: {
            confirm: "Yes, restart the game",
            cancel: "cancel",
            },
			})
			.then((isConfirm) => {
	            if (isConfirm) {	
				clean();
			}
	    });
	});

}

// reset
resetGame();


// game start
gameStart();



/*
*
* When game is over
*/

function endGame(moves,scoreRatings) {

	if(matchCard.length === icons.length) {

		clearTimeout(gameTimer);
		swal({
			title: "Congratulations! You Won!!",
			text: "With " + (moves + 1) + " moves and " + scoreRatings + " Stars in " + timerMinutes + " Minutes and " + timerSeconds + " Seconds",
			icon: "success",
            buttons: {
            confirm: "Play again",
            cancel: true,
            },
		}).then((isConfirm) => {
            if (isConfirm) {
                clean();
            }
        });
	}
} 



/*
*
* stopwatch function based on Daniel Hug's (https://jsfiddle.net/Daniel_Hug/pvk6p/)
*
*/

function incrementTimer() {
    timerSeconds++;
    if(timerSeconds >= 60) {
        timerSeconds = 0;
        timerMinutes++;
        if (timerMinutes >= 60) {
            timerMinutes = 0;
            timerHours++;
        }
    }
    const timerCl = document.querySelector('.timer');
    timerCl.textContent = (timerHours ? (timerHours > 9 ? timerHours : "0" + hours) : "00") + ":" + (timerMinutes ? (timerMinutes > 9 ? timerMinutes : "0" + timerMinutes) : "00") + ":" + (timerSeconds > 9 ? timerSeconds : "0" + timerSeconds);
    timer();
}

function timer() {
    gameTimer = setTimeout(incrementTimer, 1000);
}

function startTimer() {
    if (!isTimerActive) {
        isTimerActive = true;
        timer();
    }
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
