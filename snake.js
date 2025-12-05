//Create a board

const blockSize = 25;
const rows = 20;
const cols = 20;
let board;
let context;

//Draw a snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// Draw the food
let foodX;
let foodY;

//Give the snake speed to move
let velocityX = 0;
let velocityY = 0;

//Give the snake some nutrition
let snakeBody = [];

//Game Over
let gameOver = false;

//Calculate Score
let score = 0;



window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection); //lets make the snake move. It will listen for a keyup and will call a function called changeDirection
    update();
    setInterval(update, 1000/10);

}


function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="grey"; //to change color of the pen to black
    context.fillRect(0, 0, board.width, board.height);


     //Draw food
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //When snake collides with the food, it must eat it
    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();

     {
    score += 1;
    document.getElementById("score").innerText = "Score: " + score;
  
}

    }

    //Put together/increase snake body or let's move the body
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    //update second segment to take head space
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }


    //Draw snake
    context.fillStyle="lime";
    //Move the head
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
    let gradient = context.createLinearGradient(
        snakeBody[i][0], snakeBody[i][1],
        snakeBody[i][0] + blockSize, snakeBody[i][1] + blockSize
    );
    gradient.addColorStop(0, "#00FF88");  // bright green
    gradient.addColorStop(1, "#007744");  // darker green

    context.fillStyle = gradient;
    context.beginPath();
    context.roundRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize, 6);
    context.fill();

    let headGradient = context.createLinearGradient(snakeX, snakeY, snakeX + blockSize, snakeY + blockSize);
headGradient.addColorStop(0, "#00FFAA");
headGradient.addColorStop(1, "#004400");

context.fillStyle = headGradient;
context.beginPath();
context.roundRect(snakeX, snakeY, blockSize, blockSize, 8);
context.fill();

    
    }






    
    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");

    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody [i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}


//Create a function to ChangeDirection
function changeDirection(e) {
    if(e.code =="ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code =="ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code =="ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code =="ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

//Create a function to randomly place the food
//0-1) *cols -> (0-19.9999) -> (0-19) * 25
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
