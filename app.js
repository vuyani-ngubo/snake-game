const canvas = document.querySelector("#board");
const context = canvas.getContext("2d");

const snake = {
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
const apple = randomPos();

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

drawApple();
drawSnake();
