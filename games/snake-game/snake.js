const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const box = 32;

const ground = new Image();
ground.src = 'images/ground.png';

const foodImg = new Image();
foodImg.src = 'images/food.png';

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();
dead.src = 'audios/dead.mp3';
eat.src = 'audios/eat.mp3';
up.src = 'audios/up.mp3';
left.src = 'audios/left.mp3';
right.src = 'audios/right.mp3';
down.src = 'audios/down.mp3';

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

let score = 0;

let d;

document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode == 37 && d != 'RIGHT') {
        left.play();
        d = 'LEFT';
    } else if (event.keyCode == 38 && d != 'DOWN') {
        up.play();
        d = 'UP';
    } else if (event.keyCode == 39 && d != 'LEFT') {
        right.play();
        d = 'RIGHT';
    } else if (event.keyCode == 40 && d != 'UP') {
        down.play();
        d = 'DOWN';
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    context.drawImage(ground, 0, 0);
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? 'green' : 'white';
        context.fillRect(snake[i].x, snake[i].y, box, box);

        context.strokeStyle = 'red';
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    context.drawImage(foodImg, food.x, food.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (d == 'LEFT') snakeX -= box;
    if (d == 'UP') snakeY -= box;
    if (d == 'RIGHT') snakeX += box;
    if (d == 'DOWN') snakeY += box;
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        dead.play();
        clearInterval(game);
    }

    snake.unshift(newHead);

    context.fillStyle = 'white';
    context.font = '45px Changa one';
    context.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);