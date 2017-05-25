import Snake from "./snake.js";
import { generateApple } from "./apple.js";
import { displacementDict } from "./utils.js";
import Graphics from "./graphics.js";

export default class game {
	constructor() {
		this.apple = generateApple(50, 50);
		this.snake = new Snake();
		this.velocity = {
			speed: 0.2,
			displacement: {
				axis: "x",
				magnitude: 1,
			},
		};
		this.queue = [];
		this.isPaused = true;
		this.refreshID;
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
		Graphics.render(this.apple, this.snake);
		// -> Inside Graphics Render, call drawApple() & drawSnake()
	}
}
