const canvas = document.querySelector("#board");
const context = canvas.getContext("2d");

const scale = 10;
const colors = {
	apple: "#ff1f1f",
	snake: "#00aaff",
};

function drawApple(apple) {
	const { x, y } = apple;
	context.fillStyle = colors["apple"];
	context.beginPath();
	context.arc(x * scale + 5, y * scale + 5, 5, 0, Math.PI * 2);
	context.fill();
	context.closePath();
}

function drawSnake(snake) {
	context.fillStyle = colors["snake"];
	const head = { ...snake.head };
	context.fillRect(head.x * scale, head.y * scale, scale, scale);
	snake.body.forEach(({ x, y }) =>
		context.fillRect(x * scale, y * scale, scale, scale)
	);
}

export function render(apple, snake) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawApple(apple);
	drawSnake(snake);
}

export default {
	dimensions: { width: canvas.width, height: canvas.height },
	scale,
	render,
};
