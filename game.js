import Snake from "./snake.js";
import { generateApple } from "./apple.js";
import { displacementDict } from "./utils.js";
import Graphics from "./graphics.js";

const { scale } = Graphics;
const dimensions = {
	width: Graphics.dimensions.width / scale,
	height: Graphics.dimensions.height / scale,
};

export default class Game {
	constructor() {
		this.apple = generateApple(dimensions.width, dimensions.height);
		this.snake = new Snake(dimensions.width, dimensions.height);
		this.velocity = {
			speed: 0.15,
			displacement: {
				axis: "x",
				magnitude: 1,
			},
		};
		this.queue = [];
		this.isPaused = true;
		this.refreshID;
		this.score = 0;
	}

	play() {
		this.refreshID = setInterval(
			() => this.refresh(),
			this.velocity.speed * 1000
		);
		this.isPaused = false;
	}

	pause() {
		clearInterval(this.refreshID);
		this.isPaused = true;
	}

	start() {
		this.play();
		this.renderGame();
	}

	changeDirection() {
		let displacement = this.queue.shift();
		if (displacement) {
			const { axis } = this.velocity.displacement;
			if (displacement.axis === axis) return;
			this.velocity.displacement = displacement;
		}
	}

	updateGameState() {
		this.changeDirection();

		const position = { ...this.snake.head };
		const { axis, magnitude } = this.velocity.displacement;

		position[axis] += magnitude;

		if (position[axis] > 49) position[axis] = 0;
		else if (position[axis] < 0) position[axis] = 49;

		this.snake.move(position);

		if (this.eatApple()) {
			this.score++;
			this.apple = generateApple(dimensions.width, dimensions.height);
			this.snake.grow();
		}
		const index = this.eatBody();
		if (index) {
			this.snake.shrink(index);
		}
	}

	addToQueue(input) {
		let displacement = displacementDict[input];
		this.queue.push(displacement);
	}

	refresh() {
		this.updateGameState();
		this.renderGame();
	}

	renderGame() {
		Graphics.render(this.apple, this.snake, this.score);
	}

	eatApple() {
		const head = this.snake.head;
		const apple = this.apple;
		if (head.x === apple.x && head.y === apple.y) return true;
	}

	eatBody() {
		const head = this.snake.head;
		const body = this.snake.body;
		const index = body.findIndex(({ x, y }) => head.x === x && head.y === y);
		if (index > 0) {
			return index;
		}
	}
}
