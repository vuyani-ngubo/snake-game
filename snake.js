export default class Snake {
	constructor() {
		this.head = {
			x: 27,
			y: 24,
		};
		this.body = [
			{ x: 26, y: 24 },
			{ x: 25, y: 24 },
			{ x: 24, y: 24 },
			{ x: 23, y: 24 },
		];
	}

	move({ x, y }) {
		let head = { ...this.head };
		let body = [...this.body];

		let prevSegment = { ...head };

		head = { x, y };
		body = body.map((segment) => {
			let temp = { ...prevSegment };
			prevSegment = segment;
			return temp;
		});

		this.head = head;
		this.body = body;
	}
}
