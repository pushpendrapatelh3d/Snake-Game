const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const grid = 20;
const tileCount = canvas.width /grid;

let snake;
let velocityX;
let velocityY;
let food;
let score;
let gameRunning;
let GameOver_sound = new Audio("./gameover.mp3");
let Eat_sound = new Audio("./food.wav");


function startGame(){
    snake = [{ x:10, y:10 }]
    velocityX = 1;
    velocityY = 0;

    food = {
        x: 5,
        y: 5
    }

    score = 0;
    gameRunning = true;
    document.getElementById("score").innerText = score;

    gameLoop();
}

function gameLoop(){
    if(!gameRunning) return;

    setTimeout(() =>  {
        update();
        draw();

        gameLoop();
    },120);
}

function update(){
    const head = {
        x:snake[0].x +velocityX,
        y:snake[0].y +velocityY
    };

    snake.unshift(head);

    if(head.x < 0 || head.y < 0 || head.x > tileCount-1 || head.y > tileCount-1){
        GameOver_sound.play();
        gameOver();
        return;
    }

    for(let i = 1; i < snake.length; i++){
        if(head.x == snake[i].x && head.y == snake[i].y){
            GameOver_sound.play();
            gameOver();
            return;
        }
    }

    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").innerText = score;


        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        Eat_sound.play();

    }
    else {
        snake.pop();
    }
}


function draw(){
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    snake.forEach((part, i) =>{
        ctx.fillStyle = i == 0 ? "#00E5FF" : "#00838F";
        
        ctx.fillRect(part.x * grid, part.y * grid, grid - 2, grid - 2);
    });

    ctx.fillStyle = "#FFB300";

    ctx.fillRect(food.x * grid, food.y * grid, grid - 2, grid - 2);
}

function gameOver(){
    gameRunning = false;
    setTimeout(() =>{
        alert("Game Over")
        ,100
    });

}

document.addEventListener("keydown", (e) =>{
    switch (e.key){
        case "ArrowUp":
            if(velocityY !== 1){
                velocityX = 0;
                velocityY = -1;
            }
            break;

        case "ArrowDown":
            if(velocityY !== -1){
                velocityX = 0;
                velocityY = 1;
            }    
            break;
        case "ArrowLeft":
            if(velocityX !== 1){
                velocityX = -1;
                velocityY = 0;  
            }    
            break;
        case "ArrowRight":
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
    }
});


document.getElementById("restartBtn").addEventListener("click", startGame);

startGame();

