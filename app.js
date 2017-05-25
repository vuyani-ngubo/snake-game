const canvas = document.querySelector("#board");
const context = canvas.getContext("2d");

var apple = randomPos();

document.addEventListener("keydown", ({ key }) => {
	if (key === "ArrowUp") queueMove("up");
	else if (key === "ArrowDown") queueMove("down");
	else if (key === "ArrowLeft") queueMove("left");
	else if (key === "ArrowRight") queueMove("right");
	else if (key === " ") {
		if (isPaused) play();
		else pause();
	}
});

var snake = {
	head: {
		x: 27,
		y: 24,
	},
	body: [
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
var velocity = {
	speed: 1,
	displacement: {
		axis: "x",
		magnitude: 1,
	},
};
var movesQueue = [];
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

	const head = { ...snake.head };
	let body = [...snake.body];
	const { axis, magnitude } = velocity.displacement;

	let prevSegment = { ...head };

	head[axis] += magnitude;

	if (head[axis] > 49) head[axis] = 0;
	else if (head[axis] < 0) head[axis] = 49;

	body = body.map((segment) => {
		let temp = { ...prevSegment };
		prevSegment = segment;
		return temp;
	});

	snake = {
		head,
		body,
	};
}

function queueMove(input) {
	let displacement = displacementDict[input];
	movesQueue.push(displacement);
}

function changeDirection() {
	let displacement = movesQueue.shift();
	if (displacement) {
		const { axis, magnitude } = velocity.displacement;
		if (displacement.axis === axis) return;
		velocity.displacement = displacement;
	}
}

startGame();
