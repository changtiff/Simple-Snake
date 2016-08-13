//start game
var start = document.getElementById("startBtn");
start.addEventListener("click", function(evt){
	runGame();
});

//create the icon object type
function Icon(t, l, r) {
    this.top = t;
    this.left = l;
    this.radius = r;
}

var snake = new Icon(200, 200, 10);
var food = new Icon(-1000, -1000, 10);
var step = snake.radius; //step size of snake movement, will move it the radius of an icon
var boardTop = 0; //board dimensions
var boardBottom = 400;
var boardLeft = 0;
var boardRight = 400;
var isFood = false; //whether or not there is food on the board
var score = 0;

//retrieve the snake HTML node
var snakeNode = document.getElementById("snake");
var direction = 1; //1=up, 2=down, 3=left, 4=right, 0=none (end of game)
var endGame = false;

//listens for and responds to the user's key presses
document.addEventListener("keydown", function(evt) {
  if (evt.keyCode == 38) {
    direction = 1; //up
  } else if (evt.keyCode == 40) {
    direction = 2; //down
  } else if (evt.keyCode == 37) {
    direction = 3; //left
  } else if (evt.keyCode == 39) {
    direction = 4; //right
  }
});

function moveSnake(){
  if(!endGame){
    if(direction==1){
      mvup();
    }
    else if(direction==2){
      mvdown();
    }
    else if(direction==3){
      mvleft();
    }
    else if(direction==4){
      mvright();
    }
  }
}

function mvup(){
  snake.top -= step;
  snakeNode.style.top = snake.top + "px";
}
function mvdown(){
  snake.top += step;
  snakeNode.style.top = snake.top + "px";
}
function mvleft(){
  snake.left -= step;
  snakeNode.style.left = snake.left + "px";
}
function mvright(){
  snake.left += step;
  snakeNode.style.left = snake.left + "px";
}

function evaluateBoard(){
	//if snake head hits the edge of the board
	if( snake.top < boardTop - 2*snake.radius  || snake.top > boardBottom - 4*snake.radius || snake.left  < boardLeft || snake.left > boardRight - 2*snake.radius ) {
  	console.log(snake.top);
    console.log(boardTop);
    direction = 0;
    endGame = true;
  }

  //if snake makes contact with the food
  if ( (snake.top >= food.top - 4*snake.radius) && (snake.top <= food.top ) && (snake.left >= food.left - 2*snake.radius) && (snake.left <= food.left + 2*snake.radius) ) {
  	isFood = false;
    score++;
  }
}

//create the food HTML node
var board = document.getElementById("board");
var foodNode = document.createElement("div");
foodNode.className = "food";
board.insertBefore(foodNode, snakeNode); //this way the snake will show up on top of the food

//place or move the blue food piece
function generateFood(){
	food.top = parseInt(Math.random() * (boardBottom - 2*food.radius) ); //generate a random position on the board
  food.left = parseInt(Math.random() * (boardRight - 2*food.radius) );
	console.log(food.top);
  console.log(food.left);
  foodNode.style.top = food.top + "px";
  foodNode.style.left = food.left + "px";
  isFood = true;
}

function runGame(){
  setInterval(function(){
    document.getElementById("score").innerHTML = score;
    moveSnake();
    evaluateBoard();
    if (!isFood) {
      generateFood();
    }
  }, 100);
}

//rating validation in the form
var rating = document.getElementById("rating");

rating.onchange = function() {
  if (/[1-5]{1}/.test(this.value)) {
    document.getElementById("ratingHint").style.display = "none";
  }
  else {
    document.getElementById("ratingHint").style.display = "block";
  }
};

//email validation in the form
var email = document.getElementById("email");

email.onchange = function() {
  if (/[\w._%+-]+@[\w.-]+\.[a-z]{3}/.test(this.value)) {
    document.getElementById("emailHint").style.display = "none";
  }
  else {
    document.getElementById("emailHint").style.display = "block";
  }
};

//phone number validation in the form
var phoneNum = document.getElementById("phone");

phoneNum.oninput = function() {
  if (/\(?\d{3}(\)|\-)?\d{3}-?\d{4}/.test(this.value)) {
    document.getElementById("phoneHint").style.display = "none";
  }
  else {
    document.getElementById("phoneHint").style.display = "block";
  }
};

phoneNum.onchange = function() {
  if (/\(\d{3}\)\d{3}-\d{4}/.test(this.value)) {
    this.value = this.value.substring(1, 4) + "-" + this.value.substring(5);
  }
  else if (/\d{10}/.test(this.value)) {
    this.value = this.value.substring(0, 3) + "-" + this.value.substring(3, 6) + "-" + this.value.substring(6);
  }
};
