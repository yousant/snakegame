//Game Constants & Variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');

let speed = 9;
let score = 0;
let lastPaintTime = 0;

let up = false;
let down = false;
let left = false;
let right = false;

let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7};

//Game Functions

//for better fps requestanimation frame is used and it is calling game function gameEngine like recursion
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {

    //If you bump into urself
     for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {   //head bump into any segment of body
            return true;
        }
    }
    //snake strikes the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    
}

function gameEngine() {
    //P1: Updating the snake array & food
    if(isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();

        inputDir = {x: 0, y: 0};
        alert("Game Over, Better Luck Next Time, Press any key to play again!");

        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    //If snake had eaten the food increment the score and regenerate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        // if(score > hiscoreval) {
        //     hiscoreval = score;
        //     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        //     highscoreBox.innerHTML = "HiScore: " + hiscoreval;
        // }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;

        food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())}
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]}    //used as object for referencing
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //P2: Display the snake and food
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Display the food
    
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

}



//Main logic starts here
musicSound.play();
// let hiscore = localStorage.getItem("hiscore");
// if(hiscore === null) {
//     hiscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
// }
// else{
//     hiscoreval = JSON.parse(hiscore);
//     highscoreBox.innerHTML = "HiScore: " + hiscoreval;
// }
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {

    inputDir = {x:0, y:1} //start game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
    

});


//for mobiles

const btnUp = document.querySelector('#UP');
const btnDown = document.querySelector('#DOWN');
const btnLeft = document.querySelector('#LEFT');
const btnRight = document.querySelector('#RIGHT');
// const board = document.querySelector(".snake-board");


btnUp.addEventListener("click", () => {
  inputDir.x = 0;
  inputDir.y = -1;
});

btnDown.addEventListener("click", () => {
  inputDir.x = 0;
  inputDir.y = 1;
});

btnLeft.addEventListener("click", () => {
  inputDir.x = -1;
  inputDir.y = 0;
});
btnRight.addEventListener("click", () => {
  inputDir.x = 1;
  inputDir.y = 0;
});

