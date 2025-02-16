
import { onSnake, expandSnake } from "./snake.js";

const EXPANSION_RATE = 1;
let food = { x: 10, y: 10 };

export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = randomFoodPosition();
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

function randomFoodPosition() {
    return {
        x: Math.floor(Math.random() * 21) + 1,
        y: Math.floor(Math.random() * 21) + 1,
    };
}