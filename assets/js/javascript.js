 var words = ["Obama", "Biology","History", "Trump", ];

var letters = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var info = [
	'Capital City Of America.','Majore decipline that study life', 'Current president of America',
];
var lastIndex = -1;
var attempt = 0;
player = {
	lives:5,
	score:0,
	gWord:"",
	guessChar: 0,
	usedChar:[],

	checkSpelling:function(key){
		if (this.gWord.includes(" ")) {
			this.gWord = this.gWord.replace(" ","0");
			this.guessChar++;
		}else if (this.gWord.includes("-")) {
			this.gWord = this.gWord.replace("-","0");
			this.guessChar++;
		}
		for (var i = this.gWord.length - 1; i >= 0; i--) {
			if (this.gWord[i] === key) {
				this.guessChar++;
			}
		}
		return this.gWord.includes(key);
	}
}
function logic(key){
	if (player.checkSpelling(key)) {
		// player.score +=10;
		var allBlocks = document.getElementsByClassName(key+"Let");
		for (var i = 0; i < allBlocks.length; i++) {
			allBlocks[i].classList.add(key);
		}
		document.getElementById("score").innerHTML = player.score;
		if (player.guessChar === player.gWord.length) {
		
			clenUpGamingBoard();
			continueGame();
			alert("Great Progress! <hr> You Are Doing Great! Keep Up The Pace!!");
		var audio = document.createElement("audio");
    audio.src = "my_sound.mp3";
    audio.play();
		}
	}else{
		if(key !== 0){
			player.lives--;
			if (player.lives === 0) {
				document.getElementById("restart").classList.remove("no-display");
				updateStatBoard();
				clenUpGamingBoard();
			}
			document.getElementById("lives").innerHTML = player.lives;
		}
	}
}
function start(button){
	document.body.removeAttribute("onclick");
	if (player.gWord === "") {
		player.gWord = getWord().toLowerCase();
		console.log("this is the word: "+ player.gWord);
	}
	if (button != 0) {
		document.getElementsByClassName(button)[0].classList.add("hiden");
	}
	logic(button);
}

function getWord(){
	var rand = Math.floor((Math.random() * words.length) + 0);
	if (rand === lastIndex) {
		getWord();
	}
	lastIndex = rand;
	
	var word = words[rand];
	buildWordLine(word);
	if (attempt === 0) {
		document.getElementById("press_and_remove").classList.add("no-display");
	}
	printAlfabet();
	return word;
}

function setInfoPanel(index){
	document.getElementById("info").innerHTML = info[index];
}

function buildWordLine(word){
	for (var i = 0; i < word.length; i++) {
		var div = document.getElementById('word-line');
		if(word[i] ===" "){
			div.innerHTML = div.innerHTML + '<div class="space block underLetter"></div>';
		}else if(word[i] === "-"){
			div.innerHTML = div.innerHTML + '<div class="dush block underLetter"></div>';
		}else{
			div.innerHTML = div.innerHTML + '<div class="'+word[i].toLowerCase()+'Let block underLetter"></div>';
		}
	}
}

function printAlfabet(){
	for (var i = 0; i < letters.length/2; i++) {
		var div = document.getElementById('alphabetFirst');
		div.innerHTML = div.innerHTML + '<div class="'+letters[i]+' block" onclick=" start(\''+letters[i]+'\')"></div>';
	}
	for (var i = letters.length/2; i < 26; i++) {
		var div = document.getElementById('alphabetSecond');
		div.innerHTML = div.innerHTML + '<div class="'+letters[i]+' block" onclick=" start(\''+letters[i]+'\')"></div>';
	}
}

function clenUpGamingBoard(){
	document.getElementById("alphabetFirst").innerHTML = " ";
	document.getElementById("alphabetSecond").innerHTML = " ";
	document.getElementById("word-line").innerHTML = " ";
}

function updateStatBoard(){
	document.getElementById("score").innerHTML = player.score;
	document.getElementById("lives").innerHTML = player.lives;
}

function restart(){
	attempt++;
	player.lives = 5;
	player.gWord = "";
	player.score = 0;
	player.guessChar = 0;
	player.usedChar = [];
	updateStatBoard();
	document.getElementById("restart").classList.add("no-display");
	start(0);
}

function continueGame(){
	attempt++;
	player.guessChar = 0;
	player.gWord = "";
	player.usedChar = [];
	updateStatBoard();
	start(0);
	document.getElementById("restart").classList.add("no-display");
}

document.onkeyup = function(event){
	var char = event.key;
	if (letters.includes(char)) {
		if (!player.usedChar.includes(char)) {
			player.usedChar.push(char);
			start(event.key);
		}
	}

}