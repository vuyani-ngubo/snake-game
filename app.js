const canvas = document.querySelector("#board");
const context = canvas.getContext("2d");

document.addEventListener("keydown", ({ key }) => {
	if (key === "ArrowUp") queueSequence("up");
	else if (key === "ArrowDown") queueSequence("down");
	else if (key === "ArrowLeft") queueSequence("left");
	else if (key === "ArrowRight") queueSequence("right");
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
var moveSequence = [];
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
	changeDirection();
	const snakeClone = [...snake.body];
	const newHead = { ...snakeClone[0] };
	const body = snake.body.filter((segment, index) => index !== 0);
	let prevSegment = snake.body[0];

	newHead.x += vector.displacement[0];
	newHead.y += vector.displacement[1];

	if (newHead.x > 49) newHead.x = 0;
	else if (newHead.x < 0) newHead.x = 49;

	if (newHead.y > 49) newHead.y = 0;
	else if (newHead.y < 0) newHead.y = 49;

	const newBody = body.map((segment) => {
		let temp = { ...prevSegment };
		prevSegment = segment;
		return temp;
	});

	snake = {
		body: [newHead, ...newBody],
	};
}

function queueSequence(input) {
	let displacement = directionDict[input];
	moveSequence.push(displacement);
}

function changeDirection() {
	let displacement = moveSequence.shift();
	if (displacement) {
		const [newX, newY] = displacement;
		const [oldX, oldY] = vector.displacement;
		if (newX === oldX || newY === oldY) return;
		vector.displacement = displacement;
	}
}

startGame();
