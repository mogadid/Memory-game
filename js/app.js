/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


const icons = ['fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt','fa fa-cube','fa fa-anchor'
,'fa fa-leaf','fa fa-bicycle','fa fa-diamond','fa fa-bomb','fa fa-leaf','fa fa-bomb','fa fa-bolt','fa fa-bicycle',
'fa fa-paper-plane-o','fa fa-cube']

const cardDeck = document.querySelector('.deck')

let openCards = [];
let matchCard = [];


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
* compare the matched cards
*/


function compare(curCard, preCard) {

	if(curCard.innerHTML === preCard.innerHTML){

	curCard.classList.add("match");
	preCard.classList.add("match");

	matchCard.push(curCard, preCard);

	// reset opened cards
	openCards = [];

	endGame();

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
* When game is over
*/

function endGame() {
	if(matchCard.length === icons.length) {
		alert("Congratulations! You Won!");
	}
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

	rating();
}



/*
*
* Rating
*/

const starsRating = document.querySelector(".stars");
starsRating.innerHTML = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
function rating() {
	if (moves >= 5) {
		starsRating.innerHTML = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
	}
}

/*
*
* Restart the game
*/

const restartButton = document.querySelector(".restart")
restartButton.addEventListener("click", function(){

	// del all cards
	cardDeck.innerHTML = "";

	// call gameStart to create new cards
	gameStart();

	// reset any related var's
	matchCard = [];

	moves = 0;
	moveSpan.innerHTML = moves;
	starsRating.innerHTML = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
});
// game start
gameStart();

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
