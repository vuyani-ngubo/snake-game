import Snake from "./snake.js";

const canvas = document.querySelector("#board");
const context = canvas.getContext("2d");

var apple = randomPos();

document.addEventListener("keydown", ({ key }) => {
	if (key === "ArrowUp") addToQueue("up");
	else if (key === "ArrowDown") addToQueue("down");
	else if (key === "ArrowLeft") addToQueue("left");
	else if (key === "ArrowRight") addToQueue("right");
	else if (key === " ") {
		if (isPaused) play();
		else pause();
	}
});

var snake = new Snake();
var velocity = {
	speed: 0.2,
	displacement: {
		axis: "x",
		magnitude: 1,
	},
};
var queue = [];
var isPaused = true;

var refreshID;
var displacementDict = {
	up: { axis: "y", magnitude: -1 },
	down: { axis: "y", magnitude: 1 },
	right: { axis: "x", magnitude: 1 },
	left: { axis: "x", magnitude: -1 },
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
	context.arc(x * 10 + 5, y * 10 + 5, 5, 0, Math.PI * 2);
	context.fill();
	context.closePath();
}

function drawSnake() {
	context.fillStyle = "#00aaff";
	const head = { ...snake.head };
	context.fillRect(head.x * 10, head.y * 10, 10, 10);
	snake.body.forEach(({ x, y }) => context.fillRect(x * 10, y * 10, 10, 10));
}

function startGame() {
	drawApple();
	drawSnake();

	play();
}

function refresh() {
	context.clearRect(0, 0, 500, 500);

	updateGameState();

	drawApple();
	drawSnake();
}

function play() {
	refreshID = setInterval(() => refresh(), velocity.speed * 1000);
	isPaused = false;
}

function pause() {
	clearInterval(refreshID);
	isPaused = true;
}

function updateGameState() {
	changeDirection();

	const position = { ...snake.head };
	const { axis, magnitude } = velocity.displacement;

	position[axis] += magnitude;

	if (position[axis] > 49) position[axis] = 0;
	else if (position[axis] < 0) position[axis] = 49;

	snake.move(position);
}

function addToQueue(input) {
	let displacement = displacementDict[input];
	queue.push(displacement);
}

function changeDirection() {
	let displacement = queue.shift();
	if (displacement) {
		const { axis } = velocity.displacement;
		if (displacement.axis === axis) return;
		velocity.displacement = displacement;
	}
}

startGame();
