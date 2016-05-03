//TicTacToe Game Logic by Charles Lee
//I have attempted to break down all the necessary componenets into their smallest forms. The reason is so that other readability and for
//testing as well should I pursue writing testcases for the game. 

var x = true;
var gameOver = false;
var tie = false;
var select;


$( document ).ready(function() {
	initPage();
});

// Initializes the components in building out the TicTacToe using jQuery
function initPage(){
	$("#GameState").append("<div id='gameBoard'></div>");
	for(var i = 0; i< 9; i++){
		$("#gameBoard").append("<div id='square"+i+"'' class='gameSquare' onclick='mark(square"+i+")'></div>");
	}
	$("body").append("<div id='winMessage'><h1></h1></div>");
	$("#gameBoard").append("<div id='resetButton' onclick='restart()'><p >Restart?</p></div>");
	// $("#gameBoard").append("<div id='resetScore' onclick='restart()'><p >Reset Score?</p></div>");
	$("#winMessage").hide();
	select = new Audio("./Assets/Blip_Select.wav");
}

// mark the corresponding square box with an X or O respectively. 
//This function also serves as the core logic that checks for any three diagonals, rows or columns.
function mark(squareLocation){
	if(!gameOver){
		select.play();
		console.log(squareLocation.id);
		if (isEmpty(squareLocation.id) && !gameOver){
			if(whosTurn()){
				$("#"+squareLocation.id).append("X");
			}
			else{
		 		$("#"+squareLocation.id).append("O");
			}
			$( "#"+squareLocation.id ).animate({
					fontSize: "100px"
			}, 500 );
			topRowMatch();
			middleRowMatch();
			bottomRowMatch();
			firstColumnMatch();
			middleColumnMatch();
			lastColumnMatch();
			leftDaigonalMatch();
			rightDaigonalMatch();
			allFilled();
		}
	}
}

//clears the board and restarts the game.
function restart(){
	for(var i = 0; i< 9; i++){
		$("#square"+i).empty();
		$("#square"+i).css("fontSize", "20px");
	}
	gameOver=false;
	tie =false;
	$("#winMessage").fadeOut(500);
	$("#winMessage > h1").empty();
}

//toggles to who's turn.
function whosTurn(){
	return x=!x;
}

//checks to see if the selected square is empty
function isEmpty(squareLocation){
	var str = $("#"+squareLocation).text();
	if(str == ""){
		return true;
	}
}

//checking the values in the div box are each to each other prior to declaring a match. 
function isEqual(square1, square2, square3){
	if($(square1).text() == $(square2).text() && $(square2).text() == $(square3).text()){
		endGame($(square1).text());
	}
}

//function chaining to see if there are diagonal, row or column matches.
function isEmptyRow(square1, square2, square3){
	if(!isEmpty(square1) && !isEmpty(square2) && !isEmpty(square3)){
		return true;
	}
	return false;
}

//notifies the players who won or if they have tied in the game
function endGame(side){
	if(!gameOver && !tie){ // One edge case that will show win message Twice;
		$("#winMessage > h1").append(side + " wins!");
		$("#winMessage").fadeIn(1000);
		gameOver = true;
	}
	else{
		$("#winMessage > h1").append("Tie!");
		$("#winMessage").fadeIn(1000);
	}
}
//function chaining to see if all 3 rows are completely filled prior to declaring a tie game.
function allFilled(){
	console.log("REACHED");
	if(isEmptyRow("square0","square1", "square2") && isEmptyRow("square3","square4", "square5")&& isEmptyRow("square6","square7", "square8") && !gameOver){	
		tie = true;
		endGame("tied");
	}
}
//Checks to see if the top row matches
function topRowMatch(){
	if(isEmptyRow("square0","square1", "square2")){
		isEqual("#square0", "#square1", "#square2");
	}
}

//Checks to see if the middle row matches.
function middleRowMatch(){
	if(isEmptyRow("square3", "square4","square5")){
		isEqual("#square3", "#square4", "#square5");
	}
}
//Checks to see if the bottom row matches.
function bottomRowMatch(){
	if(isEmptyRow("square6", "square7","square8")){
		isEqual("#square6", "#square7", "#square8");
	}
}
//Checks to see if the first column matches.
function firstColumnMatch(){
	if(isEmptyRow("square0", "square3","square6")){
		isEqual("#square0", "#square3", "#square6");
	}
}
//Checks to see if the middle column matches.
function middleColumnMatch(){
	if(isEmptyRow("square1", "square4","square7")){
		isEqual("#square1", "#square4", "#square7");
	}
}
//Checks to see if the last column matches.
function lastColumnMatch(){
	if(isEmptyRow("square2", "square5","square8")){
		isEqual("#square2", "#square5", "#square8");
	}
}
//Checks to see if the left diagonal matches.
function leftDaigonalMatch(){
	if(isEmptyRow("square0", "square4","square8")){
		isEqual("#square0", "#square4", "#square8");
	}
}
//Checks to see if the right diagonal matches.
function rightDaigonalMatch(){
	if(isEmptyRow("square2", "square4","square6")){
		isEqual("#square2", "#square4", "#square6");
	}
}