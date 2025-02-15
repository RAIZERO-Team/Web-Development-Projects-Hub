import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5;
let newSegments = 0;
let gameOver = false;

const snakeBody = [{ x: 11, y: 11 }];

export function update() {
    if (gameOver) return; 

    addSegments();
    const inputDirection = getInputDirection();

    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;

    if (checkCollision()) {
        endGame();
    }
}

export function draw(gameBoard) {
    if (gameOver) return; 
    gameBoard.innerHTML = ""; 
    snakeBody.forEach((segment) => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    });
}

export function expandSnake(amount) {
    newSegments += amount;
}

export function onSnake(position) {
    return snakeBody.some(
        (segment) => segment.x === position.x && segment.y === position.y
    );
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }
    newSegments = 0;
}

function checkCollision() {
    const head = snakeBody[0];
    return head.x < 1 || head.x > 21 || head.y < 1 || head.y > 21;
}

function endGame() {
    gameOver = true; 
    setTimeout(() => {
        let score = snakeBody.length - 1;
        if (confirm(`Game Over! Your score: ${score}\nDo you want to restart?`)) {
            restartGame();
        }
    }, 100);
}

function restartGame() {
    gameOver = false;
    snakeBody.length = 1;
    snakeBody[0] = { x: 11, y: 11 };
    newSegments = 0;
}
