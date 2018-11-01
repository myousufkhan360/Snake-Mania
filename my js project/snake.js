//initializing the canva
var canva = document.getElementById("snake");
var context = canva.getContext("2d");

// total no of boxex in snake game

var box = 32;

// making object of image
var groundImg = new Image();
// sourcing the image
groundImg.src = "images/ground.png";

var foodImg = new Image();
// sourcing the image
foodImg.src = "images/food.png";


// designing the snake

var snake = [];
// arrays of object
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

// creating the food object

var food = {
    x: Math.floor(Math.random() * 17 + 1) * box,

    y: Math.floor(Math.random() * 15 + 3) * box

}

// intializing score board

var score = 0;

// controlling the snake
var button;
document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && button != "RIGHT") {
        button = "LEFT";
    } else if (event.keyCode == 38 && button != "DOWN") {
        button = "UP";
    } else if (event.keyCode == 39 && button != "LEFT") {
        button = "RIGHT";
    } else if (event.keyCode == 40 && button != "UP") {
        button = "DOWN";
    }
}

//collison function if snake collide to walls 

function collision(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }


    }
    return false;

}

//drawing snake and food on canvas

function draw() {
    context.drawImage(groundImg, 0, 0);
    for (var i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? "brown" : "yellow";
        context.fillRect(snake[i].x, snake[i].y, box, box);

        context.strokeStyle = "black";
        context.strokeRect(snake[i].x, snake[i].y, box, box)
    }
    context.drawImage(foodImg, food.x, food.y);

    context.fillStyle = "white";
    context.font = "45px Changa one";
    context.fillText(score, 2 * box, 1.6 * box);

    // old head position
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;



    if (button == "LEFT") snakeX -= box;
    if (button == "UP") snakeY -= box;
    if (button == "RIGHT") snakeX += box;
    if (button == "DOWN") snakeY += box;

    //increasong the snake if eats the food

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,

            y: Math.floor(Math.random() * 15 + 3) * box

        }

    } else {
        // removing the tail
        snake.pop();
    }

    //adding new head
    var newHead = {
        x: snakeX,
        y: snakeY
    }


    //game over 

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {

        alert("Game Over!, Press F5 to continue");
         clearInterval(game);
    }

    snake.unshift(newHead);


}

// call the draw function to generate every 100ms

var game = setInterval(draw, 100);
