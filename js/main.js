var x = true;
var gameOver = false;
var tie = false;
var select;
$( document ).ready(function() {
	initPage();
});

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
function whosTurn(){
	return x=!x;
}
function isEmpty(squareLocation){
	var str = $("#"+squareLocation).text();
	if(str == ""){
		console.log(str);
		return true;
	}
}
function isEqual(square1, square2, square3){
	if($(square1).text() == $(square2).text() && $(square2).text() == $(square3).text()){
		endGame($(square1).text());
	}
}
function isEmptyRow(square1, square2, square3){
	if(!isEmpty(square1) && !isEmpty(square2) && !isEmpty(square3)){
		return true;
	}
	return false;
}
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
function allFilled(){
	console.log("REACHED");
	if(isEmptyRow("square0","square1", "square2") && isEmptyRow("square3","square4", "square5")&& isEmptyRow("square6","square7", "square8") && !gameOver){
		
		tie = true;
		endGame("tied");
	}
}
function topRowMatch(){
	if(isEmptyRow("square0","square1", "square2")){
		isEqual("#square0", "#square1", "#square2");
	}
}
function middleRowMatch(){
	if(isEmptyRow("square3", "square4","square5")){
		isEqual("#square3", "#square4", "#square5");
	}
}
function bottomRowMatch(){
	if(isEmptyRow("square6", "square7","square8")){
		isEqual("#square6", "#square7", "#square8");
	}
}
function firstColumnMatch(){
	if(isEmptyRow("square0", "square3","square6")){
		isEqual("#square0", "#square3", "#square6");
	}
}
function middleColumnMatch(){
	if(isEmptyRow("square1", "square4","square7")){
		isEqual("#square1", "#square4", "#square7");
	}
}
function lastColumnMatch(){
	if(isEmptyRow("square2", "square5","square8")){
		isEqual("#square2", "#square5", "#square8");
	}
}
function leftDaigonalMatch(){
	if(isEmptyRow("square0", "square4","square8")){
		isEqual("#square0", "#square4", "#square8");
	}
}
function rightDaigonalMatch(){
	if(isEmptyRow("square2", "square4","square6")){
		isEqual("#square2", "#square4", "#square6");
	}
}