const canvas = document.querySelector("#board");
const context = canvas.getContext("2d");

document.addEventListener("keydown", ({ key }) => {
	if (key === "ArrowUp") changeDirection("up");
	else if (key === "ArrowDown") changeDirection("down");
	else if (key === "ArrowLeft") changeDirection("left");
	else if (key === "ArrowRight") changeDirection("right");
	else if (key === " ") {
		if (isPaused) play();
		else pause();
	}
});

var snake = {
	body: [
		{
			x: 27,
			y: 24,
		},
		{
			x: 26,
			y: 24,
		},
		{
			x: 25,
			y: 24,
		},
		{
			x: 24,
			y: 24,
		},
		{
			x: 23,
			y: 24,
		},
	],
};
var apple = randomPos();
var vector = {
	magnitude: 1,
	displacement: [1, 0],
};
var isPaused = true;

var refreshID;
var directionDict = {
	up: [0, -1],
	down: [0, 1],
	right: [1, 0],
	left: [-1, 0],
};

function randomPos() {
	return {
		x: Math.floor((Math.random() * canvas.width) / 10),
		y: Math.floor((Math.random() * canvas.height) / 10),
	};
}

function drawApple() {
	const { x, y } = apple;
	context.fillStyle = "#ff1f1f";
	context.beginPath();
	context.arc(x + 5, y + 5, 5, 0, Math.PI * 2);
	context.fill();
	context.closePath();
}

function drawSnake() {
	context.fillStyle = "#00aaff";
	snake.body.forEach(({ x, y }) => context.fillRect(x * 10, y * 10, 10, 10));
}

function startGame() {
	drawApple();
	drawSnake();

	refreshID = setInterval(() => refresh(), 500);
	isPaused = false;
}

function refresh() {
	context.clearRect(0, 0, 500, 500);

	moveSnake();

	drawApple();
	drawSnake();
}

function play() {
	refreshID = setInterval(() => refresh(), 500);
	isPaused = false;
}

function pause() {
	clearInterval(refreshID);
	isPaused = true;
}

function moveSnake() {
	const clonedBody = [...snake.body];
	clonedBody.forEach((segment) => {
		segment.x += vector.displacement[0];
		segment.y += vector.displacement[1];
	});
	snake = {
		body: clonedBody,
	};
}

function changeDirection(input) {
	vector.displacement = directionDict[input];
}

startGame();
