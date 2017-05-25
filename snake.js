export default class Snake {
	constructor(xLimit, yLimit) {
		this.head = {
			x: xLimit / 2,
			y: yLimit / 2,
		};
		this.body = this.generateBody();
	}

	generateBody() {
		let { x, y } = { ...this.head };
		const body = [];
		for (let i = 0; i < 6; i++) {
			body.push({ x: x - (i + 1), y });
		}
		return body;
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
